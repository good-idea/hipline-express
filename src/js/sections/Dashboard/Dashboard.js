import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Cookies from 'js-cookie'

/**
 * Dashboard
 */

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		if (this.props.user) this.loadUserData()
	}

	componentWillReceiveProps() {
		if (!this.props.user) this.loadUserData()
	}

	loadUserData = () => {
		axios.get('/api/mbo/user/account', {
			headers: { 'x-access-token': Cookies.get('jwt') || false },
		}).then((response) => {
			console.log(response)
			/// YO!!!!!
			/// Some MBO methods will return an ARRAY if there are multiple results,
			/// but an OBJECT if there are one.
		}).catch((err) => console.log(err, err.response))
	}

	render() {
		console.log(this.props.user)
		if (!this.props.user) {
			this.props.setDropdown('login')
			return null
		}
		return (
			<section className="dashboard">
				<aside className="scrollable__nav">
					<h3>nav item</h3>
				</aside>

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
