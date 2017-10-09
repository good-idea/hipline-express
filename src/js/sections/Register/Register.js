import React from 'react'
import PropTypes from 'prop-types'

import RegistrationForm from './RegistrationForm'

/**
 * Register
 */

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.advance = this.advance.bind(this)
		this.state = {
			currentStep: 1,
			totalSteps: 3,
		}
	}

	advance() {
		const currentStep = Math.min(this.state.currentStep + 1, this.state.totalSteps)
		this.setState({ currentStep })
	}

	goBack() {
		const currentStep = Math.max(this.state.currentStep - 1, 1)
		this.setState({ currentStep })

	}

	handleSubmit(fields) {
		console.log(fields)

		// this.props.registerUser(userInfo)
	}

	render() {
		return (
			<div>
				<div className="sequentialForm">
					<h5>Step {this.state.currentStep} of {this.state.totalSteps}</h5>
					<RegistrationForm
						classNamePrefix=""
						advance={this.advance}
						currentStep={this.state.currentStep}
						onSubmit={this.handleSubmit}
						fieldConfig={this.props.registrationFields}
					/>
				</div>
			</div>
		)
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	registrationFields: PropTypes.arrayOf(PropTypes.shape),
}

Register.defaultProps = {
	registrationFields: undefined,
}

export default Register
