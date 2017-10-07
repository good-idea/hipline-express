import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import { Form, Input } from '../../UI/FreeForm'
import Field from '../../UI/Field'

import LoginStep from './LoginStep'
import ContactStep from './ContactStep'
import AcceptStep from './AcceptStep'

/**
 * Field Helper Functions
 */

const showOtherText = (formFields, currentState) => {
	const classNames = (formFields.ReferredBy.value === 'Other') ?
		R.filter(c => c !== 'form__field--hidden', currentState.classNames) :
		R.uniq([...currentState.classNames, 'form__field--hidden'])
	return { classNames }
}

/**
 * Register
 */

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.advance = this.advance.bind(this)
		const fields = (props.registrationFields) ? (
			R.pipe(
				R.map(f => R.assoc('id', f.name, f)),
				R.reduce((acc, f) => R.assoc(f.name, f, acc), {}),
			)(props.registrationFields)
		) : false
		console.log(fields)
		this.state = {
			currentStep: 0,
			totalSteps: 3,
			fields,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.fields === false) {
			const fields = this.sortFields(nextProps)
			this.setState({ fields })
		}
	}

	advance() {
		const currentStep = Math.min(this.state.currentStep + 1, this.state.totalSteps)
		this.setState({ currentStep })
	}

	getField(name) {
		return this.props.fields.find(f => f.name === name)
	}

	handleSubmit(fields) {
		console.log(fields)
		// this.props.registerUser(userInfo)
	}

	render() {
		if (!this.state.fields) return null
		const loginFields = R.pick(['Email', 'Password', 'Password2'])(this.state.fields)
		const contactFields = R.pick(['FirstName', 'LastName', 'BirthDate', 'MobilePhone', 'AddressLine1', 'City', 'PostalCode', 'ReferredBy', 'ReferredByOtherText'])(this.state.fields)
		const acceptFields = R.pick(['LiabilityRelease', 'EmailOptIn'])(this.state.fields)

		return (
			<div>
				<div className="sequentialForm">
					<h5>Step {this.state.currentStep} of {this.state.totalSteps}</h5>
					<Form onSubmit={this.onSubmit} >
						<LoginStep currentStep={this.state.currentStep} advance={this.advance} fields={loginFields} />
						<ContactStep currentStep={this.state.currentStep} advance={this.advance} fields={contactFields} />
						<AcceptStep currentStep={this.state.currentStep} fields={acceptFields} />
					</Form>
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
