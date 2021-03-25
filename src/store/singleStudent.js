import axios from 'axios';

const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';

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
        history.push(`/students/${id}`)
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
    if (action.type === EDIT_STUDENT) {
        let updatedStudent = action.student
        const newStudentState = {...state.singleStudent, updatedStudent}
        state.singleStudent = newStudentState
    }
    return state
}

export default singleStudentReducer;