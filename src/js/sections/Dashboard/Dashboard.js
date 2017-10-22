import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Cookies from 'js-cookie'

import DashboardNavButton from './DashboardNavButton'
import Schedule from './Schedule'


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
			this.loadUserData()
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.user && nextProps.user) this.loadUserData()
	}

	loadUserData = () => {
		axios.get('/api/mbo/user/account', {
			headers: { 'x-access-token': Cookies.get('jwt') || false },
		}).then((response) => {
			this.props.setUserData(response.data.user)
		}).catch((err) => console.log(err, err.response))
	}

	changeNavSection = (id) => {
		this.setState({ view: id })
	}

	renderActiveSection() {
		switch (this.state.view) {
		case 'schedule':
			return <Schedule classes={this.props.user.schedule} />
		default:
			return null
		}
	}

	render() {
		if (!this.props.user) {
			return null
		}
		return (
			<section className="dashboard">
				<SpoofUser setUserData={this.props.setUserData} />
				<aside className="aside-nav">
					<DashboardNavButton label="My Classes" id="schedule" changeNavSection={this.changeNavSection} />
					<DashboardNavButton label="Buy Classes" id="purchase" changeNavSection={this.changeNavSection} />
					<DashboardNavButton label="My Account" id="account" changeNavSection={this.changeNavSection} />
				</aside>
				{this.renderActiveSection()}
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
