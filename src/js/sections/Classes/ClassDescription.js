import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Squiggle from '../../components/Squiggle'
import ResponsiveImage from '../../components/ResponsiveImage'

/**
 * Class Description
 */

const ClassDescription = (props) => {
	const { title, cover, description } = props
	return (
		<div className="card--class">
			<h2 className="card__title">{title}</h2>
			<Squiggle />
			<ResponsiveImage ratio={0.7} {...cover} />
			<p className="classType__description">{description}</p>
			<div className="classType__choreographers">
				<h4>CHOREOGRAPHERS</h4>
				<li>Heather</li>
				<li>Samar</li>
				<li>Debbie</li>
				<li>Grace</li>
				<li>Denise</li>
				<li>Paula</li>
			</div>
			<h4 className="card__cta">
				<Link href="/schedule" to="/schedule/" className="cta--primary">Sign Up</Link>
			</h4>
		</div>
	)
}

ClassDescription.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	cover: PropTypes.shape().isRequired
}

ClassDescription.defaultProps = {
	// title: 'My Title'
}


export default ClassDescription
