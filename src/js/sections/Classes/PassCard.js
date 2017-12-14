import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ResponsiveImage from '../../components/ResponsiveImage'
import { makeParagraph } from '../../utils/text'

import { mbolinks } from '../../constants'


const PassCard = (props) => {
	return (
		<div className="card card--pass">
			<div className="card__header">
				<h3 className="card__title">{props.title}</h3>
			</div>
			<h2 className="card__title">{`$${props.price}`}</h2>
			{/* <div className="card__cover">
				<ResponsiveImage {...props.icon} />
			</div> */}
			<div className="card__body">
				<div className="card__description">
					{makeParagraph(props.minidescription)}
				</div>
			</div>
			<div className="card__footer">
				<h4 className="card__cta">
					<a target="_blank" rel="noopener noreferrer" href={mbolinks.passLinkById(props.mboprogramid)} className="cta--primary">
						Buy
					</a>
				</h4>
			</div>
		</div>
	)
}

PassCard.propTypes = {
	title: PropTypes.string.isRequired,
	minidescription: PropTypes.string,
	price: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]).isRequired,
}

PassCard.defaultProps = {
	minidescription: ''
}


export default PassCard
