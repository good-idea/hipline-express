import React from 'react'
import PropTypes from 'prop-types'
import Squiggle from '../components/Squiggle'
import { prepareIntroText } from '../utils/text'

/**
 * Splash
 */

class Splash extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.initialized = false
	}

	componentDidUpdate() {
		console.log(this.context.container)
		if (this.context.container && this.initialized === false) {
			this.context.container.addEventListener('scroll', this.handleScroll)
			this.initizlized = true
		}
	}

	componentWillUnmount() {
		this.context.container.removeEventListener('scroll', this.handleScroll)
	}

	registerRef = (element) => {
		this.element = element
	}

	handleScroll = () => {
		console.log(this.element, this.context.container)
		if (!this.element) return
		const percentage = Math.max(0, 1 - (this.context.container.scrollTop / window.outerHeight))
		const scale = (percentage * 0.5) + 0.5
		const rotateX = (1 - percentage) * 45
		const translateY = (1 - percentage) * -75
		const opacity = percentage
		console.log(this.context.container.scrollTop, percentage)
		this.setState({
			style: {
				transform: `scale(${scale}) rotateX(${rotateX}deg) translateY(${translateY}%)`,
				opacity,
			},
		})
	}

	render() {
		return (
			<div ref={this.registerRef} className="splash">
				<div className="splash__transform" style={this.state.style}>
					<div className="column column--narrow">
						{prepareIntroText(this.props.text)}
					</div>
					<div className="getinline">
						<h1>
							Get in line
						</h1>
						<Squiggle num={6} color="yellow" />
					</div>
				</div>
			</div>
		)
	}
}

Splash.contextTypes = {
	container: PropTypes.shape({}),
}
Splash.propTypes = {
	text: PropTypes.string.isRequired,
}

Splash.defaultProps = {
	// title: 'My Title'
}

export default Splash
