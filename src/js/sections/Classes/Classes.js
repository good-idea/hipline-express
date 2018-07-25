import React from 'react'
import PropTypes from 'prop-types'

import { ScrollableContainer, ScrollableChild } from '../../UI/Scroll'
import PassSection from './PassSection'
import ClassSection from './ClassSection'
import Splash from '../Splash'

/**
 * Main Class section
 */

class Classes extends React.Component {
	renderPassSections() {
		// return this.passSections.map(s => <PassSection key={`passSection-${s.slug}`} {...s} />)
	}

	render() {
		if (!this.props.passes) return null
		console.log(this.props.passes)
		const visibleClasstypes = this.props.classtypes.filter(c => c.isVisible === true)
		return (
			<ScrollableContainer containerElement={document.body}>
				<div>
					<Splash text={this.props.splashText} />

					<section className="classes with-aside">
						{/* <aside className="aside-nav">
							<div className="aside-nav-item aside-nav-header" slug="classes-classTypes">
								<h4>Class Types</h4>
							</div>
							{visibleClasstypes.map(c => (
								<ScrollTrigger className="aside-nav-item" key={`trigger-classSection-${c.slug}`} slug={`classSection-${c.slug}`}>
									<h4>{c.title}</h4>
								</ScrollTrigger>
							))}
							<div className="aside-nav-item aside-nav-header" slug="classes-classTypes">
								<h4>Pricing</h4>
							</div>
							{this.props.passes.types.map(s => (
								<ScrollTrigger className="aside-nav-item" key={`trigger-passSection-${s.slug}`} slug={`passSection-${s.slug}`}>
									<h4>{s.title}</h4>
								</ScrollTrigger>
							))}
						</aside> */}
						<main>
							<div className="column--wide">
								<div>
									{visibleClasstypes.map(c => (
										<ScrollableChild key={`trigger-classSection-${c.slug}`} slug={`classSection-${c.slug}`}>
											<ClassSection {...c} />
										</ScrollableChild>
									))}
								</div>
								<div>
									<h2 className="info__title">Pricing and Packages</h2>

									{this.props.passes.types.map(p => (
										<ScrollableChild key={`trigger-passSection-${p.slug}`} slug={`passSection-${p.slug}`}>
											<PassSection {...p} />
										</ScrollableChild>
									))}
								</div>
							</div>
						</main>
					</section>
				</div>
			</ScrollableContainer>
		)
	}
}

Classes.propTypes = {
	passes: PropTypes.shape({
		types: PropTypes.arrayOf(PropTypes.shape({})),
	}),
	classtypes: PropTypes.arrayOf(PropTypes.shape),
	splashText: PropTypes.string,
}

Classes.defaultProps = {
	passes: {},
	classtypes: [],
	splashText: '',
}

export default Classes
