import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import cn from 'classnames'
import FieldContainer from '../../UI/FieldContainer'

import { checkForRequiredFields, checkForValidFields } from '../../UI/FreeForm/utils/fields'

/**
 * ContactStep
 */

class ContactStep extends React.Component {
	constructor(props) {
		super(props)
		this.handleAdvance = this.handleAdvance.bind(this)
		this.checkIfReady = this.checkIfReady.bind(this)

		this.state = {
			referralIsOther: false
		}
	}

	componentDidMount() {
		this.props.subscribe(['fieldChanged'], this.checkIfReady)
	}

	componentWillUnmount() {
		this.props.subscribe(['fieldChanged'], this.checkIfReady)
	}

	checkIfReady() {
		if (!this.props.active) return false
		const values = this.props.getFieldValues()
		const requiredAreFilled = checkForRequiredFields(R.keys(this.props.fieldConfig), values)
		const allFieldsAreValid = checkForValidFields(R.keys(this.props.fieldConfig), values)
		const canAdvance = (requiredAreFilled && allFieldsAreValid)
		this.setState({
			canAdvance
		})
		return canAdvance
	}


	handleAdvance() {
		const canAdvance = this.checkIfReady()
		if (canAdvance) this.props.advance()
	}

	render() {
		const classNames = ['form__step', 'form__step--contactStep']
		if (this.props.active) classNames.push('form__step--active')
		if (this.state.canAdvance) classNames.push('form__step--canAdvance')

		const {
			FirstName,
			LastName,
			BirthDate,
			MobilePhone,
			AddressLine1,
			City,
			State,
			PostalCode,
		} = this.props.fieldConfig
		return (
			<div className={cn(classNames)}>
				<div className="fieldset horizontal--four">
					<FieldContainer {...FirstName} />
					<FieldContainer {...LastName} />
					<FieldContainer {...BirthDate} />
					<FieldContainer {...MobilePhone} />
					<FieldContainer {...AddressLine1} />
					<FieldContainer {...City} />
					<FieldContainer {...State} />
					<FieldContainer {...PostalCode} />
				</div>
				<button type="button" className="cta form__step--advanceButton" onClick={this.handleAdvance}>Next</button>
			</div>
		)
	}
}

ContactStep.propTypes = {
	fieldConfig: PropTypes.shape().isRequired,
	active: PropTypes.bool,
	subscribe: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired,
	advance: PropTypes.func.isRequired,
	getFieldValues: PropTypes.func.isRequired,
}

ContactStep.defaultProps = {
	active: false,
}

export default ContactStep
