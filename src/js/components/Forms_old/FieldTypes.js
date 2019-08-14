import React from 'react'
import PropTypes from 'prop-types'

/**
 * Select
 */

const Select = props => {
  return (
    <select onChange={props.onChange} value={props.value}>
      {props.options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
}

Select.defaultProps = {
  options: [],
}

/**
 * Main Fieldtypes Function
 */

const Field = props => {
  if (!props.name) return null
  switch (props.type) {
    case 'textarea':
      return <textarea {...props} />
    case 'select':
      return <Select {...props} />
    default:
      return <input {...props} type={props.type || 'text'} />
  }
}

export default Field
