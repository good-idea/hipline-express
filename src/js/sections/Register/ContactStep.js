import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import Field from '../../UI/Field'


/**
 * ContactStep
 */

class ContactStep extends React.Component {
	constructor(props) {
		super(props)
		this.showOtherText = this.showOtherText.bind(this)
	}

	componentDidMount() {
		this.props.subscribe(['fieldChanged', 'fieldBlurred'], this.showOtherText)
	}

	componentWillUnmount() {
		this.props.unsubscribe(['fieldChanged', 'fieldBlurred'], this.showOtherText)
	}

	showOtherText({ fieldValues, event, triggerFieldId }) {

	}

	render() {
		const classNames = ['form__step']
		if (this.props.active) classNames.push('form__step--active')

		const {
			FirstName,
			LastName,
			BirthDate,
			MobilePhone,
			AddressLine1,
			City,
			PostalCode,
			ReferredBy,
			ReferredByOtherText
		} = this.props.fieldConfig
		return (
			<fieldset className="form__step">
				<Field field={FirstName} />
				<Field field={LastName} />
				<Field field={BirthDate} />
				<Field field={MobilePhone} />
				<Field field={AddressLine1} />
				<Field field={City} />
				<Field field={PostalCode} />
				<Field field={ReferredBy} />
				<Field field={ReferredByOtherText} />
				<button type="button" onClick={this.props.advance}>Next</button>
			</fieldset>
		)
	}
}

ContactStep.propTypes = {
	active: PropTypes.bool,
	subscribe: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired,
	emit: PropTypes.func.isRequired,
}

ContactStep.defaultProps = {
	active: false
}

export default ContactStep
