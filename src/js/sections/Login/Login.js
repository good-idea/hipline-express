import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import axios from 'axios'
import R from 'ramda'

import LoginForm from './LoginForm'
import ForgotForm from './ForgotForm'
import { serializeForSoap } from '../../utils/mbo'

/**
 * Login
 */

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loginMessage: undefined,
			showForgot: false,
			forgotMessage: undefined,
			disableForgotForm: false,
		}
	}

	closeDropdown = () => {
		this.props.setDropdown(false)
	}

	handleUserForgot = (userInfo) => {
		const serializedUserInfo = serializeForSoap(userInfo)
		axios.post('/api/mbo/forgot', serializedUserInfo).then((response) => {
			this.setState({
				forgotMessage: 'Check your email for instructions on resetting your password on the MindBodyOnline website.\nAfter creating a new password, you can return here to log in.',
				disableForgotForm: true,
			})
		}).catch((err) => {
			this.setState({ disableForgotForm: true })
		})

	}

	handleUserLogin = (userInfo) => {
		const serializedUserInfo = serializeForSoap(userInfo)
		axios.post('/api/mbo/login', serializedUserInfo).then((response) => {
			const { user, token } = response.data
			this.props.loginUser({ user, token })
			this.closeDropdown()
		}).catch((err) => {
			this.setState({
				loginMessage:  R.path(['response', 'data', 'message'], err) || ''
			})
		})
	}

	toggleForgot = () => {
		this.setState({ showForgot: !this.state.showForgot })
	}

	render() {
		const classNames = ['login', 'dropdown']
		if (this.props.open) classNames.push('dropdown--open')
		if (this.state.showForgot) classNames.push('login--forgot')

		if (!this.props.fieldConfig) {
			return (
				<section className={cn(classNames)}>
					<h4>error?</h4>
				</section>
			)
		}
		const loginFields = R.pick(['Username', 'Password'])(this.props.fieldConfig)
		const forgotFields = R.pick(['Username', 'FirstName', 'LastName'])(this.props.fieldConfig)

		const form = (this.state.showForgot)
			? (<ForgotForm
				message={this.state.forgotMessage}
				disabled={this.state.disableForgotForm}
				onSubmit={this.handleUserForgot}
				fieldConfig={forgotFields}
			/>)
			: (<LoginForm
				message={this.state.loginMessage}
				onSubmit={this.handleUserLogin}
				fieldConfig={loginFields}
			/>)

		const toggleText = (this.state.showForgot) ? 'Return to Login' : 'Forgot your password?'
		return (
			<section className={cn(classNames)}>
				<div className="column">
					<button onClick={this.closeDropdown} className="dropdown__ex" />
					{form}
					<button className="secondary login__toggleForgot" onClick={this.toggleForgot}>{toggleText}</button>
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
