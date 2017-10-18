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
		this.loginUser = this.loginUser.bind(this)
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
		axios.all([fetchContent, fetchClasses, fetchRegistrationFields])
			.then(axios.spread((content, classes, registrationFields) => {
				this.setState({
					sections: { ...content.data },
					schedule: [...classes.data],
					registrationFields: sortMBOFields(registrationFields.data),
				}, this.attemptLogin)
			})).catch(err => console.warn(err))
	}

	setDropdown(dropdown) {
		this.setState({ dropdown })
	}

	attemptLogin() {
		const guid = Cookies.get('mbo-guid')
		console.log(guid)
		axios.get(`https://clients.mindbodyonline.com/ASP/ws.asp?studioid=4561&guid=${guid}`).then((response) => {
			console.log(response)
			this.setState({ user: response.data.Client })
		}).catch(() => {
			this.setState({ user: false })
		})
	}

	loginUser(user, GUID) {
		if (GUID) Cookies.set('mbo-guid', GUID, { expires: 7 })
		console.log(Cookies.get('mbo-guid'))
		if (user === false) Cookies.remove('mbo-guid')
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
