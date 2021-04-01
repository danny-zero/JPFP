import axios from 'axios';
import {CREATE_STUDENT} from './students';
import {ERROR, clearError} from './errorReducer';

const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const UNREGISTER = 'UNREGISTER';

const getSingleCampus = (singleCampus, campusStudents) => {
    return {
        type: GET_SINGLE_CAMPUS,
        singleCampus,
        campusStudents
    }
}

const errorSingleCampus = (error) => {
    return {
        type: ERROR,
        error
    }
}

export const fetchSingleCampus = (id) => {
    return async (dispatch) => {
        try {
            const singleCampus = (await axios.get(`api/campuses/${id}`)).data;
            const campusStudents = (await axios.get(`api/campuses/${id}/students`)).data;
            dispatch(getSingleCampus(singleCampus, campusStudents))
            dispatch(clearError())
        } catch (error) {
            console.log(Object.entries(error)[2][1].data)
            const errorMessage = Object.entries(error)[2][1].data
            dispatch(errorSingleCampus(errorMessage))
        }
    }
}

const editSingleCampus = (campus) => {
    return {
        type: EDIT_CAMPUS,
        campus
    }
}

export const editCampusThunk = (id, name, address, description, history) => {
    return async (dispatch) => {
        const editedCampus = (await axios.put(`/api/campuses/edit-campus/${id}`, {name, address, description})).data;
        dispatch(editSingleCampus(editedCampus))
        history.push(`/campuses/single-campus/${id}`)
    }
}

const unregisterStudentFromCampus = (student) => {
    return {
        type: UNREGISTER,
        student
    }
}

export const unregisterThunk = (campusId, id, history) => {
    return async (dispatch) => {
        const unregisteredStudent = (await axios.put(`/api/students/unregister/${id}`)).data;
        dispatch(unregisterStudentFromCampus(unregisteredStudent))
        history.push(`/campuses/single-campus/${campusId}/students`)
    }
}

const initialState = {
    singleCampus: {},
    campusStudents: []
}

const singleCampusReducer = (state = initialState, action) => {
    if (action.type === GET_SINGLE_CAMPUS) {
        return {
            singleCampus: action.singleCampus,
            campusStudents: action.campusStudents
        }
    }
        if (action.type === CREATE_STUDENT) {
            if(action.student.campusId === state.singleCampus.id) {
                return {
                    ...state,
                    campusStudents: [...state.campusStudents, action.student]
                }
            }

        }

      if (action.type === EDIT_CAMPUS) {
        let updatedCampus = action.campus
        const newCampusState = {...state.singleCampus, updatedCampus}
        state.singleCampus = newCampusState
    }
    if (action.type === UNREGISTER) {
        return {
            singleCampus: {...state.singleCampus},
            campusStudents: state.campusStudents.filter((student) => student.id !== action.student.id)
        }
    }
    
    return state
}

export default singleCampusReducer;