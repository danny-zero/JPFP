import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';

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

const createStudent = (student) => {
    return {
        type: CREATE_STUDENT,
        student
    }
}

export const createStudentThunk = (firstName, lastName, email) => {
    return async (dispatch) => {
        const student = (await axios.post('/api/students/add-student', {firstName, lastName, email})).data;
        dispatch(createStudent(student))
    }
}


const initialState = [];

const studentReducer = (state = initialState, action) => {
    if (action.type === GET_STUDENTS) {
        return action.students
    }
    if (action.type === CREATE_STUDENT) {
        return [...state, action.student]
    }
    return state
}

export default studentReducer