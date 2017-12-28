import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ResponsiveImage from '../../components/ResponsiveImage'
import { makeParagraph } from '../../utils/text'

import { mbolinks } from '../../constants'

const PassCard = props => {
	const body = props.description.length ? (
		<div className="card__body">
			<div className="card__description">
				{makeParagraph(props.description)}
			</div>
		</div>
	) : null

	const link = props.mbolink.length ? props.mbolink : mbolinks.passes

	const footer =
		props.buybutton !== 'false' ? (
			<div className="card__footer">
				<h4 className="card__cta">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={link}
						className="cta"
					>
						Buy
					</a>
				</h4>
			</div>
		) : null

	return (
		<div className="card card--pass">
			<div className="card__header">
				<h3 className="card__title">{props.title}</h3>
			</div>
			<h2 className="card__title">{props.price}</h2>
			{body}
			{footer}
		</div>
	)
}

PassCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	buybutton: PropTypes.string,
	mbolink: PropTypes.string,
	price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

PassCard.defaultProps = {
	buybutton: 'true',
	description: '',
	mbolink: '',
}

export default PassCard
