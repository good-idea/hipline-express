import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Login from './Login/Login'
import Register from './Register/Register'

/**
 * Navigation
 */

class Navigation extends React.Component {
	constructor(props) {
		super(props)
		this.showLogin = this.showLogin.bind(this)
		this.showRegister = this.showRegister.bind(this)
		this.logoutUser = this.logoutUser.bind(this)
	}

	showLogin() {
		this.props.setDropdown('login')
	}

	showRegister() {
		this.props.setDropdown('register')
	}

	logoutUser() {
		this.props.logoutUser()
	}

	renderUserMenu() {
		if (this.props.user === false) {
			return (
				<div className="nav__group">
					<h3 className="nav__item"><button onClick={this.showLogin}>Login</button></h3>
					<h3 className="nav__item"><button onClick={this.showRegister}>Sign Up</button></h3>
				</div>
			)
		}
		if (this.props.user) {
			return (
				<div className="nav__group">
					<h3 className="nav__item nav__item--username">Hi, {this.props.user.FirstName}!</h3>
					<h3 className="nav__item nav__item--secondary"><button onClick={this.logoutUser}>Log Out</button></h3>
				</div>
			)
		}
		return null
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
				{this.renderUserMenu()}
				<Login
					setDropdown={this.props.setDropdown}
					open={this.props.dropdown === 'login'}
					loginUser={this.props.loginUser}
					fieldConfig={this.props.registrationFields}
				/>
				<Register
					setDropdown={this.props.setDropdown}
					open={this.props.dropdown === 'register'}
					loginUser={this.props.loginUser}
					fieldConfig={this.props.registrationFields}
					liabilityText={this.props.liabilityText}
				/>
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
