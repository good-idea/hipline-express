import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { unique } from 'shorthash'
import { Link } from 'react-router-dom'

/**
 * Announcement
 */

class Announcement extends React.Component {
	componentDidMount = () => {
		const id = unique(this.props.text)
		const hasClosed = Cookies.get(id) === 'true'
		if (hasClosed) return
		setTimeout(() => {
			this.props.showAnnouncement()
		}, 4500)
	}

	handleClose = () => {
		const id = unique(this.props.text)
		Cookies.set(id, 'true', { expires: 7 })
		this.props.hideAnnouncement()
	}

	render() {
		if (this.props.text.length === 0) return null

		if (this.props.link.length === 0) {
			return (
				<header className="announcement">
					<button onClick={this.handleClose}>
						<h4>{this.props.text}</h4>
					</button>
					<button className="ex" onClick={this.handleClose} />
				</header>
			)
		}

		const link = /https?:\/\//.test(this.props.link) ? (
			<a href={this.props.link} target="_blank" onClick={this.handleClose}>
				<h4>{this.props.text}</h4>
			</a>
		) : (
			<Link href={this.props.link} to={this.props.link} onClick={this.handleClose}>
				<h4>{this.props.text}</h4>
			</Link>
		)

		return (
			<header className="announcement">
				<div className="announcement__body">{link}</div>
				<button className="ex" onClick={this.handleClose} />
			</header>
		)
	}
}

Announcement.propTypes = {
	text: PropTypes.string,
	link: PropTypes.string,
	showAnnouncement: PropTypes.func.isRequired,
	hideAnnouncement: PropTypes.func.isRequired,
}

Announcement.defaultProps = {
	text: '',
	link: '',
}

export default Announcement
