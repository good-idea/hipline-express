import React from 'react'
import PropTypes from 'prop-types'

import ClassCard from './ClassCard'
/**
 * ClassSection
 */

const ClassSection = props => (
	<div className="info__section info__section--classtype">
		<div className="info__header">
			<h2>{props.title}</h2>
			<h3>{props.description}</h3>
		</div>
		{props.children.filter(c => c.isVisible === true)
			.map(c => <ClassCard key={c.slug} {...c} />)
		}
	</div>
)


ClassSection.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	children: PropTypes.arrayOf(PropTypes.shape()),
}

ClassSection.defaultProps = {
	description: '',
	children: [],
	// title: 'My Title'
}


export default ClassSection
