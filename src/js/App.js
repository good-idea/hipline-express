import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'

import Navigation from './sections/Navigation'
// import Main from './components/Main'
import Choreographers from './sections/Choreographers'
import Classes from './sections/Classes'
import InfoPage from './sections/InfoPage'
import Schedule from './sections/Schedule/Schedule'

import { sortMBOFields, attemptGUIDLogin } from './utils/mbo'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.setDropdown = this.setDropdown.bind(this)
		this.state = {
			loginOpen: false,
			registerOpen: false,
			sections: {},
			user: undefined,
		}
	}

	componentDidMount() {
		// const timer = Date.now()
		// Split the initial content & MBO requests into two: the MBO call may take longer.
		const fetchContent = axios.get('/api/content/initial')
		const fetchClasses = axios.get('/api/mbo/classes')
		const fetchRegistrationFields = axios.get('/api/mbo/registrationFields')
		const checkToken = axios.get('/api/mbo/checktoken', {
			headers: { 'x-access-token': Cookies.get('jwt') || false },
		})
		axios.all([fetchContent, fetchClasses, fetchRegistrationFields, checkToken])
			.then(axios.spread((content, classes, registrationFields, tokenResponse) => {
				this.setState({
					sections: { ...content.data },
					schedule: [...classes.data],
					registrationFields: sortMBOFields(registrationFields.data),
					user: tokenResponse.data.user,
				}, this.attemptLogin)
			})).catch(err => console.warn(err.response))
	}

	setDropdown(dropdown) {
		this.setState({ dropdown })
	}

	logoutUser = () => {
		Cookies.remove('jwt')
		this.setState({ user: false })
	}

	loginUser = ({ user, token }) => {
		console.log(user, token)
		Cookies.set('jwt', token)
		if (user === false) this.logoutUser()
		this.setState({ user })
	}

	render() {
		if (!this.state.sections.home) return null
		return (
			<div>
				<Navigation
					user={this.state.user}
					setDropdown={this.setDropdown}
					dropdown={this.state.dropdown}
					loginUser={this.loginUser}
					logoutUser={this.logoutUser}
					registrationFields={this.state.registrationFields}
					liabilityText={this.state.sections.home.liability}
				/>
				<Switch>
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
				</Switch>
			</div>
		)
	}
}

export default App
