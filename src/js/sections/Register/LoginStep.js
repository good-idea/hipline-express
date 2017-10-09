import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import cn from 'classnames'
import Field from '../../UI/Field'


/**
 * LoginStep
 */

class LoginStep extends React.Component {
	constructor(props) {
		super(props)
		this.passwordsMustMatch = this.passwordsMustMatch.bind(this)
		this.handleAdvance = this.handleAdvance.bind(this)
	}

	componentDidMount() {
		this.props.subscribe(['fieldChanged', 'fieldBlurred'], this.passwordsMustMatch)
	}

	componentWillUnmount() {
		this.props.unsubscribe(['fieldChanged', 'fieldBlurred'], this.passwordsMustMatch)
	}

	passwordsMustMatch({ fieldValues, event, triggerFieldId }) {

		const pass1 = R.path(['Password', 'value'], fieldValues)
		const pass2 = R.path(['Password2', 'value'], fieldValues)
		if ((event === 'fieldBlurred' && triggerFieldId === 'Password2')
			|| (event === 'fieldChanged' && triggerFieldId === 'Password2' && pass1 === pass2)) {
			const helpText = (pass1 !== pass2) ? 'Passwords must match' : ''
			// this.setState({
			// 	passwordsMatch: (pass1 === pass2),
			// })
		}
	}

	handleAdvance() {
		const values = this.props.getFieldValues()

		console.log(values, this.state)
	}

	render() {
		const classNames = ['form__step']
		if (this.props.active) classNames.push('form__step--active')
		const { Email, Password, Password2 } = this.props.fieldConfig
		return (
			<fieldset className={cn(classNames)}>
				<Field field={Email} initialValue="joseph@good-idea.studio" />
				<Field field={Password} />
				<Field field={Password2} />
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
