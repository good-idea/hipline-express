import React from 'react'
import PropTypes from 'prop-types'

import ResponsiveImage from '../components/ResponsiveImage'
import Highlight from '../components/Highlight'
import InfoButton from '../components/InfoButton'
import {
	ScrollableContainer,
	ScrollableChild,
	ScrollTrigger,
} from '../UI/Scroll'
import { slugify } from '../utils/helpers'
import { markdownToJSX, wrapAndPrepare } from '../utils/text'

/**
 * Sub-components
 */

/**
 * InfoNavItem
 */

const InfoNavItem = props => {
	return (
		<div className="subnav__item">
			<ScrollTrigger slug={`info-${props.slug}`}>
				<button>
					<h4>{props.title}</h4>
				</button>
			</ScrollTrigger>
		</div>
	)
}

InfoNavItem.propTypes = {
	title: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
}

const InfoBlock = props => {
	return (
		<div className="info__block">
			<h4 className="info__block__header">{props.header}</h4>
			<div className="info__body">{markdownToJSX(props.body)}</div>
		</div>
	)
}

InfoBlock.propTypes = {
	coverVideo: PropTypes.string,
}

InfoBlock.defaultProps = {
	coverVideo: '',
}

/* eslint-disable react/prefer-stateless-function */
class InfoSection extends React.Component {
	render() {
		return (
			<ScrollableChild slug={`info-${this.props.slug}`}>
				<div
					className={`info__section info__section--standard info__section--${
						this.props.slug
					}`}
				>
					<div className="info__header">
						<h2 className="info__title">
							<Highlight text={this.props.headline} />
						</h2>
						{wrapAndPrepare('p')(this.props.intro)}
					</div>
					<div className="info__blocks">
						{this.props.blocks.map(c => (
							<InfoBlock key={`infoBlock-${slugify(c.header)}`} {...c} />
						))}
					</div>
					<div className="info__buttons">
						{this.props.buttons.map(b => (
							<InfoButton key={`infoButton-${slugify(b.label)}`} {...b} />
						))}
					</div>
				</div>
			</ScrollableChild>
		)
	}
}

InfoSection.propTypes = {
	coverVideo: PropTypes.string,
}

InfoSection.defaultProps = {
	coverVideo: '',
}

/**
 * Main Component
 */

class InfoPage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	render() {
		const cover = this.props.cover ? (
			<div className="info__cover">
				<ResponsiveImage {...this.props.cover} />
			</div>
		) : null

		return (
			<ScrollableContainer containerElement={document.body}>
				<section className={`info info--${this.props.slug}`}>
					<main>
						{cover}
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
					</main>
				</section>
			</ScrollableContainer>
		)
	}
}

export default InfoPage
