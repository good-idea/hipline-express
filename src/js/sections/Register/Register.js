import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import RegistrationForm from './RegistrationForm'

/**
 * Register
 */

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.advance = this.advance.bind(this)
		this.closeDropdown = this.closeDropdown.bind(this)
		this.state = {
			currentStep: 1,
			totalSteps: 3,
		}
	}

	closeDropdown() {
		this.props.setDropdown(false)
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
		const classNames = ['register', 'dropdown']
		if (this.props.open) classNames.push('dropdown--open')
		return (
			<section className={cn(classNames)}>
				<div className="column sequentialForm">
					<button onClick={this.closeDropdown} className="dropdown__ex" />
					<h5>Step {this.state.currentStep} of {this.state.totalSteps}</h5>
					<RegistrationForm
						classNamePrefix=""
						advance={this.advance}
						currentStep={this.state.currentStep}
						onSubmit={this.handleSubmit}
						fieldConfig={this.props.registrationFields}
						liabilityText={this.props.liabilityText}
					/>
				</div>
			</section>
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
