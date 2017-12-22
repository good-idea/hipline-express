import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
// import Login from './Login/Login'
// import Register from './Register/Register'

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
				<div className="nav__item nav__item--logo">
					<NavLink to="/">
						<img src="/images/hipline-logo.png" alt="Hipline" />
					</NavLink>
				</div>
				<h3 className="nav__item">
					<NavLink exact activeClassName="navlink-active" to="/">
						Choreographers
					</NavLink>
				</h3>
				<h3 className="nav__item">
					<NavLink exact activeClassName="navlink-active" to="/classes">
						Classes
					</NavLink>
				</h3>
				{this.props.infoPages.map(page => (
					<h3 className="nav__item" key={page.slug}>
						<NavLink
							exact
							activeClassName="navlink-active"
							href={`/${page.slug}`}
							to={`/${page.slug}`}
						>
							{page.title}
						</NavLink>
					</h3>
				))}
				<h3 className="nav__item">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://clients.mindbodyonline.com/classic/mainclass?studioid=4561"
					>
						Schedule
					</a>
				</h3>
			</nav>
		)
	}
}

Navigation.propTypes = {
	// setDropdown: PropTypes.func.isRequired,
}

Navigation.defaultProps = {
	// title: 'My Title'
}

export default Navigation
