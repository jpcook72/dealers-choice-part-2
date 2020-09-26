import React from "react"
import USAMap from "react-usa-map"
import NavBar from "./NavBar.js"
import {Route} from 'react-router-dom'
import {HashRouter as Router} from "react-router-dom"
import Users from "./Users.js"
import EditUser from "./EditUser.js"

export default class App extends React.Component {
	render() {
		return(
			<Router>
				<div>
					<NavBar />
					<Route path='/' exact component={USAMap} />
					<Route path='/users' exact component={Users} />
					<Route path='/users/create' exact component={EditUser} />
					<Route path="/user/:userId" exact component={EditUser}/>
				</div>
			</Router>

		)
	}
}
