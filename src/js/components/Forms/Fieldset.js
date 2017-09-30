import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

/**
 * Fieldset
 */

const Fieldset = (props) => {
	return (
		<fieldset>
			{ React.Children.map(props.children, (c) => {
				if (['FormField'].includes(c.type.displayName)) {
					return React.cloneElement(c, { ...R.dissoc('children', props) })
				}
				return React.cloneElement(c)
			})}

		</fieldset>
	)
}

Fieldset.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

Fieldset.defaultProps = {
	// title: 'My Title'
}


export default Fieldset
