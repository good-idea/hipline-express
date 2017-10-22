import React from 'react'
import PropTypes from 'prop-types'

import { ScrollableChild } from '../../UI/Scroll'

/**
 * PassSection
 */

const PassSection = (props) => {
	return (
		<ScrollableChild slug={`passSection-${props.slug}`}>
			<div className="info__section">
				<div className="info__header column column--narrow">
					<h2 className="info__title">{props.title}</h2>
					<p className="info__description">{props.description}</p>
				</div>
				<div className="cards">
					{props.passes.map(p => <PassCard key={`passSection-passCard-${p.pass.slug}`} {...p} />)}
				</div>
			</div>
		</ScrollableChild>
	)
}
PassSection.propTypes = {
	// title: PropTypes.string
}

PassSection.defaultProps = {
	// title: 'My Title'
}


export default PassSection
