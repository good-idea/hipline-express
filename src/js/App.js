import React from 'react'
import axios from 'axios'
import R from 'ramda'
import { Route, Switch, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

import Navigation from './sections/Navigation'
import Choreographers from './sections/Choreographers'
import Classes from './sections/Classes/Classes'
import InfoPage from './sections/InfoPage'
import Footer from './sections/Footer'

import { SquigglePaths } from './components/Squiggle'

import { parseContent } from './utils/content'
import withPubSub from './enhancers/withPubSub'

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
		// const apiRoot = (window.)
		// Split the initial content & MBO requests into two:
		// the MBO call may take longer, or the API server may be down
		axios.get('/api/content/initial').then((response) => {
			const newState = parseContent({ ...this.state, ...response.data })
			this.setState(newState, () => {
				this.props.emit('cmsContentLoaded')
			})
		})
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) document.body.scrollTop = 0
	}

	setDropdown(dropdown) {
		this.setState({ dropdown })
	}

	getChoreographerByID = (id) => {
		if (!this.state.choreographers) {
			console.warn('getChoreographerByID was called before the choreographers data has loaded')
			return false
		}
		return (this.state.choreographers.find(c => c.mboid === id))
	}

	getClassDescriptionById = (id) => {
		if (!this.state.classtypes || !this.state.schedule) {
			console.warn('getClassDescriptionById was called before the content has loaded')
			return false
		}
		const allClassTypes = R.pipe(
			R.prop('children'),
			R.pluck('children'),
			R.flatten,
		)(this.state.classtypes)
	}

	render() {
		if (!this.state.home) return null
		return (
			<div id="app">
				<SquigglePaths />
				<Navigation
					// user={this.state.user}
					// setDropdown={this.setDropdown}
					// dropdown={this.state.dropdown}
					// loginUser={this.loginUser}
					// logoutUser={this.logoutUser}
					// registrationFields={this.state.registrationFields}
					// liabilityText={this.state.home.liability}
					infoPages={this.state.infoPages}
				/>
				<Switch>
					<Route
						exact
						path="/"
						render={match => (
							<Choreographers
								match={match}
								home={this.state.home}
								choreographers={this.state.choreographers}
							/>
						)}
					/>
					<Route
						exact
						path="/classes"
						render={match => (
							<Classes
								match={match}
								splashText={this.state.home.intro}
								passes={this.state.passes}
								classtypes={this.state.classtypes}
							/>
						)}
					/>
					{this.state.infoPages.map(page => (
						<Route
							exact
							key={page.slug}
							path={`/${page.slug}`}
							render={() => <InfoPage {...page} />}
						/>
					))}
					{/* <Route
						path="/dashboard"
						render={(routeProps => (
							<Dashboard
								{...routeProps}
								user={this.state.user}
								setUserData={this.setUserData}
								setDropdown={this.setDropdown}
								loadUserData={this.loadUserData}
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
					/> */}
				</Switch>
				<Footer {...this.state.home} />
			</div>
		)
	}
}

export default withRouter(withPubSub(App))
