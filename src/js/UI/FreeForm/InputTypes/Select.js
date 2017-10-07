import React from 'react'
import PropTypes from 'prop-types'

import { withInputHelpers } from '../toolkit/fields'

/**
 * Input
 */

/**
 * Select
 */

const Select = props => (
	<select
		id={props.id}
		name={props.name}
		value={props.value}
		onChange={props.onChange}
		className={props.className}
	>
		{ React.Children.map(props.children, c => React.cloneElement(c, {})) }
	</select>
)

Select.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]).isRequired,
	className: PropTypes.string,
}

Select.defaultProps = {
	value: '',
	className: '',
}

export default withInputHelpers(Select)
