import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import cn from 'classnames'
import FieldContainer from '../../UI/FieldContainer'


/**
 * AcceptStep
 */

class AcceptStep extends React.Component {
	constructor(props) {
		super(props)
		this.showOtherText = this.showOtherText.bind(this)
		this.mustAgree = this.mustAgree.bind(this)
	}

	componentDidMount() {
		this.props.subscribe(['fieldChanged', 'fieldBlurred'], this.showOtherText)
		this.props.subscribe(['fieldChanged'], this.mustAgree)
	}

	componentWillUnmount() {
		this.props.unsubscribe(['fieldChanged', 'fieldBlurred'], this.showOtherText)
		this.props.unsubscribe(['fieldChanged'], this.mustAgree)
	}

	mustAgree({ fieldValues, event, triggerFieldId }) {

	}

	showOtherText({ fieldValues, event, triggerFieldId }) {
		// console.log(triggerFieldId, R.path(['ReferredBy', 'value'], fieldValues), R.path(['ReferredBy', 'value'], fieldValues) === 'Other')
		if (triggerFieldId === 'ReferredBy') {
			const referralIsOther = (R.path(['ReferredBy', 'value'], fieldValues) === 'Other')
			// this.setState({ referralIsOther })
			this.props.updateField('ReferredByOtherText', { visible: referralIsOther, disabled: !referralIsOther })
		}
	}

	render() {
		const classNames = ['horizontal', 'form__step']
		if (this.props.active) classNames.push('form__step--active')
		const { ReferredBy, ReferredByOtherText, LiabilityRelease, EmailOptIn } = this.props.fieldConfig
		return (
			<div className={cn(classNames)}>
				<div className="fieldset">
					<h5 className="liabilityRelease">{this.props.liabilityText}</h5>
					<div className="column--mini">
						<FieldContainer {...LiabilityRelease} />
						<FieldContainer {...EmailOptIn} />
						<FieldContainer {...ReferredBy} />
						<FieldContainer {...ReferredByOtherText} placeholder="Referred by..." disabled visible={false} />
					</div>
				</div>

				<button className="cta" onClick={this.props.handleSubmit}>Let's Go!</button>
			</div>
		)
	}
}

AcceptStep.propTypes = {
	active: PropTypes.bool,
	subscribe: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired,
}

AcceptStep.defaultProps = {
	active: false,
}

export default AcceptStep
