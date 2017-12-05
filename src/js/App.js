import React from 'react'
import axios from 'axios'
import R from 'ramda'
import { Route, Switch, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

import Navigation from './sections/Navigation'
// import Main from './components/Main'
import Choreographers from './sections/Choreographers'
import Classes from './sections/Classes/Classes'
import InfoPage from './sections/InfoPage'
import Schedule from './sections/Schedule/Schedule'
import Dashboard from './sections/Dashboard/Dashboard'

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
		// Split the initial content & MBO requests into two:
		// the MBO call may take longer, or the API server may be down
		axios.get('/api/content/initial').then((response) => {
			const newState = parseContent({ ...this.state, ...response.data })
			this.setState(newState, () => {
				this.props.emit('cmsContentLoaded')
			})
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
					sourceRegistrationFields: registrationFields.data,
					user: tokenResponse.data.user,
				})
				this.setState(newState, () => {
					this.props.emit('mboScheduleLoaded')
					this.props.emit('mboFieldsLoaded')
				})
			}))
			.catch(err => console.log(err))
	}

	setDropdown(dropdown) {
		this.setState({ dropdown })
	}

	setUserData = (userData, callback) => {
		const fixedUser = R.when(
			R.prop('schedule'),
			R.pipe(
				// Fucked! MBO doesn't provide any ID we can use to link a class to a description
				// R.assoc('schedule', R.map(
				// 	c => R.assoc('description', this.getClassDescriptionById(c), c),
				// 	R.prop('schedule', userData) || [],
				// )),
				R.assoc('schedule', R.map(
					(c => R.assoc('choreographer', this.getChoreographerByID(c.Staff.ID), c)),
					R.prop('schedule', userData) || [],
				))
			),
		)(userData)
		this.setState({ user: fixedUser }, callback)
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

	loadUserData = () => {
		if (this.state.schedule) {
			this.loadUserDataWhenReady()
			return
		}
		this.props.subscribe('mboScheduleLoaded', this.loadUserDataWhenReady)
	}

	loadUserDataWhenReady = () => {
		axios.get('/api/mbo/user/account', {
			headers: { 'x-access-token': Cookies.get('jwt') || false },
		}).then((response) => {
			this.setUserData(response.data.user, () => {
				this.props.unsubscribe('mboScheduleLoaded', this.loadUserDataWhenReady)
				this.props.emit('accountDataLoaded')
			})
		}).catch(err => console.log(err, err.response))
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
					/>
				</Switch>
			</div>
		)
	}
}

export default withRouter(withPubSub(App))
