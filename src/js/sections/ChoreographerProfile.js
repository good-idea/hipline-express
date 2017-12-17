import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Avatar from '../components/Avatar'
import Squiggle from '../components/Squiggle'
import Icon from '../components/Icon'
import { ScrollableChild } from '../UI/Scroll'
import { markdownToJSX } from '../utils/text'


/**
 * ChoreographerSocial
 */

const ChoreographerSocial = ({ accounts }) => {
	if (accounts === '') return null
	console.log(accounts)

	const { facebook, instagram, twitter } = accounts[0]
	return (
		<div className="profile__socials">
			{facebook !== '' ? (
				<div className="profile__social">
					<a href={facebook} target="_blank">
						<Icon glyph="facebook" />
					</a>
				</div>
			) : null }

			{instagram !== '' ? (
				<div className="profile__social">
					<a href={`https://www.instagram.com/${instagram}`} target="_blank">
						<Icon glyph="instagram" />
					</a>
				</div>
			) : null }

			{twitter !== '' ? (
				<div className="profile__social">
					<a href={twitter} target="_blank">
						<Icon glyph="twitter" />
					</a>
				</div>
			) : null }
		</div>
	)
}

ChoreographerSocial.propTypes = {
	// title: PropTypes.string
}

ChoreographerSocial.defaultProps = {
	// title: 'My Title'
}


const ChoreographerProfile = (props) => {
	const bioBody = markdownToJSX(props.bio)

	const expectationsBody = markdownToJSX(props.expectations)

	const quote = (props.quote.body) ? (
		<h3 className="profile__quote">
			“{props.quote.body}” —&nbsp;<span className="citation">{props.quote.citation}</span>
		</h3>
	) : null

	const musicians = (props.musicians.length) ? props.musicians.split(',') : []
	const classtypes = (props.classtypes.length) ? props.classtypes.split(',') : []

	return (
		<ScrollableChild slug={`profile-${props.slug}`} >
			<div className="profile">
				<div className="profile__top column column--wide">
					<div className="profile__title">
						<h2 className="profile__name">{props.title}</h2>
						<ChoreographerSocial accounts={props.social} />
					</div>
					<div className="profile__photo">
						<Avatar
							autoPlay={true}
							image={props.cover}
							videoSrc={props.coverVideo}
							ratio={0.85}
						/>
					</div>
					<div className="profile__bio">
						{quote}
						<div className="profile__bio__body">
							{bioBody}
						</div>
					</div>
				</div>
				<div className="profile__bottom column column--wide">
					<div className="profile__classes">
						<div className="profile__bottom__title">
							<h2>Classes</h2>
							<Squiggle num={0} />
						</div>
						<div className="profile__bottom__content">
							{classtypes.map(classType => (
								<h4 key={classType}>{classType}</h4>
							))}
							<h4 className="cta">
								<Link	to="/schedule">View Schedule</Link>
							</h4>
						</div>
					</div>
					<div className="profile__expectations">
						<div className="profile__bottom__title">
							<h2>Expectations</h2>
							<Squiggle num={1} />
						</div>
						<div className="profile__bottom__content">
							{expectationsBody}
						</div>
					</div>
					<div className="profile__playlist">
						<div className="profile__bottom__title">
							<h2>Playlist</h2>
							<Squiggle num={3} />
						</div>
						<div className="profile__bottom__content">
							{musicians.map(artist => (
								<h4 key={artist}>{artist}</h4>
							))}
							{(props.spotify_playlist) ? (
								<h3 className="cta">
									<a href={props.spotify_playlist}>View Playlist</a>
								</h3>
							) : null }
						</div>
					</div>
				</div>
			</div>
		</ScrollableChild>
	)
}

ChoreographerProfile.propTypes = {
	bio: PropTypes.string,
	expectations: PropTypes.string,
	quote: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			body: PropTypes.string,
			citation: PropTypes.string,
		}),
	]),
	classtypes: PropTypes.string,
	cover: PropTypes.shape({
		sizes: PropTypes.string,
		srcset: PropTypes.arrayOf(PropTypes.object),
		meta: PropTypes.oneOfType([
			PropTypes.shape(),
			PropTypes.array,
		]),
	}).isRequired,
	social: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.shape({
			facebook: PropTypes.string,
			instagram: PropTypes.string,
			twitter: PropTypes.string,
		})),
	]),
	musicians: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
	]),
	spotify_playlist: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
	]),
}

ChoreographerProfile.defaultProps = {
	bio: '',
	expectations: '',
	quote: '',
	social: '',
	musicians: false,
	spotify_playlist: false,
	classtypes: '',
}

export default ChoreographerProfile
