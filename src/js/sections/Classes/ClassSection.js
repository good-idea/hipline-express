import React from 'react'
import PropTypes from 'prop-types'
import { toClass } from 'recompose'
import ClassCard from './ClassCard'
/**
 * ClassSection
 */

const ClassSection = props => (
	<div className="info__section info__section--classtype">
		<div className="info__header column">
			<h1 className="info__title">{props.title}</h1>
			<h3 className="info__subtitle">{props.description}</h3>
		</div>
		<div className="cards">
			{props.children.filter(c => (c.isVisible === true && c.parsed === true))
				.map(c => <ClassCard key={c.slug} {...c} />)
			}
		</div>
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


export default toClass(ClassSection)
