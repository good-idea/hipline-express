import React from 'react'
import PropTypes from 'prop-types'

/**
 * AcceptStep
 */

class AcceptStep extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				AcceptStep Component
			</div>
		)
	}
}

AcceptStep.propTypes = {
	// title: PropTypes.string
}

AcceptStep.defaultProps = {
	// title: 'My Title'
}

export default AcceptStep
