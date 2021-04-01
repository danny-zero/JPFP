import axios from 'axios';
import {ERROR, clearError} from './errorReducer';

const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';

const getSingleStudent = (student) => {
    return {
        type: GET_SINGLE_STUDENT,
        student
    }
}

const errorSingleStudent = (error) => {
    return {
        type: ERROR,
        error
    }
}

export const fetchSingleStudent = (id) => {
    return async (dispatch) => {
        try {
            const singleStudent = (await axios.get(`/api/students/${id}`)).data;
            dispatch(getSingleStudent(singleStudent))
            dispatch(clearError())
        } catch (error) {
            console.log(Object.entries(error)[2][1].data)
            const errorMessage = Object.entries(error)[2][1].data
            dispatch(errorSingleStudent(errorMessage))
        }
    }
}

const editSingleStudent = (student) => {
    return {
        type: EDIT_STUDENT,
        student
    }
}

export const editStudentThunk = (id, firstName, lastName, school, email, history) => {
    return async (dispatch) => {
        const editedStudent = (await axios.put(`/api/students/edit-student/${id}`, {firstName, lastName, school, email})).data;
        dispatch(editSingleStudent(editedStudent))
        history.push(`/students/single-student/${id}`)
    }
}

const initialState = {
    singleStudent: {},
    studentCampus: {},
    loading: true
}

const singleStudentReducer = (state = initialState, action) => {
    if (action.type === GET_SINGLE_STUDENT) {
        return {
            singleStudent: action.student,
            studentCampus: action.student.campus,
            loading: false
        }
    }
    if (action.type === EDIT_STUDENT) {
        let updatedStudent = action.student
        const newStudentState = {...state.singleStudent, updatedStudent}
        state.singleStudent = newStudentState
    }
    return state
}

export default singleStudentReducer;