import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ResponsiveImage from '../../components/ResponsiveImage'
import { makeParagraph } from '../../utils/text'


const PassCard = (props) => {
	console.log(props)
	return (
		<div className="card card--pass">
			<div className="card__header">
				<h3 className="card__title">{props.title}</h3>
				<h1 className="card__title">{`$${props.price}`}</h1>
			</div>
			<div className="card__cover">
				<ResponsiveImage {...props.icon} />
			</div>
			<div className="card__body">
				<div className="card__description">
					{makeParagraph(props.minidescription)}
				</div>
			</div>
			<div className="card__footer">
				<h4>
					<Link to={`/schedule/passes/${props.slug}`} className="cta--primary card__cta">
						Buy
					</Link>
				</h4>
			</div>
		</div>
	)
}

PassCard.propTypes = {
	title: PropTypes.string.isRequired,
	minidescription: PropTypes.string,
	price: PropTypes.number.isRequired,
}

PassCard.defaultProps = {
	minidescription: ''
}


export default PassCard
