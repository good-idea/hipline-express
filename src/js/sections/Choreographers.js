import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../components/Avatar';
import { ScrollableContainer, ScrollTrigger } from '../UI/Scroll';
import ChoreographerProfile from './ChoreographerProfile';


/**
 * Main Choreographer Component
 */


const Choreographers = ({ choreographers }) => {
	if (!choreographers.length) return null;
	return (
		<ScrollableContainer>
			<section className="choreographers">
				<div className="choreographers__menu column column--medium">
					{choreographers.map(c => (
						<div key={`choreographerThumb-${c.slug}`} className="choreographer__avatar">
							<ScrollTrigger slug={`profile-${c.slug}`}>
								<h2 className="choreographer__name">{c.firstname}</h2>
								<Avatar
									image={c.cover}
									videoSrc={c.coverVideo}
									ratio={0.85}
								/>
							</ScrollTrigger>
						</div>
					))}
				</div>
				<div className="choreographers__main">
					{choreographers.map((c) => {
						if (c.placeholder) return null;
						return (
							<ChoreographerProfile
								key={`choreographerThumb-${c.slug}`}
								{...c}
							/>
						);
					})}
				</div>
			</section>
		</ScrollableContainer>
	);
};

Choreographers.propTypes = {
	choreographers: PropTypes.arrayOf(
		PropTypes.shape(ChoreographerProfile.propTypes),
	),
};

Choreographers.defaultProps = {
	choreographers: [],
};


export default Choreographers;
