import React from 'react'
import PropTypes from 'prop-types'
import { cn, slugify } from '../../utils/helpers'

/**
 * FormErrors
 */

const FormErrors = props => {
  if (props.errors.length === 0) return null
  const classNames = ['form__errors']
  return (
    <div className={cn(classNames, props.classNames)}>
      {props.errors.map(e => (
        <h4 key={`error-${slugify(e)}`} className="form_error">
          {e}
        </h4>
      ))}
    </div>
  )
}

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  classNames: PropTypes.arrayOf(PropTypes.string),
}

FormErrors.defaultProps = {
  errors: [],
  classNames: [],
}

export default FormErrors
