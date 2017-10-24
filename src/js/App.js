import React from 'react'
import axios from 'axios'
import { Route, Switch, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

import Navigation from './sections/Navigation'
// import Main from './components/Main'
import Choreographers from './sections/Choreographers'
import Classes from './sections/Classes/Classes'
import InfoPage from './sections/InfoPage'
import Schedule from './sections/Schedule/Schedule'
import Dashboard from './sections/Dashboard/Dashboard'

import { parseContent } from './utils/content'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.setDropdown = this.setDropdown.bind(this)
		this.state = {
			sections: {},
			user: undefined,
		}
	}

	componentDidMount() {
		// Split the initial content & MBO requests into two:
		// the MBO call may take longer, or the API server may be down
		axios.get('/api/content/initial').then((response) => {
			const newState = parseContent({ ...this.state, ...response.data })
			this.setState(newState)
		})
		const fetchClasses = axios.get('/api/mbo/classes')
		const fetchRegistrationFields = axios.get('/api/mbo/registrationFields')
		const checkToken = axios.get('/api/mbo/checktoken', {
			headers: { 'x-access-token': Cookies.get('jwt') || false },
		})
		axios.all([fetchClasses, fetchRegistrationFields, checkToken])
			.then(axios.spread((schedule, registrationFields, tokenResponse) => {
				const newState = parseContent({
					...this.state,
					schedule: schedule.data,
					originalRegistrationFields: registrationFields.data,
					user: tokenResponse.data.user,
				})
				this.setState(newState)
			}))
	}

	setDropdown(dropdown) {
		this.setState({ dropdown })
	}

	setUserData = (user) => {
		this.setState({ user })
	}

	loginUser = ({ user, token }) => {
		Cookies.set('jwt', token)
		if (user === false) this.logoutUser()
		this.setState({ user })
	}

	logoutUser = () => {
		Cookies.remove('jwt')
		this.setState({ user: false }, () => {
			this.props.history.push('/')
		})
	}

	buildClass = () => {

	}

	render() {
		if (!this.state.home) return null
		return (
			<div>
				<Navigation
					user={this.state.user}
					setDropdown={this.setDropdown}
					dropdown={this.state.dropdown}
					loginUser={this.loginUser}
					logoutUser={this.logoutUser}
					registrationFields={this.state.registrationFields}
					liabilityText={this.state.home.liability}
				/>
				<Switch>
					<Route
						exact
						path="/"
						render={match => <Choreographers match={match} choreographers={this.state.choreographers} />}
					/>
					<Route
						exact
						path="/classes"
						render={match => <Classes match={match} passes={this.state.passes} classtypes={this.state.classtypes} />}
					/>
					<Route
						exact
						path="/community"
						render={() => <InfoPage {...this.state.community} />}
					/>
					<Route
						exact
						path="/about"
						render={() => <InfoPage {...this.state.about} />}
					/>
					<Route
						path="/dashboard"
						render={(routeProps => (
							<Dashboard
								{...routeProps}
								user={this.state.user}
								setUserData={this.setUserData}
								setDropdown={this.setDropdown}
							/>
						))}
					/>
					<Route
						exact
						path="/schedule"
						render={() => (
							<Schedule
								choreographers={this.state.choreographers.children}
								schedule={this.state.schedule}
							/>
						)}
					/>
				</Switch>
			</div>
		)
	}
}

export default withRouter(App)
