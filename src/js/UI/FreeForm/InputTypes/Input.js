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
		onChange={props.onChange}
		className={props.className}
	/>
)

Input.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
}

Input.defaultProps = {
	type: 'text',
	value: '',
	className: '',
}


export default withInputHelpers(Input)
