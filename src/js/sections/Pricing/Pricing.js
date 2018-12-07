// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { ScrollableContainer, ScrollableChild } from '../../UI/Scroll'
import PassSection from './PassSection'
import Splash from '../Splash'

/**
 * Pricing
 */

const Pricing = props => {
	return (
		<ScrollableContainer containerElement={document.body}>
			<div>
				<Splash text={props.splashText} />
				<section className="classes with-aside">
					<main>
						<div className="column--wide">
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
}

Pricing.defaultProps = {
	passes: {},
	splashText: '',
}

export default Pricing
