import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import cn from 'classnames'
import Field from '../../UI/Field'


/**
 * GETTING LOST HERE AGAIN
 * How to attach 'helpText' and other arbitrary values to a field,
 * and also retrieve them at this level so we can put them in our own markup?
 * Maybe we need to have a 'fieldContainer' HOC / enhancement?
 *
 * e.g., in the Field component..
 *
 * export default asFieldContainer(Field)
 *
 * asFieldContainer:
 *  - requires a field ID
 *  - reads all props from that field and applies them to the wrapped component
 *
 *
 */

/**
 * LoginStep
 */

class LoginStep extends React.Component {
	constructor(props) {
		super(props)
		this.passwordsMustMatch = this.passwordsMustMatch.bind(this)
		this.handleAdvance = this.handleAdvance.bind(this)

		const fields = this.getMergedFieldValues(props, {})
		this.state = {
			fields
		}
	}

	componentDidMount() {
		this.props.subscribe(['fieldChanged', 'fieldBlurred'], this.passwordsMustMatch)
	}

	componentWillUnmount() {
		this.props.unsubscribe(['fieldChanged', 'fieldBlurred'], this.passwordsMustMatch)
	}

	getMergedFieldValues(props = this.props, fieldValues = this.state.fields) {
		return R.mergeDeepLeft(props.fieldConfig, fieldValues)
	}

	passwordsMustMatch({ fieldValues, event, triggerFieldId }) {
		const pass1 = R.path(['Password', 'value'], fieldValues)
		const pass2 = R.path(['Password2', 'value'], fieldValues)
		if ((event === 'fieldBlurred' && triggerFieldId === 'Password2')
			|| (event === 'fieldChanged' && triggerFieldId === 'Password2' && pass1 === pass2)) {
			const helptext = (pass1 !== pass2) ? 'Passwords must match' : ''
			this.props.updateField('Password2', { helptext })
			// this.setState({
			// 	passwordsMatch: (pass1 === pass2),
			// })
		}
	}

	mergeFieldValues() {}

	handleAdvance() {
		const values = this.props.getFieldValues()
	}

	render() {
		const classNames = ['form__step']
		if (this.props.active) classNames.push('form__step--active')
		const { Email, Password, Password2 } = this.getMergedFieldValues()
		return (
			<fieldset className={cn(classNames)}>
				<Field {...Email} initialValue="joseph@good-idea.studio" />
				<Field {...Password} />
				<Field {...Password2} />
				<button type="button" onClick={this.handleAdvance}>Next</button>
			</fieldset>
		)
	}
}

LoginStep.propTypes = {
	active: PropTypes.bool,
	subscribe: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired,
	// emit: PropTypes.func.isRequired,
}

LoginStep.defaultProps = {
	active: false
}

export default LoginStep
