import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import { cn } from '../../utils/helpers'

import Field from './FieldTypes'

/**
 * FormField
 */

class FormField extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onFormUpdate = this.onFormUpdate.bind(this)
    this.validate = this.validate.bind(this)
    const baseState = {
      classNames: [],
      value: props.initialValue || '',
      valid: props.valid || true,
      disabled: props.disabled || false,
    }

    const initialState = props.onFormUpdate ? props.onFormUpdate(props.getFormValues(), baseState) : baseState

    this.state = initialState
  }

  componentWillMount() {
    this.props.registerField({
      name: this.props.name,
      validate: this.validate,
      state: this.state,
      onFormUpdate: this.onFormUpdate || false,
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (nextState !== this.state) return t
    if (this.props === nextProps && this.state === nextState) return false
    return true
  }

  /**
   * Receives all of the form's fields, and, if there is a 'onFormUpdate' function
   * in the props, uses it to update the existing state.
   * @param  {[type]} formFields [description]
   * @return {[type]}            [description]
   */
  onFormUpdate(values) {
    if (this.props.onFormUpdate) {
      const newState = this.props.onFormUpdate(values, this.state)
      this.setState({ ...newState })
    }
  }

  validate() {
    return true
  }

  handleChange(e) {
    const valid = this.validate()
    const value = e.target.value
    this.setState({ value, valid })
    this.props.updateFieldState(this.props.name, { value, valid })
  }

  render() {
    const classNames = [...this.state.classNames, 'form__field']
    if (!this.state.valid) classNames.push('form__field--invalid')
    const input = <Field {...R.pick(['name', 'value', 'type', 'options'], this.props)} onChange={this.handleChange} />
    return (
      <div className={cn(classNames)}>
        <label htmlFor={this.props.name}>
          <h4>{this.props.label}</h4>
        </label>
        {input}
      </div>
    )
  }
}

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  type: PropTypes.string,
  updateFieldState: PropTypes.func,
  registerField: PropTypes.func,
}

FormField.defaultProps = {
  type: 'text',
  label: '',
  initialValue: '',
  updateFieldState: () => {},
  registerField: () => {},
}

export default FormField
