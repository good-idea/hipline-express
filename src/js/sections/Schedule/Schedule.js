import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import DanceClass from './DanceClass'
import { cn } from '../../utils/helpers'
import { groupByDay, isToday } from '../../utils/dates'

/**
 * Main Component
 */

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.buildSchedule = this.buildSchedule.bind(this)
    this.previousDay = this.previousDay.bind(this)
    this.nextDay = this.nextDay.bind(this)
    this.state = {}
  }

  componentWillMount() {
    if (!this.state.schedule) this.buildSchedule()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.schedule.length > 0 || nextProps.choreographers.length > 0) this.buildSchedule(nextProps)
  }

  buildSchedule(props = this.props) {
    const schedule = R.pipe(
      R.map(danceclass =>
        R.assoc('choreographer', props.choreographers.find(c => c.firstname === danceclass.teacher), danceclass),
      ),
      groupByDay,
    )(props.schedule)
    // Set the active day to the first one if it doesn't exist
    const activeDayIndex = this.state.activeDayIndex || 0
    this.setState({
      schedule,
      activeDayIndex,
    })
  }

  previousDay() {
    if (this.state.activeDayIndex > 0) {
      this.setState({
        activeDayIndex: (this.state.activeDayIndex -= 1),
      })
    }
  }

  nextDay() {
    if (this.state.activeDayIndex < this.state.schedule.length - 1) {
      this.setState({
        activeDayIndex: (this.state.activeDayIndex += 1),
      })
    }
  }

  render() {
    if (!this.state.schedule || this.state.schedule.length < 1) return null
    const classNames = ['schedule', 'column']
    const activeDay = this.state.schedule[this.state.activeDayIndex]

    if (this.state.activeDayIndex === 0) classNames.push('schedule__beginning')
    if (this.state.activeDayIndex === this.state.schedule.length - 1) classNames.push('schedule__end')
    if (isToday(activeDay.id)) classNames.push('schedule__today')

    return (
      <section className={cn(classNames)}>
        <div className="schedule__nav">
          <button className="schedule__previous" onClick={this.previousDay}>
            <h3>←</h3>
          </button>
          <h2>{activeDay.printDate}</h2>
          <button className="schedule__next" onClick={this.nextDay}>
            <h3>→</h3>
          </button>
        </div>
        {activeDay.items.map(c => (
          <DanceClass key={`class-${c.id}`} {...c} />
        ))}
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
