import React from 'react'
import PropTypes from 'prop-types'

import ResponsiveImage from '../components/ResponsiveImage'
import Highlight from '../components/Highlight'
import InfoButton from '../components/InfoButton'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import { ScrollableContainer, ScrollableChild, ScrollTrigger } from '../UI/Scroll'
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

/**
 * InfoCard
 */

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable indent */
class InfoCard extends React.PureComponent {
	render() {
		const { cta_label, cta_action, cta_type } = this.props
		const cta =
			cta_label && cta_action
				? {
						label: cta_label,
						action: cta_action,
						type: cta_type,
				  }
				: null
		return <Card size="large" {...this.props} cta={cta} />
	}
}

InfoCard.propTypes = {
	title: PropTypes.string.isRequired,
	headline: PropTypes.string,
	body: PropTypes.string,
	cta_label: PropTypes.string,
	cta_action: PropTypes.string,
	cta_type: PropTypes.oneOf(['primary', 'secondary']),
}

InfoCard.defaultProps = {
	headline: '',
	body: '',
	cta_label: null,
	cta_action: null,
	cta_type: 'primary',
}
/**
 * InfoSection
 */

/* eslint-disable react/prefer-stateless-function */
class InfoSection extends React.PureComponent {
	render() {
		return (
			<ScrollableChild slug={`info-${this.props.slug}`}>
				<div className={`info__section info__section--standard info__section--${this.props.slug}`}>
					<div className="column">
						<div className="info__header">
							<h4 className="info__title">
								<Highlight text={this.props.headline} />
							</h4>
							{wrapAndPrepare('p')(this.props.intro)}
						</div>
						<Carousel settings={this.props.carousel_settings} images={this.props.images} />
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
				</div>
			</ScrollableChild>
		)
	}
}

InfoSection.propTypes = {
	coverVideo: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string,
		}),
	),
	carousel_settings: PropTypes.string,
}

InfoSection.defaultProps = {
	coverVideo: '',
	images: [],
	carousel_settings: '',
}

/**
 * Main Component
 */

class InfoPage extends React.PureComponent {
	render() {
		const cover = this.props.cover ? (
			<div className="info__cover">
				<ResponsiveImage {...this.props.cover} sizes="(max-width: 800px) 40vw, 100vw" />
			</div>
		) : null

		return (
			<ScrollableContainer containerElement={document.body}>
				<section className={`info info--${this.props.slug}`}>
					<main>
						{cover}
						{this.props.children &&
							this.props.children.map(c => (
								<ScrollableChild
									key={`info-scrollableChild-${this.props.slug}-${c.slug}`}
									slug={`info-${this.props.slug}-${c.slug}`}
								>
									{c.type === 'infopage' ? (
										<InfoSection key={`section-nav-${this.props.slug}-${c.slug}`} {...c} />
									) : c.type === 'infocard' ? (
										<InfoCard key={`section-nav-${this.props.slug}-${c.slug}`} {...c} />
									) : (
										<p>hi</p>
									)}
								</ScrollableChild>
							))}
					</main>
				</section>
			</ScrollableContainer>
		)
	}
}

export default InfoPage
