import React from 'react'
import PropTypes from 'prop-types'

import { ScrollableContainer, ScrollableChild } from '../UI/Scroll'
import ChoreographerProfile from './ChoreographerProfile'
import ChoreographersMenu from './ChoreographersMenu'
import Splash from './Splash'

/**
 * Choreographers
 */

const Choreographers = props => {
	if (!props.choreographers.length) return null
	return (
		<ScrollableContainer containerElement={document.body}>
			<div>
				{props.intro && props.intro.length && <Splash text={props.intro} full={false} />}
				<section className="home">
					<main className="choreographers">
						{/* <ScrollTrigger slug="profilesMenu">
						<div className="sectionHeader">
							<h4>Meet the Choreographers <span className="icon icon--down" /></h4>
						</div>
					</ScrollTrigger> */}
						{props.header && props.header.length && <h3 className="choreographers__header">{props.header}</h3>}
						<ScrollableChild slug="profilesMenu">
							<ChoreographersMenu choreographers={props.choreographers} />
						</ScrollableChild>
						<div className="choreographers__main">
							{props.choreographers.map((c, index) => {
								if (c.placeholder) return null
								return <ChoreographerProfile key={`choreographerThumb-${c.slug}`} index={index} {...c} />
							})}
						</div>
					</main>
				</section>
			</div>
		</ScrollableContainer>
	)
}

Choreographers.propTypes = {
	choreographers: PropTypes.arrayOf(PropTypes.shape({})),
	intro: PropTypes.string,
	header: PropTypes.string,
}

Choreographers.defaultProps = {
	choreographers: [],
	intro: '',
	header: '',
}

export default Choreographers
