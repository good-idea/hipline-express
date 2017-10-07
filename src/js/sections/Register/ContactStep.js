import React from 'react'
import PropTypes from 'prop-types'

/**
 * ContactStep
 */

class ContactStep extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				ContactStep Component
			</div>
		)
	}
}

ContactStep.propTypes = {
	// title: PropTypes.string
}

ContactStep.defaultProps = {
	// title: 'My Title'
}

export default ContactStep
