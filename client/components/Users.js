import React from "react"
import { connect } from 'react-redux';
import {userThunkCreator} from '../store.js'

class Users extends React.Component {
    componentDidMount() {
        console.log('in mount!')
        this.props.getUsers();
        console.log('the props are', this.props)
    }

    render() {
        console.log('rendering', this.props);
        return(<div>
            {
                this.props.users ? this.props.users.map(user => <div>{user.name} -- {user.state} </div>) : (<p>hey there</p>)
            }
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            return dispatch(userThunkCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
