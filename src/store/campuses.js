import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES'

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

const initialState = [];

const campusReducer = (state = initialState, action) => {
    if (action.type === GET_CAMPUSES) {
        return action.campuses
    }
    return state
}

export default campusReducer