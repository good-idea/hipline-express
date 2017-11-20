import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../components/Avatar'

import { format, getPrintDate, duration, isFuture } from '../../utils/dates'

/**
 * UserClass
 */

class UserClass extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="userSchedule__class">
				<h4 className="userSchedule__class__date">
					{getPrintDate(this.props.StartDateTime)}
				</h4>
				<h4 className="userSchedule__class__time">
					{format(this.props.StartDateTime, 'h:mm a')}
				</h4>
				<h4 className="userSchedule__class__name">
					{this.props.Name}
				</h4>
				<h4 className="userSchedule__class__choreographer">
					{this.props.choreographer.firstname}
				</h4>
				<Avatar
					key={this.props.choreographer.slug}
					image={this.props.choreographer.cover}
					videoSrc={this.props.choreographer.coverVideo}
					ratio={1}
					classNames="userSchedule__class__avatar avatar--round"
				/>
			</div>
		)
	}
}

UserClass.propTypes = {
	// title: PropTypes.string
}

UserClass.defaultProps = {
	// title: 'My Title'
}

export default UserClass
