import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import ResponsiveImage from '../../components/ResponsiveImage'
import { cn, slugify } from '../../utils/helpers'
import { format, duration, isFuture } from '../../utils/dates'


/**
 * DanceClass
 */

class DanceClass extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const classNames = ['schedule__class']
		if (!isFuture(this.props.startTime)) classNames.push('schedule__class--past')
		classNames.push(`class-${slugify(this.props.title)}`)
		const avatar = (this.props.choreographer) ?
			<ResponsiveImage classNames="avatar" {...this.props.choreographer.cover} sizes={'100px'} /> :
			null
		const signUp = (isFuture(this.props.startTime)) ?
			(<button>Sign Up</button>) :
			null

		return (
			<div className={cn(classNames)}>
				<h2 className="schedule__class__title">
					{this.props.title}
				</h2>
				<div className="schedule__class__inner">
					<div className="schedule__class__teacher">
						{avatar}
						<h3>{this.props.teacher}</h3>
					</div>
					<div className="schedule__class__info">
						<h3>{format(this.props.startTime, 'h:mm a')}</h3>
						<h3>{duration(this.props.startTime, this.props.endTime)}</h3>
					</div>
					<div className="schedule__class__signup">
						{signUp}
					</div>
				</div>
			</div>
		)
	}
}

DanceClass.propTypes = {
	title: PropTypes.string.isRequired,
	teacher: PropTypes.string.isRequired,
}

DanceClass.defaultProps = {
	// title: 'Shimmy'
}

export default DanceClass
