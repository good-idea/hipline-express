import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../components/Icon'

/**
 * Footer
 */

const Footer = ({ footertext, contact, footersocial }) => (
	<footer>
		<div className="column">
			<img className="footer__logo" src="/images/loveclub-pink.png" alt="Hipline Oakland" />
			<h4 className="footer__text">{footertext}</h4>
			<h5 className="footer__address">
				<a href="https://goo.gl/maps/6RvpRVaocd82" target="_blank">{contact[0].address}</a> | <a href={`tel:${contact[0].phone}`}>{contact[0].phone}</a>
			</h5>
			<div className="footer__social">
				<a className="footer__social-icon" href={footersocial[0].facebook} target="_blank">
					<Icon glyph="facebook" />
				</a>
				<a className="footer__social-icon" href={footersocial[0].instagram} target="_blank">
					<Icon glyph="instagram" />
				</a>
				<a className="footer__social-icon" href={`mailto:${contact[0].email}`}>
					<Icon glyph="mail" />
				</a>
			</div>
		</div>
	</footer>
)


Footer.propTypes = {
	footertext: PropTypes.string,
	footersocial: PropTypes.arrayOf([PropTypes.shape({})]),
	contact: PropTypes.arrayOf([PropTypes.shape({})]),
}

Footer.defaultProps = {
	footertext: '',
	footersocial: [{
		facebook: 'https://www.facebook.com/Hipline-95817591993/',
		instagram: 'https://www.instagram.com/hiplineoakland/',
	}],
	contact: [{
		address: '',
		phone: '',
		email: '',
	}],
}


export default Footer
