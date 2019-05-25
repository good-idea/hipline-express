import React from 'react'
import PropTypes from 'prop-types'
import { toClass } from 'recompose'

import Card from '../../components/Card'
import Highlight from '../../components/Highlight'

import { wrapAndPrepare } from '../../utils/text'
import { slugify } from '../../utils/helpers'

/**
 * PassSection
 */

const PassSection = props => {
	if (!props.passes.length) return null
	return (
		<div className={`info__section info__section--passtype info__section--${slugify(props.title)}`}>
			<div className="info__header column column--narrow">
				<h3 className="info__title">
					<Highlight text={props.title} />
				</h3>
				<div className="info__subtitle">{wrapAndPrepare('p')(props.description)}</div>
			</div>
			<div className="cards">
				{props.passes.map(p => {
					const { title, description, price, mbolink } = p
					console.log(p)
					const cta = {
						action: mbolink,
						label: 'Buy',
						type: 'primary',
					}
					return <Card key={p.title} title={title} headline={price} body={description} cta={cta} />
				})}
			</div>
		</div>
	)
}

PassSection.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	passes: PropTypes.arrayOf(PropTypes.shape()),
}

PassSection.defaultProps = {
	description: '',
	passes: [],
}

export default toClass(PassSection)
