import React from "react"
import { connect } from 'react-redux';
import { createUserThunk } from '../store.js';
import UserForm from './UserForm.js';

class CreateUser extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            stateName: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleSubmit(evt) {
        evt.preventDefault()
        this.props.createUser(this.state.userName, this.state.stateName);
        this.setState({
            userName: '',
            stateName: ''
        })
    }


    render() {
        const { userName, stateName } = this.state
        const { handleSubmit, handleChange } = this;
        return(
            <UserForm userName={userName} stateName={stateName} handleSubmit={handleSubmit} handleChange={handleChange} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user, state) => {
            dispatch(createUserThunk(user, state))
        }
    }
}

export default connect(null, mapDispatchToProps)(CreateUser)
