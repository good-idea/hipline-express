import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

/**
 * Login
 */

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.closeDropdown = this.closeDropdown.bind(this)
		this.state = {
			email: '',
			password: '',
		}
	}

	closeDropdown() {
		this.props.setDropdown(false)
	}

	handleEmailChange(e) {
		this.setState({ email: e.evt.target })
	}

	handlePasswordChange(e) {
		this.setState({ email: e.evt.target })
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.loginUser({
			email: this.state.user,
			password: this.state.password,
		})
	}

	render() {
		const classNames = ['login', 'dropdown']
		if (this.props.open) classNames.push('dropdown--open')
		return (
			<section className={cn(classNames)}>
				<div className="column">
					<button onClick={this.closeDropdown} className="dropdown__ex" />
					<form className="column--narrow" onSubmit={this.handleSubmit}>
						<div className="fieldset horizontal">
							<div className="field">
								<label htmlFor="email">
									<h4>Email Address</h4>
								</label>
								<input type="email" className="" name="email" onChange={this.changeEmail} />
							</div>
							<div className="field">
								<label htmlFor="password">
									<h4>Password</h4>
								</label>
								<input type="password" name="password" onChange={this.changePassword} />
							</div>
						</div>
						<button className="cta" type="submit">
							<h4>Log In</h4>
						</button>
					</form>
				</div>
			</section>
		)
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
}

Login.defaultProps = {
	// title: 'My Title'
}

export default Login
