import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { map } from 'ramda'

export const withInputHelpers = (WrappedComponent) => {
	class FreeFormInputWrapper extends React.Component {
		constructor(props) {
			super(props)
			this.handleChange = this.handleChange.bind(this)
			this.handleBlur = this.handleBlur.bind(this)
			this.handleFocus = this.handleFocus.bind(this)
		}

		componentDidMount() {
			if (this.context.form) {
				this.context.form.addField({
					id: this.props.id,
					value: this.props.initialValue || '',
					name: this.props.name,
					valid: this.props.valid || true,
					required: this.props.required || false,
				})
				this.context.form.subscribe('fieldChanged', this.onFormChange)
			}
		}

		componentWillUnmount() {
			if (this.context.form) {
				this.context.form.removeField(this)
				this.context.form.unsubscribe('fieldChanged', this.onFormChange)
			}
		}

		componentWillReceiveProps(nextProps) {
			// console.log(this.props, nextProps)
		}

		validate() {
			// TODO
			return true
		}

		handleChange(e) {
			const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value
			const valid = this.validate()
			if (this.context.form) {
				this.context.form.emit('fieldChanged', this.props.id)
				this.context.form.setFieldState(this.props.id, { value, valid })
			}
		}

		handleBlur() {
			if (this.context.form) this.context.form.emit('fieldBlurred', this.props.id)
		}

		handleFocus() {
			if (this.context.form) this.context.form.emit('fieldFocused', this.props.id)
		}

		buildClassName() {
			const baseClassNames = ['field']
			if (this.props.disabled) baseClassNames.push('field--disabled')
			if (this.props.valid !== true) baseClassNames.push('field--invalid')
			if (this.props.valid === true) baseClassNames.push('field--valid')
			baseClassNames.push(`field__${this.props.name}`)

			const prefix = this.context.form.classNamePrefix || 'ff__'
			const prefixedClassNames = map(c => `${prefix}${c}`)(baseClassNames)

			return cn([...cn(this.props.classNames), ...prefixedClassNames])
		}

		render() {
			return (
				<WrappedComponent
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
					className={this.buildClassName()}
					{...this.props}
				/>
			)
		}
	}

	FreeFormInputWrapper.contextTypes = {
		form: PropTypes.object,
	}

	FreeFormInputWrapper.propTypes = {
		valid: PropTypes.bool,
		disabled: PropTypes.bool,
		name: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		initialValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.bool,
		]),
		onFormChange: PropTypes.func,
		classNames: PropTypes.oneOfType([
			PropTypes.arrayOf([
				PropTypes.string,
			]),
			PropTypes.string,
		]),
	}

	FreeFormInputWrapper.defaultProps = {
		valid: true,
		disabled: false,
		initialValue: '',
		classNames: '',
		onFormChange: () => {},
	}

	return FreeFormInputWrapper
}

export default withInputHelpers
