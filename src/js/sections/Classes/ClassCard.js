import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import R from 'ramda'

import ResponsiveImage from '../../components/ResponsiveImage'
import Avatar from '../../components/Avatar'
import Squiggle from '../../components/Squiggle'

import { makeParagraph } from '../../utils/text'
import { colors, mbolinks } from '../../constants'


/**
 * enhancer
 */

const mergeGroupedChoroegraphers = withProps((props) => {
	const choreographers = (props.isgroup === true)
		? R.pipe(
			R.pluck('choreographers'),
			R.flatten,
			R.uniq,
		)(props.grouped)
		: props.choreographers
	return { choreographers }
})

const enhanced = compose(mergeGroupedChoroegraphers)

/**
 * ClassCard
 */

class ClassCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			activeChoreographer: props.choreographers[0] || false
		}
	}

	changeActiveChoreographer = (id) => {
		this.setState({
			activeChoreographer: this.props.choreographers.find(c => c.id === id)
		})
	}

	renderChoreographers() {
		if (this.props.choreographers.length === 0) return null
		return (
			<div className="card__footer">
				<div className="card--class__choreographers">
					<h4>Choreographers</h4>
					<div className="card--class__avatarButtons">
						{this.props.choreographers.map(ch => (
							<button key={ch.id} onMouseEnter={() => this.changeActiveChoreographer(ch.id)}>
								<p>{ch.firstname}</p>
							</button>
						))}
					</div>
					<Avatar
						key={this.state.activeChoreographer.slug}
						image={this.state.activeChoreographer.cover}
						videoSrc={this.state.activeChoreographer.coverVideo}
						autoPlay
						ratio={1}
						classNames="avatar--round"
					/>
				</div>
				<p className="card__cta">
					<a className="cta cta--primary" href={mbolinks.schedule} rel="noopener noreferrer" target="_blank">Sign Up</a>
				</p>
			</div>
		)
	}

	render() {
		const num = this.props.index % 6
		const color = colors[this.props.index % colors.length]
		const cover = (this.props.cover) ? (
			<div className={`card__cover card__cover--${color}`}>
				<ResponsiveImage {...this.props.cover} />
			</div>
		) : null
		return (
			<div className="card card--class card--wide">
				<div className="card__header">
					<div className="card__title">
						<h3>{this.props.title}</h3>
					</div>
				</div>
				<Squiggle num={this.props.index % 6} color={color} />
				{cover}
				<div className="card__body">
					<div className="card__description">
						{makeParagraph(this.props.description)}
					</div>
				</div>
				{this.renderChoreographers()}
			</div>
		)
	}
}

ClassCard.propTypes = {
	choreographers: PropTypes.arrayOf(PropTypes.shape()),
	index: PropTypes.number.isRequired,
}

ClassCard.defaultProps = {
	choreographers: [],
}

export default enhanced(ClassCard)
