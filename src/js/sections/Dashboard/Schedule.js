import React from 'react'
import PropTypes from 'prop-types'

/**
 * Schedule
 */

const Schedule = ({ classes }) => {
	console.log(classes)
	return (
		<div className="schedule">
			<h2>Schedule</h2>
		</div>
	)
}

Schedule.propTypes = {
	// title: PropTypes.string
}

Schedule.defaultProps = {
	// title: 'My Title'
}


export default Schedule
