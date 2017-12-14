import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../components/Avatar'
import { ScrollableContainer, ScrollTrigger, ScrollableChild } from '../UI/Scroll'
import ChoreographerProfile from './ChoreographerProfile'
import Squiggle from '../components/Squiggle'

/**
 * Choreographers
 */

class Choreographers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			style: {},
		}
		this.initialized = false
	}

	componentDidUpdate() {
		if (this.initialized === false) {
			document.body.addEventListener('scroll', this.handleScroll)
			this.initialized = true
		}
	}

	componentWillUnmount() {
		document.body.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll = () => {

		// This is unnecessary and I think it is uncool
		const percentage = Math.max(0, 1 - (document.body.scrollTop / window.outerHeight))
		console.log(percentage)
		// const scale = (percentage * 0.5) + 0.5
		// const rotateX = (1 - percentage) * 45
		// const translateY = (1 - percentage) * -75
		const opacity = percentage
		this.setState({
			style: {
				// transform: `scale(${scale}) rotateX(${rotateX}deg) translateY(${translateY}%)`,
				opacity,
			},
		})
	}

	render() {
		if (!this.props.choreographers.length) return null
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
							<div className="choreographers__menu__wrapper" style={this.state.style}>
								<div className="column column--wide">									
									<div className="getinline">
										<h1>
											Get in line
										</h1>
										<Squiggle num={6} color="yellow" />
									</div>
									<div className="choreographers__menu">
										{this.props.choreographers.map(c => (
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
								</div>
							</div>
						</ScrollableChild>
						<div className="choreographers__main">
							{this.props.choreographers.map((c) => {
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
