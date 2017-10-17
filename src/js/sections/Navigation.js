import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * Navigation
 */

class Navigation extends React.Component {
	constructor(props) {
		super(props)
		this.showLogin = this.showLogin.bind(this)
		this.showRegister = this.showRegister.bind(this)
	}

	showLogin() {
		this.props.setDropdown('login')
	}

	showRegister() {
		this.props.setDropdown('register')
	}

	render() {
		return (
			<nav>
				<div className="nav__group">
					<h3 className="nav__item"><Link to="/">Hipline</Link></h3>
					<h3 className="nav__item"><Link to="/">Choreographers</Link></h3>
					<h3 className="nav__item"><Link to="/classes">Classes</Link></h3>
					<h3 className="nav__item"><Link to="/community">Community</Link></h3>
					<h3 className="nav__item"><Link to="/about">About</Link></h3>
					<h3 className="nav__item"><Link to="/schedule">Schedule</Link></h3>
				</div>
				<div className="nav__group">
					<h3 className="nav__item"><button onClick={this.showLogin} >Login</button></h3>
					<h3 className="nav__item"><button onClick={this.showRegister} >Sign Up</button></h3>
				</div>
			</nav>
		)
	}
}

Navigation.propTypes = {
	setDropdown: PropTypes.func.isRequired,
}

Navigation.defaultProps = {
	// title: 'My Title'
}

export default Navigation
