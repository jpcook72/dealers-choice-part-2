import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const GET_USERS = 'GET_USERS';
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
        const user = await axios.post('/api/users', {name: userName, state: stateName})
        dispatch(createUser(user))
    }
}

const userGetter = (users, states) => {
    return {
        type: GET_USERS,
        users
    }
}

export const userThunkGetter = () => {
    return async function(dispatch) {
        const users = await axios.get('/api/users')
        dispatch(userGetter(users.data))
    }
}

const reducer = (state = initialState, action) => {
    if (action.type == GET_USERS) {
        let newState = action.users
        newState.forEach( user => user.state = user.state.name)
        return {...state, users: newState}
    }
    if (action.type == CREATE_USER) {
        return {...state, users: [...state.users, action.user]}
    }
    if (action.type == EDIT_USER) { 
        const editedUser = action.user.data;
        editedUser.state = editedUser.state.name;
        return {...state, users: [...state.users.filter(user => user.id != action.user.data.id), editedUser]}
    }
    return state
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;