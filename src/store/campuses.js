import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES'
const CREATE_CAMPUS = 'CREATE_CAMPUS';

const getCampuses = (campuses) => {
    return {
        type: GET_CAMPUSES,
        campuses
    }
}

export const fetchCampuses = () => {
    return async (dispatch) => {
        const campuses = (await axios.get('/api/campuses')).data;
        dispatch(getCampuses(campuses))
    }
}

const createCampus = (campus) => {
    return {
        type: CREATE_CAMPUS,
        campus
    }
}

export const postCampus = (campusName, campusAddress) => {
    return async (dispatch) => {
        const campus = (await axios.post('/api/campuses/add-campus', {name: campusName, address: campusAddress})).data;
        dispatch(createCampus(campus))
    }
}

const initialState = [];

const campusReducer = (state = initialState, action) => {
    if (action.type === GET_CAMPUSES) {
        return action.campuses
    }
    if (action.type === CREATE_CAMPUS) {
        return [...state, action.campus]
    }
    return state
}

export default campusReducer