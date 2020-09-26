import React from "react"
import { connect } from 'react-redux';
import { editUserThunk, createUserThunk } from '../store.js';

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
        if (this.props.user) {
            this.props.editUser(this.state.userName, this.state.stateName, this.props.user);
            this.setState({
                userName: this.state.userName,
                stateName: this.state.stateName
            })
        } else {
            this.props.createUser(this.state.userName, this.state.stateName); 
            this.setState({
                userName: '',
                stateName: ''
            })
        }
    }

    componentDidMount() {
        if (this.props.user) this.setState({userName: this.props.user.name, stateName: this.props.user.state})
    }

    render() {
        const { userName, stateName } = this.state
        const { handleSubmit, handleChange } = this;
        const user = this.props.user
        return(
            <div>
                {
                    !!user && <div>{`${user.name} -- ${user.state}`}</div>
                }
                <form id='todo-form' onSubmit={handleSubmit}>
                    <div>            
                        <label htmlFor='userName'>Name:</label>
                        <input name='userName' onChange={handleChange} value={userName} />
                    </div>

                    <div>
                        <label htmlFor='stateName'>
                            State Abbreviation:
                        </label>
                        <input name='stateName' onChange={handleChange} value={stateName} />
                    </div>

                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match != undefined ? Number(ownProps.match.params.userId) : undefined;
    return {
        user: state.users.filter(user => user.id === userId)[0]
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (username, state, user) => {
            dispatch(editUserThunk(username, state, user))
        },
        createUser: (user, state) => {
            dispatch(createUserThunk(user, state))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
