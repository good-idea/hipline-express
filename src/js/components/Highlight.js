import React from 'react'
import PropTypes from 'prop-types'

/**
 * Highlight
 */

const Highlight = ({ text }) => (
	<span className="highlight">
		<div className="highlight__inner">
			{text}
			<svg viewBox="0 0 100 20" preserveAspectRatio="none">
				<path d="M4.45,1S7,5.12,37,2,98.5,2,98.5,2L96.07,16.91a222.37,222.37,0,0,0-59.06,0C5,21.29,1.5,18.47,1.5,18.47Z" />
			</svg>
		</div>
	</span>
)

Highlight.propTypes = {
	text: PropTypes.string.isRequired,
}

export default Highlight
