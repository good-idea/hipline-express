import React from 'react';
import ResponsiveImage from '../components/ResponsiveImage';
import Markdown, { compiler as markdownCompiler } from 'markdown-to-jsx';

import editJsx from '../utils/editJsx';

/**
 * Choreographer Thumbnail
 */

const ChoreographerThumbnail = ({ choreographer }) => {
	if (choreographer.placeholder) return <div className="choreographer__thumbnail placeholder" />;
	return (
		<div className="choreographer__thumbnail">
			<div className="choreographer__padding" />
			<h2 className="choreographer__name">{choreographer.title}</h2>
			<ResponsiveImage {...choreographer.cover} sizes="25vw" />
		</div>
	);
};

/**
 * Choreographer Profile
 */

const ChoreographerProfile = ({ choreographer }) => {
	const bioBody = editJsx(
		markdownCompiler(choreographer.bio),
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
		markdownCompiler(choreographer.expectations),
		[
			{
				type: 'replaceTag',
				config: {
					replacements: [{ from: 'p', to: 'h4' }],
				},
			},
		],
	);
	return (
		<div className="profile">
			<div className="profile__top column column--wide">
				<div className="profile__title flex-column flex-center">
					<h2 className="profile__name">{choreographer.title}</h2>
					<div className="profile__socials">
						tw fb ig
					</div>
				</div>
				<div className="profile__photo">
					<ResponsiveImage {...choreographer.cover} sizes="25vw" />
				</div>
				<div className="profile__bio">
					<h3 className="profile__quote">
						{choreographer.quote[0].body} —&nbsp;<span className="citation">{choreographer.quote[0].citation}</span>
					</h3>
					<div className="profile__bio__body">
						{bioBody}
					</div>
				</div>
			</div>
			<div className="profile__bottom column column--wide">
				<div className="profile__classes">
					<div className="profile__bottom__title">
						<h2>Classes</h2>
						<div className="squiggle">squiggle</div>
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
						<div className="squiggle">squiggle</div>
					</div>
					<div className="profile__bottom__content">
						{expectationsBody}
					</div>
				</div>
				<div className="profile__playlist">
					<div className="profile__bottom__title">
						<h2>Playlist</h2>
						<div className="squiggle">squiggle</div>
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
	);
};


/**
 * Main Choreographer Component
 */

const Choreographers = (props) => {
	function makeChoreographerPlaceholders() {
		const arr = [];
		for (let i = 0; i < 12; i += 1) arr.push({ placeholder: true, uid: i });
		return arr;
	}
	const choreographers = props.choreographers || makeChoreographerPlaceholders();
	return (
		<section className="choreographers">
			<div className="choreographers__menu column column--wide">
				{choreographers.map(c => (
					<ChoreographerThumbnail key={`choreographerThumb-${c.uid}`} choreographer={c} />
				))}
			</div>
			<div className="choreographers__main">
				{choreographers.map((c) => {
					if (c.placeholder !== true) return <ChoreographerProfile key={`choreographerThumb-${c.uid}`} choreographer={c} />;
					return null;
				})}

			</div>
		</section>
	);
};


export default Choreographers;
