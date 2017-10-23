import React from 'react'
import PropTypes from 'prop-types'

import ResponsiveImage from '../../components/ResponsiveImage'
import Avatar from '../../components/Avatar'
import Squiggle from '../../components/Squiggle'

/**
 * ClassCard
 */

class ClassCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			// activeChoreographer: props.choreographers[0]
		}
	}

	changeActiveChoreographer = (id) => {
		this.setState({
			activeChoreographer: this.props.choreographers.find(c => c.id === id)
		})
	}

	render() {
		console.log(this.props.choreographers)
		return (
			<div className="card card--class">
				<div className="card__title">{this.props.title}</div>
				<Squiggle />
				<div className="card__cover">
					<ResponsiveImage {...this.props.cover} />
				</div>
				<div className="card__description">
					{this.props.description}
				</div>
				<div className="card--class__choreographers">
					<h3>Choreographers</h3>
					<div className="card__avatar">
						{/* <Avatar
							image={this.state.activeChoreographer.cover}
							videoSrc={this.state.activeChoreographer.coverVideo}
							ratio={0.85}
						/> */}
					</div>
					{/* {this.props.choreographers.map(ch => (
						// <button key={ch.id} onMouseEnter={() => this.changeActiveChoreographer(ch.id)}>{ch.firstname}</button>
					))} */}
				</div>
			</div>
		)
	}
}

ClassCard.propTypes = {
	choreographers: PropTypes.arrayOf(PropTypes.shape()),
}

ClassCard.defaultProps = {
	choreographers: [],
}

export default ClassCard
