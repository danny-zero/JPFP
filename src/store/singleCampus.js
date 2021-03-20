import axios from 'axios';

const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';

const getSingleCampus = (singleCampus) => {
    return {
        type: GET_SINGLE_CAMPUS,
        singleCampus
    }
}

export const fetchSingleCampus = (id) => {
    return async (dispatch) => {
        try {
            const singleCampus = (await axios.get(`/campuses/${id}`)).data;
            dispatch(getSingleCampus(singleCampus))
        } catch (error) {
            console.error(error)
        }
    }
}

const initialState = {}

const singleCampusReducer = (state = initialState, action) => {
    if (action.type === GET_SINGLE_CAMPUS) {
        return action.singleCampus
    }
    return state
}

export default singleCampusReducer;