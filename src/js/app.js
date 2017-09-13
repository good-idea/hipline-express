import React from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import Navigation from './sections/Navigation'
// import Main from './components/Main'
import Choreographers from './sections/Choreographers'
import Classes from './sections/Classes'
import InfoPage from './sections/InfoPage'
import Schedule from './sections/Schedule'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sections: {},
		}
	}

	componentDidMount() {
		const timer = Date.now()
		// Split the initial content & MBO requests into two: the MBO call may take longer.
		axios.get('/api/content/initial').then((response) => {
			console.log(`Response time for 'api/content/initial': ${Date.now() - timer}`, response)
			this.setState({
				sections: { ...response.data },
			})
		})
		axios.get('/api/mbo/classes').then((response) => {
			console.log(`Response time for 'api/mbo/classes': ${Date.now() - timer}`, response)
			this.setState({
				schedule: [ ...response.data ]
			})
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
			</div>
		)
	}
}

export default App
