import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const GET_USERS = 'GET_USERS';

const initialState = {
    users: []
}

const userCreator = (users, states) => {
    return {
        type: GET_USERS,
        users,
        states
    }
}

export const userThunkCreator = () => {
    return async function(dispatch) {
        const users = await axios.get('/api/users')
        const states = await axios.get('/api/states')
        dispatch(userCreator(users.data, states.data))
    }
}

const reducer = (state = initialState, action) => {
    if (action.type == GET_USERS) {
        let newState = action.users
        newState.forEach( user => user.state = action.states.filter( state => state.id == user.stateId)[0].name)
        console.log('end ', newState)
        return {...state, users: newState}
    }
    return state
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;