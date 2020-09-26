import React from "react"
import { connect } from 'react-redux';
import {userThunkGetter} from '../store.js'
import {Link} from 'react-router-dom'

class Users extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return(<div>
            {
                this.props.users ? this.props.users.map(user => 
                <div>
                    <Link to={`/user/${user.id}`}>{user.name} -- {user.state} </Link>
                </div>) : null
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
            return dispatch(userThunkGetter())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
