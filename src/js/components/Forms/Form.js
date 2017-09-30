import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { cn } from '../../utils/helpers'

import FormErrors from './FormErrors'

/**
 * Form
 *  - Renders fields by props.children or as TODO schema
 *  - Updates its state if fields are valid/invalid/complete
 *  - Validates all fields before successful submit
 *  - Passes an object of all values to the handleSubmit function
 */

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
		this.registerField = this.registerField.bind(this)
		this.updateFieldState = this.updateFieldState.bind(this)
		this.getFormValues = this.getFormValues.bind(this)
		this.fields = []
		this.state = {
			valid: true,
			errors: [],
		}
	}

	onSubmit(e) {
		e.preventDefault()
		this.props.handleSubmit(
			this.fields.reduce((acc, current) => (
				R.assoc(current.name, current.state.value, acc)
			), {}),
		)
	}

	getFormValues() {
		return R.reduce((fields, field) => {
			fields[field.name] = R.pipe(
				R.prop('state'),
				R.pickAll(['valid', 'value']),
			)(field)
			return fields
		}, {})(this.fields)
	}

	registerField(field) {
		this.fields.push(field)
	}

	updateFieldState(name, newState) {
		const index = R.findIndex(R.propEq('name', name))(this.fields)
		const newField = R.assoc('state', newState)(this.fields[index])
		this.fields = [
			...this.fields.slice(0, index),
			newField,
			...this.fields.slice(index + 1),
		]
		const values = this.getFormValues()
		this.fields.map((f) => { f.onFormUpdate(values) })

		// Check to see if the form is valid
		const valid = (R.filter(
			R.pathEq(['state', 'valid'], false),
		)(this.fields).length === 0)
		if (this.state.valid !== valid) this.setState({ valid })
	}

	renderFormErrors() {
		// A default form error renderer.
		// If a FormError component was not supplied in the children, create one here.
		if (this.props.children.find(c => R.pathEq(['type', 'displayName'], 'FormErrors', c))) return null
		return <FormErrors errors={[...this.props.errors, ...this.state.errors]} />
	}

	render() {
		const classNames = []
		if (!this.state.valid) classNames.push('invalid')
		return (
			<form className={cn(classNames, this.props.classNames)} onSubmit={this.onSubmit} action="">
				{ React.Children.map(this.props.children, (c) => {
					if (['FormField', 'Fieldset'].includes(c.type.displayName)) {
						return React.cloneElement(c,
							{
								registerField: this.registerField,
								updateFieldState: this.updateFieldState,
								getFormValues: this.getFormValues
							})
					} else if (c.type.displayName === 'FormErrors') {
						return React.cloneElement(c, { errors: [...this.props.errors, ...this.state.errors] })
					}
					return React.cloneElement(c)
				})}
				{this.renderFormErrors()}
			</form>

		)
	}
}

Form.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.string),
	handleSubmit: PropTypes.func.isRequired,
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	classNames: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string),
	]),
}

Form.defaultProps = {
	errors: [],
	classNames: [''],
}

module.exports = Form
