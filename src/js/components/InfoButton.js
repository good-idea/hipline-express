import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const InfoButton = props => {
	if (/^https?:\/\//.test(props.action)) {
		return (
			<h4 className="info__section__cta">
				<a className="cta cta--primary" target="_blank" href={props.action}>
					{props.label}
				</a>
			</h4>
		)
	}
	return (
		<h4 className="info__section__cta">
			<Link className="cta cta--primary" href={props.action} to={props.action}>
				{props.label}
			</Link>
		</h4>
	)
}

InfoButton.propTypes = {
	action: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
}

export default InfoButton
