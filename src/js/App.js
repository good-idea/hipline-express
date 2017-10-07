import React from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import Navigation from './sections/Navigation'
// import Main from './components/Main'
import Choreographers from './sections/Choreographers'
import Classes from './sections/Classes'
import InfoPage from './sections/InfoPage'
import Schedule from './sections/Schedule/Schedule'
import Login from './sections/Login'
import Register from './sections/Register'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sections: {},
		}
	}

	componentDidMount() {
		// const timer = Date.now()
		// Split the initial content & MBO requests into two: the MBO call may take longer.
		const fetchContent = axios.get('/api/content/initial')
		const fetchClasses = axios.get('/api/mbo/classes')
		const fetchRegistrationFields = axios.get('/api/mbo/registrationFields')
		axios.all([fetchContent, fetchClasses, fetchRegistrationFields])
			.then(axios.spread((content, classes, registrationFields) => {
				this.setState({
					sections: { ...content.data },
					schedule: [...classes.data],
					registrationFields: registrationFields.data,
				})
			}))
	}

	loginUser(credentials) {
		axios.post('/api/mbo/login', credentials).then((response) => {
			console.log(response)
		}).catch((err) => {
			console.log(err)
		})
	}

	registerUser(userInfo) {
		axios.post('/api/mbo/register', userInfo).then((response) => {
			console.log(response)
		}).catch((err) => {
			console.log(err)
		})
	}

	render() {
		if (!this.state.sections.home) return null
		return (
			<div>
				<Navigation />
				<Route
					exact
					path="/"
					render={match => <Choreographers match={match} choreographers={this.state.sections.choreographers.children} />}
				/>
				<Route
					exact
					path="/classes"
					render={match => <Classes match={match} content={this.state.sections.classes} />}
				/>
				<Route
					exact
					path="/community"
					render={() => <InfoPage {...this.state.sections.community} />}
				/>
				<Route
					exact
					path="/about"
					render={() => <InfoPage {...this.state.sections.about} />}
				/>
				<Route
					exact
					path="/schedule"
					render={() => (
						<Schedule
							choreographers={this.state.sections.choreographers.children}
							schedule={this.state.schedule}
						/>
					)}
				/>
				<Route
					exact
					path="/login"
					render={() => <Login loginUser={this.loginUser} />}
				/>
				<Route
					exact
					path="/register"
					render={() => <Register registerUser={this.registerUser} registrationFields={this.state.registrationFields} />}
				/>
			</div>
		)
	}
}

export default App
