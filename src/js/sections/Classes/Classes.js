import React from 'react'
import { Link } from 'react-router-dom'

import { ScrollableContainer, ScrollableChild, ScrollTrigger } from '../../UI/Scroll'
import PassCard from './PassCard'
import PassSection from './PassSection'
import ClassSection from './ClassSection'
import ClassDescription from './ClassDescription'
import Splash from '../Splash'

/**
 * Main Class section
 */

class Classes extends React.Component {
	constructor(props) {
		super(props)
	}

	renderPassSections() {
		// return this.passSections.map(s => <PassSection key={`passSection-${s.slug}`} {...s} />)
	}

	render() {
		if (!this.props.passes) return null
		const visibleClasstypes = this.props.classtypes.children.filter(c => c.isVisible === true)
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
								{visibleClasstypes.map(c => (
									<ScrollableChild key={`trigger-classSection-${c.slug}`} slug={`classSection-${c.slug}`}>
										<ClassSection {...c} />
									</ScrollableChild>
								))}
								{this.props.passes.types.map(p => (
									<ScrollableChild key={`trigger-passSection-${p.slug}`} slug={`passSection-${p.slug}`}>
										<PassSection {...p} />
									</ScrollableChild>
								))}
							</div>
						</main>
					</section>
				</div>
			</ScrollableContainer>
		)
	}
}

export default Classes
