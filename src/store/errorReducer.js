export const ERROR = 'ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const errorSingleCampus = (error) => {
    return {
        type: ERROR,
        error
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}


const initialState = {}

const errorReducer = (state = initialState, action) => {
    if (action.type === ERROR) {
        console.log(action.error)
        return {errorMessage: action.error, loading: false}
    }

    if (action.type === CLEAR_ERROR) {
        return {}
    }
    return state
}

export default errorReducer;