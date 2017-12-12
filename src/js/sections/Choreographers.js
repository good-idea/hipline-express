import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../components/Avatar'
import { ScrollableContainer, ScrollTrigger, ScrollableChild } from '../UI/Scroll'
import ChoreographerProfile from './ChoreographerProfile'

import Splash from './Splash'

// const Inspire = () => <img src="/images/inspire.png" alt="inspire" />
// const Empower = () => <img src="/images/inspire.png" alt="inspire" />

/**
 * Main Choreographer Component
 */


const Choreographers = ({ home, choreographers }) => {
	if (!choreographers.length) return null
	return (
		<ScrollableContainer containerElement={document.body}>
			<section className="home">
				<Splash text={home.intro} />
				<div className="choreographers">
					<ScrollTrigger slug="profilesMenu">
						<div className="sectionHeader">
							<h4>Meet the Choreographers <span className="icon icon--down" /></h4>
						</div>
					</ScrollTrigger>
					<ScrollableChild slug="profilesMenu">
						<div className="choreographers__menu column column--wide">
							{choreographers.map(c => (
								<div key={`choreographerThumb-${c.slug}`} className="choreographer__avatar">
									<ScrollTrigger slug={`profile-${c.slug}`}>
										<div className="choreographer__name">
											<h3>{c.firstname}</h3>
											<h4 className="choreographer__viewProfile">view profile</h4>
										</div>
										<Avatar
											image={c.cover}
											videoSrc={c.coverVideo}
											ratio={0.8}
										/>
									</ScrollTrigger>
								</div>
							))}
						</div>
					</ScrollableChild>
					<div className="choreographers__main">
						{choreographers.map((c) => {
							if (c.placeholder) return null
							return (
								<ChoreographerProfile
									key={`choreographerThumb-${c.slug}`}
									{...c}
								/>
							)
						})}
					</div>
				</div>
			</section>
		</ScrollableContainer>
	)
}

Choreographers.propTypes = {
	choreographers: PropTypes.arrayOf(PropTypes.shape(ChoreographerProfile.propTypes)),
	home: PropTypes.shape({
		intro: PropTypes.text,
	}),
}

Choreographers.defaultProps = {
	choreographers: [],
	home: {
		intro: '',
	},
}


export default Choreographers
