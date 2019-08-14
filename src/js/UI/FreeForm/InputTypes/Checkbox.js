import React from 'react'
import PropTypes from 'prop-types'

import { withInputHelpers } from '../toolkit/fields'

/**
 * Checkbox
 */

const Checkbox = props => (
  <input
    id={props.id}
    name={props.name}
    type="checkbox"
    checked={props.value}
    onChange={props.onChange}
    className={props.className}
  />
)

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Checkbox.defaultProps = {
  value: false,
  className: '',
}

export default withInputHelpers(Checkbox)
