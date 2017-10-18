import React from 'react'
import PropTypes from 'prop-types'
import { asFreeForm } from '../../UI/FreeForm/toolkit'
import FieldContainer from '../../UI/FieldContainer'

/**
 * LoginForm
 */

/**
 * LoginForm
 */

const LoginForm = (props) => {
	const { Username, Password } = props.fieldConfig
	return (
		<form onSubmit={props.onSubmit}>
			<div className="fieldset horizontal--two">
				<FieldContainer {...Username} />
				<FieldContainer {...Password} />
			</div>
			<button className="cta" type="submit">Log In</button>
		</form>
	)
}

LoginForm.propTypes = {
	// title: PropTypes.string
}

LoginForm.defaultProps = {
	// title: 'My Title'
}

export default asFreeForm(LoginForm)
