import React from "react"
import { connect } from 'react-redux';
import { editUserThunk } from '../store.js';
import UserForm from './UserForm.js';

class EditUser extends React.Component {
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
        console.log('in handle submit', this.props.editUser, this.state.userName, this.state.stateName, this.props.user)
        this.props.editUser(this.state.userName, this.state.stateName, this.props.user);
        console.log('past edit user')
        this.setState({
            userName: '',
            stateName: ''
        })
    }

    componentDidMount() {
        this.setState({userName: this.props.user.name, stateName: this.props.user.state})
    }

    render() {
        const { userName, stateName } = this.state
        const { handleSubmit, handleChange } = this;
        return(
            <UserForm userName={userName} stateName={stateName} handleSubmit={handleSubmit} handleChange={handleChange} />
        )
    }
}

const mapStateToProps = (state) => {
        return {
            user: state.users[0]
        }
    }


const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (username, state, user) => {
            dispatch(editUserThunk(username, state, user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
