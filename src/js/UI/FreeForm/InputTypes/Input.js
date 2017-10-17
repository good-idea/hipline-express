import React from 'react'
import PropTypes from 'prop-types'

import { withInputHelpers } from '../toolkit/fields'

/**
 * Input
 */

const Input = props => (
	<input
		id={props.id}
		name={props.name}
		type={props.type}
		value={props.value}
		className={props.className}
		onChange={props.onChange}
		onFocus={props.onFocus}
		onBlur={props.onBlur}
		pattern={props.pattern}
	/>
)

Input.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	className: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
}

Input.defaultProps = {
	type: 'text',
	value: '',
	className: '',
}


export default withInputHelpers(Input)
