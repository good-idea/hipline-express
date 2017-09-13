import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import ResponsiveImage from '../components/ResponsiveImage'
import { cn, slugify } from '../utils/helpers'
import { groupByDay, isToday, format, duration } from '../utils/dates'

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
		classNames.push(`class-${slugify(this.props.title)}`)
		const avatar = (this.props.choreographer) ?
			<ResponsiveImage classNames="avatar" {...this.props.choreographer.cover} sizes={'100px'} /> :
			null
		return (
			<div className={cn(classNames)}>
				<h2 className="class__title">
					{this.props.title}
				</h2>
				<div className="class__teacher">
					{avatar}
					<h3>{this.props.teacher}</h3>
				</div>
				<div className="class__info">
					<h3>{format(this.props.startTime, 'h:mm a')}</h3>
					<h3>{duration(this.props.startTime, this.props.endTime)}</h3>
				</div>
				<div className="class__signup">
					<button>Sign Up</button>
				</div>
			</div>
		)
	}
}

DanceClass.propTypes = {
	title: PropTypes.string.isRequired,
}

DanceClass.defaultProps = {
	// title: 'Shimmy'
}

/**
 * Day
 */

const Day = (props) => {
	const classNames = ['schedule__day', 'column']
	if (isToday(props.date)) classNames.push('schedule__day--today')
	return (
		<div className={cn(classNames)}>
			{props.classes.map(c => <DanceClass key={`class-${c.id}`} {...c} />)}
		</div>
	)
}

Day.propTypes = {
	classes: PropTypes.arrayOf(
		PropTypes.shape(DanceClass.propTypes),
	),
}

Day.defaultProps = {
	classes: [],
}


/**
 * Main Component
 */


class Schedule extends React.Component {
	constructor(props) {
		super(props)
		this.buildSchedule = this.buildSchedule.bind(this)
		this.state = {}
	}

	componentWillMount() {
		this.buildSchedule()
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.schedule.count > 0 || nextProps.choreographers.count > 0) this.buildSchedule(nextProps)
	}

	buildSchedule(props = this.props) {
		const schedule = R.pipe(
			R.map(danceclass => (
				R.assoc(
					'choreographer',
					props.choreographers.find(c => c.firstname === danceclass.teacher),
					danceclass,
				)
			)),
			groupByDay,
		)(props.schedule)

		this.setState({ schedule })
	}

	render() {
		if (!this.props.schedule || !this.props.choreographers) return null
		// console.log(this.props)
		return (
			<section className="schedule column--wide">
				{Object.keys(this.state.schedule).map(key => <Day key={`day-${key}`} date={key} classes={this.state.schedule[key]} />)}
			</section>
		)
	}
}

Schedule.propTypes = {
	schedule: PropTypes.arrayOf(PropTypes.shape),
	choreographers: PropTypes.arrayOf(PropTypes.shape),
	// title: PropTypes.string
}

Schedule.defaultProps = {
	schedule: [],
	choreographers: [],
	// title: 'My Title'
}

export default Schedule
