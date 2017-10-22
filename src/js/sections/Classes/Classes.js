import React from 'react'
import { Link } from 'react-router-dom'

import { ScrollableContainer, ScrollableChild, ScrollTrigger } from '../../UI/Scroll'
import PassCard from './PassCard'
import PassSection from './PassSection'
import ClassSection from './ClassSection'
import ClassDescription from './ClassDescription'

/**
 * Main Class section
 */

class Classes extends React.Component {
	constructor(props) {
		super(props)
		console.log(props)

	}

	renderPassSections() {
		// return this.passSections.map(s => <PassSection key={`passSection-${s.slug}`} {...s} />)
	}

	render() {
		if (!this.props.passes) return null
		const visibleClasstypes = this.props.classtypes.children.filter(c => c.isVisible === true)

		// const classTypes = this.props.content.children.find(c => c.slug === 'types')
		return (
			<ScrollableContainer>
				<section className="classes">
					<div className="splash">
						<div className="column column--narrow">
							<h2>{this.props.classtypes.intro}</h2>
						</div>
					</div>
					<aside className="aside-nav">
						<div className="aside-nav-item aside-nav-header" slug="classes-classTypes">
							<h3>Class Types</h3>
						</div>
						{visibleClasstypes.map(c => (
							<ScrollTrigger className="aside-nav-item" key={`trigger-passSection-${c.slug}`} slug={`passSection-${c.slug}`}>
								<h3>{c.title}</h3>
							</ScrollTrigger>
						))}
						<div className="aside-nav-item aside-nav-header" slug="classes-classTypes">
							<h3>Pricing</h3>
						</div>
						{this.props.passes.types.map(s => (
							<ScrollTrigger className="aside-nav-item" key={`trigger-passSection-${s.slug}`} slug={`passSection-${s.slug}`}>
								<h3>{s.title}</h3>
							</ScrollTrigger>
						))}
					</aside>
					<div className="column with-aside column--wide">
						{visibleClasstypes.map(c => (
							<ScrollTrigger key={`trigger-passSection-${c.slug}`} slug={`passSection-${c.slug}`}>
								<ClassSection {...c} />
							</ScrollTrigger>
						))}
						{/* <ScrollableChild slug="classes-classTypes">
							<div className="info__section">
								<div className="cards">
									{this.props.classes.children.map(c => <ClassDescription key={`classType-${c.slug}`} classType={c} />)}
								</div>
							</div>
						</ScrollableChild> */}
						{/* {this.renderPassSections()} */}
					</div>
				</section>
			</ScrollableContainer>
		)
	}
}

export default Classes
