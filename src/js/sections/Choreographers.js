import React from 'react'
import PropTypes from 'prop-types'

import { ScrollableContainer, ScrollableChild } from '../UI/Scroll'
import ChoreographerProfile from './ChoreographerProfile'
import ChoreographersMenu from './ChoreographersMenu'



/**
 * Choreographers
 */

/**
 * Choreographers
 */

const Choreographers = (props) => {
	if (!props.choreographers.length) return null
	return (
		<ScrollableContainer containerElement={document.body}>
			<section className="home">
				<div className="choreographers">
					{/* <ScrollTrigger slug="profilesMenu">
						<div className="sectionHeader">
							<h4>Meet the Choreographers <span className="icon icon--down" /></h4>
						</div>
					</ScrollTrigger> */}
					<ScrollableChild slug="profilesMenu">
						<ChoreographersMenu choreographers={props.choreographers} />
					</ScrollableChild>
					<div className="choreographers__main">
						{props.choreographers.map((c) => {
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
}

Choreographers.defaultProps = {
	choreographers: [],
}


export default Choreographers
