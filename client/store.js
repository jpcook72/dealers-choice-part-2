import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const GET_USERS = 'GET_USERS';
const GET_USER = 'GET_USER';
const CREATE_USER = 'CREATE_USER';
const EDIT_USER = 'EDIT_USER';

const initialState = {
    users: []
}

const editUser = (userObj) => {
    return {
        type: EDIT_USER,
        user: userObj
    }
}

export const editUserThunk = (userName, stateName, user) => {
    return async function(dispatch) {
        console.log('in edit thunk', userName, stateName, user)
        const newUser = await axios.put(`/api/users/${user.id}`, {name: userName, state: stateName})
        dispatch(editUser(newUser))
    }
}

const createUser = (userObj) => {
    return {
        type: CREATE_USER,
        user: userObj
    }
}

export const createUserThunk = (userName, stateName) => {
    return async function(dispatch) {
        console.log('in the thunk', userName, stateName);
        const user = await axios.post('/api/users', {name: userName, state: stateName})
        dispatch(createUser(user))
    }
}

const userGetter = (users, states) => {
    return {
        type: GET_USERS,
        users,
        states
    }
}

export const userThunkGetter = () => {
    return async function(dispatch) {
        const users = await axios.get('/api/users')
        const states = await axios.get('/api/states')
        
        dispatch(userGetter(users.data, states.data))
    }
}

const singleUserGetter = (user, states) => {
    return {
        type: GET_USER,
        user,
        states
    }
}

export const singleUserThunkGetter = (userId) => {
    return async function(dispatch) {
        const user = await axios.get(`/api/users/${userId}`)
        const states = await axios.get('/api/states')
        console.log('in thunk creator', userId, user.data, states.data)
        dispatch(singleUserGetter(user.data, states.data))
    }
}

const reducer = (state = initialState, action) => {
    if (action.type == GET_USERS) {
        let newState = action.users
        newState.forEach( user => user.state = action.states.filter( state => state.id == user.stateId)[0].name)
        return {...state, users: newState}
    }
    if (action.type == GET_USER) {
        let newState = action.user
        newState.state = action.states.filter( state => state.id == action.user.stateId)[0].name
        return {...state, users: [newState]}
    }
    if (action.type == CREATE_USER) {
        return {...state, users: [...state.users, action.user]}
    }
    if (action.type == EDIT_USER) {
        console.log('in edit reducer');
        return {...state, users: [...state.users.filter(user => user.id != action.user.id), action.user]}
    }
    return state
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;