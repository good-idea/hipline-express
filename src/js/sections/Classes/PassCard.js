import React from 'react'
import PropTypes from 'prop-types'


const PassCard = (props) => {
	return (
		<div className="card">
			<h2 className="card__title">{props.title}</h2>
			<h1 className="card__header">{`$${props.pass.price}`}</h1>
			<div className="card__cover">
				<ResponsiveImage {...props.pass.icon} />
			</div>
			<p className="card__description">
				{props.pass.minidescription}
			</p>
			<h4 className="card__cta">
				<Link to={`/schedule/passes/${props.pass.slug}`} className="cta--primary">
					Buy
				</Link>
			</h4>
		</div>
	)
}

PassCard.propTypes = {
	// title: PropTypes.string
}

PassCard.defaultProps = {
	// title: 'My Title'
}


export default PassCard
