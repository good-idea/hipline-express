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
		this.mustAgree = this.mustAgree.bind(this)
	}

	componentDidMount() {
		this.props.subscribe(['fieldChanged'], this.mustAgree)
	}

	componentWillUnmount() {
		this.props.unsubscribe(['fieldChanged'], this.mustAgree)
	}

	mustAgree({ fieldValues, event, triggerFieldId }) {

	}

	handleSubmit() {

	}

	render() {
		const classNames = ['form__step']
		if (this.props.active) classNames.push('form__step--active')
		const { Email, Password, Password2 } = this.props.fieldConfig
		return (
			<fieldset className={cn(classNames)}>
				<button onClick={this.props.handleSubmit}>Submit</button>
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
	active: false,
}

export default LoginStep
