import React from 'react'
import PropTypes from 'prop-types'

import { makeParagraph } from '../utils/text'

const Card = ({ title, headline, body, cta, size }) => {
	const description = makeParagraph(body)

	return (
		<div className={`card card--pass ${size === 'large' ? 'card--large' : ''}`}>
			<div className="card__header">
				<h4 className="card__title">{title}</h4>
			</div>
			<h4 className="card__subheader">{headline}</h4>
			<div className="card__body">
				<div className="card__description">{description.props || description.length ? description : '\u00a0'}</div>
			</div>
			{cta && (
				<div className="card__footer">
					<h4 className="card__cta">
						<a target="_blank" rel="noopener noreferrer" href={cta.action} className={`cta cta--${cta.type || 'primary'}`}>
							{cta.label}
						</a>
					</h4>
				</div>
			)}
		</div>
	)
}

Card.propTypes = {
	title: PropTypes.string.isRequired,
	headline: PropTypes.string,
	body: PropTypes.string,
	size: PropTypes.oneOf(['large', 'normal']),
	cta: PropTypes.shape({
		label: PropTypes.string,
		action: PropTypes.string,
		type: PropTypes.oneOf(['primary', 'secondary']),
	}),
}

Card.defaultProps = {
	headline: '',
	body: '',
	cta: null,
	size: 'normal',
}

export default Card
