import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
export const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
export const FILTER_STUDENTS = 'FILTER_STUDENTS';

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
            // console.log(students)
            dispatch(getStudents(students))
        } catch (error) {
            console.log(Object.entries(error))
        }
    }
}

const createStudent = (student) => {
    return {
        type: CREATE_STUDENT,
        student
    }
}

export const createStudentThunk = (firstName, lastName, email, school) => {
    return async (dispatch) => {
        const student = (await axios.post('/api/students/add-student', {firstName, lastName, email, school})).data;
        dispatch(createStudent(student))
    }
}

const deleteStudent = (student) => {
    return {
        type: DELETE_STUDENT,
        student
    }
}

export const deleteStudentThunk = (student) => {
    return async (dispatch) => {
        const deletedStudent = (await axios.delete(`api/students/delete-student/${student.id}`)).data;
        dispatch(deleteStudent(deletedStudent))
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
    if (action.type === DELETE_STUDENT) {
        return state.filter(student => student.id !== action.student.id)
    }
    if (action.type === FILTER_STUDENTS) {
        return action.filtered
    }
    return state
}

export default studentReducer