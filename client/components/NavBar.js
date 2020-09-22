import React from "react"
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
    <div id='navbar' className='row'>
        <Link to='/'>Home</Link>
        <Link to='/users/create'>Create</Link>
        <Link to='/users'>Users</Link>
    </div>)
}

export default NavBar