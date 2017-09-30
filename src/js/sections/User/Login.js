import React from 'react'
import PropTypes from 'prop-types'

/**
 * Login
 */

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			email: '',
			password: '',
		}
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
		return (
			<section className="login">
				<form className="column--narrow" onSubmit={this.handleSubmit}>
					<div className="form__field">
						<label htmlFor="email">
							<h4>Email Address</h4>
						</label>
						<input type="email" className="" name="email" onChange={this.changeEmail} />
					</div>
					<div className="form__field">
						<label htmlFor="password">
							<h4>Password</h4>
						</label>
						<input type="password" name="password" onChange={this.changePassword} />
					</div>
					<button className="cta" type="submit">
						<h4>Log In</h4>
					</button>
				</form>
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
