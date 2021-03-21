import axios from 'axios';

const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';

const getSingleStudent = (student) => {
    return {
        type: GET_SINGLE_STUDENT,
        student
    }
}

export const fetchSingleStudent = (id) => {
    return async (dispatch) => {
        try {
            const singleStudent = (await axios.get(`/api/students/${id}`)).data;
            dispatch(getSingleStudent(singleStudent))
        } catch (error) {
            console.error(error)
        }
    }
}

const initialState = {
    singleStudent: {},
    studentCampus: {}
}

const singleStudentReducer = (state = initialState, action) => {
    if (action.type === GET_SINGLE_STUDENT) {
        return {
            singleStudent: action.student,
            studentCampus: action.student.campus
        }
    }
    return state
}

export default singleStudentReducer;