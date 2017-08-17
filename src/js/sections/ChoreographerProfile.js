import React from 'react';
import PropTypes from 'prop-types';
import { compiler as markdownCompiler } from 'markdown-to-jsx';

import Avatar from '../components/Avatar';
import Squiggle from '../components/Squiggle';
import editJsx from '../utils/editJsx';
import { ScrollableChild } from '../UI/Scroll';


const ChoreographerProfile = (props) => {
	const bioBody = editJsx(
		markdownCompiler(props.bio),
		[
			{
				type: 'removeByTag',
				config: {
					tags: ['h1', 'h2', 'h3'],
				},
			},
		],
	);
	const expectationsBody = editJsx(
		markdownCompiler(props.expectations),
		[
			{
				type: 'replaceTag',
				config: {
					replacements: [{ from: 'p', to: 'h4' }],
				},
			},
		],
	);
	const quote = (props.quote) ? (
		<h3 className="profile__quote">
			“{props.quote.body}” —&nbsp;<span className="citation">{props.quote.citation}</span>
		</h3>
	) : null;

	return (
		<ScrollableChild slug={`profile-${props.slug}`} >
			<div className="profile">
				<div className="profile__top column column--wide">
					<div className="profile__title">
						<h2 className="profile__name">{props.title}</h2>
						<div className="profile__socials">
							tw fb ig
						</div>
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
							<Squiggle />
						</div>
						<div className="profile__bottom__content">
							<h4>Shimmy Pop</h4>
							<h4>Hipline Technique</h4>
							<h4>Power Pop</h4>
						</div>
					</div>
					<div className="profile__expectations">
						<div className="profile__bottom__title">
							<h2>Expectations</h2>
							<Squiggle />
						</div>
						<div className="profile__bottom__content">
							{expectationsBody}
						</div>
					</div>
					<div className="profile__playlist">
						<div className="profile__bottom__title">
							<h2>Playlist</h2>
							<Squiggle />
						</div>
						<div className="profile__bottom__content">
							<h4>Prince</h4>
							<h4>George Michael</h4>
							<h4>Shakira</h4>
							<h3>View Playlist</h3>
						</div>
					</div>
				</div>
			</div>
		</ScrollableChild>
	);
};

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
	cover: PropTypes.shape({
		sizes: PropTypes.string,
		srcset: PropTypes.arrayOf(PropTypes.object),
		meta: PropTypes.oneOfType([
			PropTypes.shape(),
			PropTypes.array,
		]),
	}).isRequired,
};

ChoreographerProfile.defaultProps = {
	bio: '',
	expectations: '',
	quote: '',
};

export default ChoreographerProfile;
