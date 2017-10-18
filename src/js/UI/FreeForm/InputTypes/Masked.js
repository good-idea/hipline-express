import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import R from 'ramda'
import { pickHTMLProps } from 'pick-react-known-prop'

import { withInputHelpers } from '../toolkit/fields'

/**
 * Masked
 */

const Masked = props => (
	<MaskedInput
		{...pickHTMLProps(R.dissoc('form', props))}
		mask={props.mask}
		placeholderChar=" "
		guide={props.guide}
		// keepCharPositions={this.props.keepCharPositions}
	/>
)


Masked.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	className: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
}

Masked.defaultProps = {
	type: 'text',
	value: '',
	className: '',
}


export default withInputHelpers(Masked)
