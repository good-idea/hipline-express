import React from 'react'
import PropTypes from 'prop-types'

import ResponsiveImage from '../../components/ResponsiveImage'
import Squiggle from '../../components/Squiggle'

/**
 * ClassCard
 */

const ClassCard = (props) => {
	return (
		<div className="card card--class">
			<div className="card__title">{props.title}</div>
			<Squiggle />
			<div className="card__cover">
				<ResponsiveImage {...props.cover} />
			</div>
			<div className="card__description">
				{props.description}
			</div>
			<div className="card--class__choreographers">
				<h3>Choreographers</h3>
			</div>
		</div>
	)
}

ClassCard.propTypes = {
	// title: PropTypes.string
}

ClassCard.defaultProps = {
	// title: 'My Title'
}


export default ClassCard
