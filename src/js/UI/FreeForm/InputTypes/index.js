import React from 'react'
import PropTypes from 'prop-types'

import Input from './Input'
import Select from './Select'
import Checkbox from './Checkbox'

const Field = (props) => {
	switch (props.type) {
	case 'select':
		return <Select {...props} />
	case 'checkbox':
		return <Checkbox {...props} />
	default:
		return <Input {...props} />
	}
}

Field.propTypes = {
	type: PropTypes.string,
}

Field.defaultProps = {
	type: 'text',
}

module.exports = { Field, Input, Select, Checkbox }
