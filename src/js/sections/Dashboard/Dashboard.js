import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Cookies from 'js-cookie'

import DashboardNavButton from './DashboardNavButton'
import UserSchedule from './UserSchedule'


import SpoofUser from '../SpoofUser'
/**
 * Dashboard
 */

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			view: 'schedule'
		}
	}

	componentDidMount() {
		if (this.props.user === false) {
			this.props.setDropdown('login')
		} else if (this.props.user) {
			this.props.loadUserData()
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.user && nextProps.user) this.props.loadUserData()
	}

	changeNavSection = (id) => {
		this.setState({ view: id })
	}

	renderActiveSection() {
		switch (this.state.view) {
		case 'schedule':
			return <UserSchedule classes={this.props.user.schedule} />
		default:
			return null
		}
	}

	render() {
		if (!this.props.user) {
			return null
		}
		return (
			<section className="dashboard with-aside">
				<SpoofUser setUserData={this.props.setUserData} />
				<aside className="aside-nav">
					<DashboardNavButton label="My Classes" id="schedule" changeNavSection={this.changeNavSection} />
					<DashboardNavButton label="Buy Classes" id="purchase" changeNavSection={this.changeNavSection} />
					<DashboardNavButton label="My Account" id="account" changeNavSection={this.changeNavSection} />
				</aside>
				<main>
					{this.renderActiveSection()}
				</main>
			</section>
		)
	}
}

Dashboard.propTypes = {
	// title: PropTypes.string
}

Dashboard.defaultProps = {
	// title: 'My Title'
}

export default Dashboard
