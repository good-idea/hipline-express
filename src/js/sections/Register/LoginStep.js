import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import Field from '../../UI/Field'
import Input from '../../UI/FreeForm'

/**
 * Form Event Handlers
 */

const passwordsMustMatch = (fields) => {
	const trigger = R.pipe(
		R.filter(f => f.triggeredChange === true),
		R.keys,
		R.head,
	)(fields)

	const password1 = fields.Password.value
	const password2 = fields.Password2.value
	if (trigger === 'Password2' && password1 !== password2) return { valid: false, helpText: 'Passwords Must Match' }
	if ((trigger === 'Password' || trigger === 'Password2') && (password1 === password2)) return { valid: true, helpText: '' }
}

/**
 * LoginStep
 */

class LoginStep extends React.Component {
	constructor(props) {
		super(props)
		console.log('')
	}

	render() {
		const { Email, Password, Password2 } = this.props.fields
		return (
			<fieldset className="form__step">
				<Field field={Email} />
				<Field field={Password} />
				<Field field={Password2} onFormChange={passwordsMustMatch} />
				<button onClick={this.props.advance}>Next</button>
			</fieldset>
		)
	}
}

LoginStep.propTypes = {
	// title: PropTypes.string
}

LoginStep.defaultProps = {
	// title: 'My Title'
}

export default LoginStep
