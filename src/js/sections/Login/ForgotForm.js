import React from 'react'
import PropTypes from 'prop-types'
import { asFreeForm } from '../../UI/FreeForm/toolkit'
import FieldContainer from '../../UI/FieldContainer'
import { cn } from '../../utils/helpers'

/**
 * ForgotForm
 */

const ForgotForm = (props) => {
	const { FirstName, LastName, Username } = props.fieldConfig
	return (
		<form className={cn(props.className)} onSubmit={props.onSubmit}>
			<div className="fieldset horizontal">
				<FieldContainer {...FirstName} />
				<FieldContainer {...LastName} />
				<FieldContainer {...Username} />
			</div>
			<button className="cta" type="submit">Submit</button>
			<div className="form__message column--narrow">
				<h4>{props.message}</h4>
			</div>
		</form>
	)
}

ForgotForm.propTypes = {
	// title: PropTypes.string
}

ForgotForm.defaultProps = {
	// title: 'My Title'
}

export default asFreeForm(ForgotForm)
