import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import campuses from './campuses'
import students from './students'
import singleCampusReducer from './singleCampus';
import singleStudentReducer from './singleStudent';
import errorReducer from './errorReducer';

const reducer = combineReducers({
    campuses,
    students,
    singleCampusReducer,
    singleStudentReducer,
    errorReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunk, createLogger({collapsed:true}))
)

const store = createStore(reducer, middleware)

export default store