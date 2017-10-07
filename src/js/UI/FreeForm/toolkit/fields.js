import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { map } from 'ramda'

export const withInputHelpers = (WrappedComponent) => {
	class WrappedInputComponent extends React.Component {
		constructor(props) {
			super(props)
			this.handleChange = this.handleChange.bind(this)
			this.onFormChange = this.onFormChange.bind(this)
			const initialState = {
				valid: props.valid || true,
				disabled: props.disabled || false,
			}
			if (props.initialValue) initialState.value = props.initialValue
			this.state = initialState
		}

		componentDidMount() {
			if (this.context.form) {
				this.context.form.addField(this)
				this.context.form.subscribe('fieldChanged', this.onFormChange)
			}
		}

		componentWillUnmount() {
			if (this.context.form) {
				this.context.form.removeField(this)
				this.context.form.unsubscribe('fieldChanged', this.onFormChange)
			}
		}

		onFormChange(...args) {
			if (this.props.onFormChange) {
				const newState = this.props.onFormChange(Object.assign({}, ...args))
				this.setState(newState)
			}
		}

		componentDidUpdate(prevProps, prevState) {
			if (prevState.helpText !== this.state.helpText) this.props.onHelpTextUpdate(this.state.helpText)
			// console.log(prevState, this.state, this.props)
		}

		validate() {
			// TODO
			return true
		}

		handleChange(e) {
			const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value
			const valid = this.validate()
			this.setState({ value, valid }, () => {
				if (this.context.formGroup) this.context.formGroup.emit('fieldChanged', this.props.id)
				if (this.context.form) this.context.form.emit('fieldChanged', this.props.id)
			})
		}

		buildClassName() {
			const baseClassNames = ['field']
			if (this.state.disabled) baseClassNames.push('field--disabled')
			if (this.state.valid !== true) baseClassNames.push('field--invalid')
			if (this.state.valid === true) baseClassNames.push('field--valid')
			baseClassNames.push(`field__${this.props.name}`)

			const prefix = this.props.classNamePrefix || 'ff__'
			const prefixedClassNames = map(c => `${prefix}${c}`)(baseClassNames)

			return cn([...cn(this.props.classNames), ...prefixedClassNames])
		}

		render() {
			return (
				<WrappedComponent
					onChange={this.handleChange}
					className={this.buildClassName()}
					{...this.props}
					{...this.state}
				/>
			)
		}
	}

	WrappedInputComponent.contextTypes = {
		form: PropTypes.object,
		formGroup: PropTypes.object,
	}

	WrappedInputComponent.propTypes = {
		name: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		initialValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.bool
		]),
		onFormChange: PropTypes.func,
	}

	WrappedInputComponent.defaultProps = {
		initialValue: '',
	}

	return WrappedInputComponent
}


export const somethingElse = 'nothing'
