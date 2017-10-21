import React from 'react'
import PropTypes from 'prop-types'
import { pickHTMLProps } from 'pick-react-known-prop'
import R from 'ramda'

import { withInputHelpers } from '../toolkit/fields'

/**
 * Input
 */

const Input = props => <input {...pickHTMLProps(R.dissoc('form', props))} className={props.className} />

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
