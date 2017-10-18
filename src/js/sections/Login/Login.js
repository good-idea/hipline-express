import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import axios from 'axios'
import R from 'ramda'

import LoginForm from './LoginForm'
import { serializeForSoap } from '../../utils/mbo'

/**
 * Login
 */

class Login extends React.Component {
	closeDropdown = () => {
		this.props.setDropdown(false)
	}

	handleUserLogin = (userInfo) => {
		const serializedUserInfo = serializeForSoap(userInfo)
		axios.post('/api/mbo/login', serializedUserInfo).then((response) => {
			console.log(response)
			this.props.loginUser(response.data.Client, response.data.GUID)
		}).catch((err) => {
			console.log(err)
		})
	}

	render() {
		const classNames = ['login', 'dropdown']
		if (this.props.open) classNames.push('dropdown--open')
		const loginFields = R.pick(['Username', 'Password'])(this.props.fieldConfig)

		return (
			<section className={cn(classNames)}>
				<div className="column--narrow">
					<button onClick={this.closeDropdown} className="dropdown__ex" />
					<LoginForm
						onSubmit={this.handleUserLogin}
						fieldConfig={loginFields}
					/>
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
