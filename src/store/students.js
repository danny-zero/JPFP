import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';

const getStudents = (students) => {
    return {
        type: GET_STUDENTS,
        students
    }
}

export const fetchStudents = () => {
    return async (dispatch) => {
        try {
            const students = (await axios.get('/api/students')).data;
            dispatch(getStudents(students))
        } catch (error) {
            console.error(error)
        }
    }
}

const initialState = [];

const studentReducer = (state = initialState, action) => {
    if (action.type === GET_STUDENTS) {
        return action.students
    }
    return state
}

export default studentReducer