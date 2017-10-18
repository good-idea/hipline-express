import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import cn from 'classnames'
import FieldContainer from '../../UI/FieldContainer'

import { checkForRequiredFields, checkForValidFields } from '../../UI/FreeForm/utils/fields'

/**
 * LoginStep
 */

class LoginStep extends React.Component {
	constructor(props) {
		super(props)
		this.passwordsMustMatch = this.passwordsMustMatch.bind(this)
		this.checkIfReady = this.checkIfReady.bind(this)
		this.handleAdvance = this.handleAdvance.bind(this)
		this.handleEnterKey = this.handleEnterKey.bind(this)

		this.state = {}
	}

	componentDidMount() {
		this.props.subscribe('enterKeyPressed', this.handleEnterKey)
		this.props.subscribe(['fieldChanged', 'fieldBlurred'], this.passwordsMustMatch)
		this.props.subscribe(['fieldChanged'], this.checkIfReady)
	}

	componentWillUnmount() {
		this.props.unsubscribe('enterKeyPressed', this.handleEnterKey)
		this.props.unsubscribe(['fieldChanged', 'fieldBlurred'], this.passwordsMustMatch)
		this.props.unsubscribe(['fieldChanged'], this.checkIfReady)
	}

	checkIfReady() {
		const values = this.props.getFieldValues()
		const requiredAreFilled = checkForRequiredFields(R.keys(this.props.fieldConfig), values)
		const allFieldsAreValid = checkForValidFields(R.keys(this.props.fieldConfig), values)
		const passwordsMatch = (R.path(['Password', 'value'], values) === R.path(['Password2', 'value'], values))
		const canAdvance = (requiredAreFilled && allFieldsAreValid && passwordsMatch)
		this.setState({
			canAdvance,
		})
		return canAdvance
	}

	passwordsMustMatch(args) {
		const { fieldValues, topic, triggerFieldId } = args
		// console.log(args)
		const pass1 = R.path(['Password', 'value'], fieldValues)
		const pass2 = R.path(['Password2', 'value'], fieldValues)
		if ((topic === 'fieldBlurred' && triggerFieldId === 'Password2')
			|| (topic === 'fieldChanged' && pass1 === pass2)) {
			const helptext = (pass1 === pass2) ? '' : 'Passwords must match'
			this.props.updateField('Password2', { helptext, valid: pass1 === pass2 }, this.checkIfReady)
		}
	}

	handleEnterKey({ event }) {
		if (this.props.active) {
			event.preventDefault()
			event.stopPropagation()
			this.handleAdvance()
		}
	}

	handleAdvance() {
		const canAdvance = this.checkIfReady()
		if (canAdvance) this.props.advance()
	}

	render() {
		const classNames = ['form__step']
		if (this.props.active) classNames.push('form__step--active')
		if (this.state.canAdvance) classNames.push('form__step--canAdvance')
		const { Username, Password, Password2 } = this.props.fieldConfig
		return (
			<div className={cn(classNames)}>
				<div className="fieldset horizontal">
					<FieldContainer {...Username} />
					<FieldContainer {...Password} />
					<FieldContainer {...Password2} />
				</div>
				<button type="button" className="cta form__step--advanceButton" onClick={this.handleAdvance}>Next</button>
			</div>
		)
	}
}

LoginStep.propTypes = {
	fieldConfig: PropTypes.shape().isRequired,
	active: PropTypes.bool,
	subscribe: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired,
	advance: PropTypes.func.isRequired,
	getFieldValues: PropTypes.func.isRequired,
	// emit: PropTypes.func.isRequired,
}

LoginStep.defaultProps = {
	active: false
}

export default LoginStep
