import React from 'react'
import PropTypes from 'prop-types'

import UserClass from './UserClass'

/**
 *UserSchedule
 */

const UserSchedule = ({ classes }) => {
	if (!classes) return null
	return (
		<div className="column column--left userSchedule info__section">
			<h2>Upcoming Classes</h2>
			<div className="userSchedule__classes">
				{classes.map(c => <UserClass key={c.ID} {...c} />)}
			</div>
		</div>
	)
}

UserSchedule.propTypes = {
	// title: PropTypes.string
}

UserSchedule.defaultProps = {
	// title: 'My Title'
}


export default UserSchedule
