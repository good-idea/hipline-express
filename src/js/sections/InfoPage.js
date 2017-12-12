import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ResponsiveImage from '../components/ResponsiveImage'
import Highlight from '../components/Highlight'
import { ScrollableContainer, ScrollableChild, ScrollTrigger } from '../UI/Scroll'
import { slugify } from '../utils/helpers'
import { markdownToJSX, wrapAndPrepare } from '../utils/text'

/**
 * Sub-components
 */

class InfoNavItem extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="subnav__item">
				<ScrollTrigger slug={`info-${this.props.slug}`}>
					<button>
						<h4>{this.props.title}</h4>
					</button>
				</ScrollTrigger>
			</div>
		)
	}
}

const InfoBlock = (props) => {
	return (
		<div className="info__block">
			<h4 className="info__block__header">{props.header}</h4>
			{markdownToJSX(props.body)}
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

/* eslint-disable react/prefer-stateless-function */
class InfoSection extends React.Component {
	render() {
		const cover = (this.props.cover) ?
			<ResponsiveImage classNames="info__cover" {...this.props.cover} /> :
			null

		return (
			<ScrollableChild slug={`info-${this.props.slug}`}>
				<div className="info__section">
					<div className="info__header">
						<h2 className="info__title">
							<Highlight text={this.props.headline}/>
						</h2>
						{cover}
						{wrapAndPrepare('p')(this.props.intro)}
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

	componentDidMount() {

	}

	render() {
		return (
			<ScrollableContainer containerElement={document.body}>
				<section className="info">
					<aside className="aside-nav">
						{this.props.children.map(c => (
							<ScrollTrigger
								className="aside-nav-item"
								key={`info-scrollableNav-${this.props.slug}-${c.slug}`}
								slug={`info-${this.props.slug}-${c.slug}`}
							>
								<h4>{c.title}</h4>
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
