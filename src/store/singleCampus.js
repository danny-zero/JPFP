import axios from 'axios';

const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';

const getSingleCampus = (singleCampus, campusStudents) => {
    return {
        type: GET_SINGLE_CAMPUS,
        singleCampus,
        campusStudents
    }
}

export const fetchSingleCampus = (id) => {
    return async (dispatch) => {
        try {
            const singleCampus = (await axios.get(`api/campuses/${id}`)).data;
            const campusStudents = (await axios.get(`api/campuses/${id}/students`)).data;
            dispatch(getSingleCampus(singleCampus, campusStudents))
        } catch (error) {
            console.error(error)
        }
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
    return state
}

export default singleCampusReducer;