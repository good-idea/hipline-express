import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ResponsiveImage from '../components/ResponsiveImage'
import { ScrollableContainer, ScrollableChild, ScrollTrigger } from '../UI/Scroll'
import { slugify } from '../utils/helpers'
import { markdownToJSX } from '../utils/text'

/**
 * Sub-components
 */

class InfoNavItem extends React.Component {
	constructor(props) {
		super(props)
		console.log('!')
	}

	render() {
		return (
			<div className="subnav__item">
				<ScrollTrigger slug={`info-${this.props.slug}`}>
					<button>
						<h3>{this.props.title}</h3>
					</button>
				</ScrollTrigger>
			</div>
		)
	}
}

const InfoBlock = (props) => {
	return (
		<div className="info__block">
			<h2>{props.header}</h2>
			<p>{markdownToJSX(props.body)}</p>
		</div>
	)
}

const InfoButton = (props) => {
	if ((/^https?:\/\//).test(props.action)) {
		return (
			<h4>
				<a className="cta" target="_blank" href={props.action}>{props.label}</a>
			</h4>
		)
	}
	return (
		<h4>
			<Link className="cta" to={props.action}>{props.label}</Link>
		</h4>
	)
}

class InfoSection extends React.Component {
	render() {
		const cover = (this.props.cover) ?
			<ResponsiveImage classNames='info__cover' {...this.props.cover } /> :
			null

		return (
			<ScrollableChild slug={`info-${this.props.slug}`}>
				<div className="info__section">
					<div className="info__header">
						<h2>{this.props.headline}</h2>
						{cover}
						<h3>{markdownToJSX(this.props.intro)}</h3>
					</div>
					<div className="info__blocks">
						{this.props.blocks.map(c => <InfoBlock key={`infoBlock-${slugify(c.header)}`} {...c} />)}
					</div>
					<div className="info__buttons">
						{this.props.buttons.map(b => <InfoButton key={`infoButton-${slugify(b.label)}`} {...b} />)}
					</div>
				</div>
			</ScrollableChild>
		)
	}
}


/**
 * Main Component
 */

class InfoPage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props)
		return (
			<ScrollableContainer>
				<section className="info">
					<aside className="aside-nav">
						{this.props.children.map(c => (
							<ScrollTrigger
								className="aside-nav-item"
								key={`info-scrollableNav-${this.props.slug}-${c.slug}`}
								slug={`info-${this.props.slug}-${c.slug}`}
							>
								<h3>{c.title}</h3>
							</ScrollTrigger>
						))}
					</aside>
					<div className="column with-aside">
						{this.props.children.map(c => (
							<ScrollableChild
								key={`info-scrollableChild-${this.props.slug}-${c.slug}`}
								slug={`info-${this.props.slug}-${c.slug}`}
							>
								<InfoSection
									key={`section-nav-${this.props.slug}-${c.slug}`}
									{...c}
								/>
							</ScrollableChild>
						))}
					</div>
				</section>
			</ScrollableContainer>
		)
	}
}

export default InfoPage
