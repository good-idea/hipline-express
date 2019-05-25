// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { ScrollableContainer, ScrollableChild } from '../../UI/Scroll'
import PassSection from './PassSection'
import Splash from '../Splash'
import Meta from '../../components/Meta'

/**
 * Pricing
 */

const Pricing = props => {
	console.log(props)
	return (
		<ScrollableContainer containerElement={document.body}>
			<div>
				<Meta seo={props.seo || {}} />

				<Splash text={props.splashText} />
				<section className="classes with-aside">
					<main>
						<h1 className="info__title">Pricing</h1>
						<div className="column--xWide">
							<div>
								{props.passes.types.map(p => (
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
Pricing.propTypes = {
	passes: PropTypes.shape({
		types: PropTypes.arrayOf(PropTypes.shape({})),
	}),
	splashText: PropTypes.string,
	seo: PropTypes.shape({}),
}

Pricing.defaultProps = {
	passes: {},
	splashText: '',
	seo: {},
}

export default Pricing
