import React from 'react'
import PropTypes from 'prop-types'

import { withInputHelpers } from '../toolkit/fields'

/**
 * Option
 */

const Option = ({ value, label, disabled }) => <option value={value} disabled={disabled} label={label || value}>{label || value}</option>

Option.propTypes = {
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	disabled: PropTypes.bool,
}

Option.defaultProps = {
	label: undefined,
	disabled: false
}


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
		required={props.required}
	>
		{ (!props.initialValue && props.showEmpty)
			? <option disabled value={null}>{props.emptyText || ''}</option>
			: null
		}
		{ (props.options)
			? props.options.map(o => <Option key={o.value} selected={props.initialValue === o.value} {...o} />)
			: React.Children.map(props.children, c => React.cloneElement(c, {}))
		}
	</select>
)

Select.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	initialValue: PropTypes.string,
	showEmpty: PropTypes.bool,
	required: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	emptyText: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]),
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string,
		}),
	),
	className: PropTypes.string,
}

Select.defaultProps = {
	emptyText: '',
	value: '',
	className: '',
	options: false,
	required: false,
	showEmpty: true,
	initialValue: null,
	children: [],
}

export default withInputHelpers(Select)
