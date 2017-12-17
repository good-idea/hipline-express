import React from 'react'
import PropTypes from 'prop-types'
import { toClass } from 'recompose'
import ClassCard from './ClassCard'
import Highlight from '../../components/Highlight'

/**
 * ClassSection
 */

const ClassSection = props => (
	<div className="info__section info__section--classtype">
		<div className="info__header column">
			<h2 className="info__title">
				<Highlight text={props.title} />
			</h2>
			<p className="info__subtitle">{props.description}</p>
		</div>
		<div className="cards">
			{props.children.filter(c => (c.isVisible === true))
				.map((c, i) => <ClassCard key={c.slug} index={i} {...c} />)
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
