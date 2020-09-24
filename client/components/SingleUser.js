import React from "react"
import { connect } from 'react-redux';
import {singleUserThunkGetter, createUserThunk } from '../store.js'
import EditUser from './EditUser.js'

class SingleUser extends React.Component {
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.props.getUser(userId)
    }
    componentDidUpdate() {
        const userId = this.props.match.params.userId;
        this.props.getUser(userId)
    }
    render() {
        const user = this.props.user
        if (!user) return null
        return(
            <div>
                {
                    user ? <div>{`${user.name} -- ${user.state}`}</div> : null
                }
                <EditUser />
            </div>
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
        getUser: (userId) => {
            return dispatch(singleUserThunkGetter(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)