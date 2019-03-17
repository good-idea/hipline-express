import React from 'react'
import PropTypes from 'prop-types'
import Squiggle from '../components/Squiggle'

import Avatar from '../components/Avatar'
import { ScrollTrigger } from '../UI/Scroll'

/**
 * ChoreographersMenu
 */

class ChoreographersMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			style: {},
		}
		this.initialized = false
	}

	componentDidUpdate() {
		if (this.initialized === false) {
			this.initialized = true
		}
	}

	render() {
		return (
			<div
				ref={element => {
					this.container = element
				}}
				className="choreographers__menu__wrapper"
			>
				<div className="column column--wide">
					<div className="getinline">
						<h1>Get in line</h1>
						<Squiggle num={6} color="yellow" />
					</div>
					<div className="choreographers__menu">
						{this.props.choreographers.map(c => (
							<div key={`choreographerThumb-${c.slug}`} className="choreographer__avatar">
								<ScrollTrigger slug={`profile-${c.slug}`}>
									<div className="choreographer__name">
										<h3>{c.firstname}</h3>
									</div>
									<Avatar choreographer={c} ratio={0.8} />
								</ScrollTrigger>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}

ChoreographersMenu.propTypes = {
	choreographers: PropTypes.arrayOf(PropTypes.shape({})),
}

ChoreographersMenu.defaultProps = {
	choreographers: [],
}
export default ChoreographersMenu
