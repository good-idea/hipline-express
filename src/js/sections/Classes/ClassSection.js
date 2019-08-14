import React from 'react'
import PropTypes from 'prop-types'
import { toClass } from 'recompose'
import ClassCard from './ClassCard'
import Highlight from '../../components/Highlight'
import InfoButton from '../../components/InfoButton'

import { slugify } from '../../utils/helpers'

/**
 * ClassSection
 */

const ClassSection = props => (
  <div className="info__section info__section--classtype">
    <h1 className="info__title">{props.title}</h1>

    <div className="info__header column" />
    <div className="cards">
      {props.children
        .filter(c => c.isVisible === true)
        .map((c, i) => (
          <ClassCard key={c.slug} index={i} {...c} />
        ))}
    </div>
    <div className="info__buttons">
      {Array.isArray(props.buttons) && props.buttons.map(b => <InfoButton key={`infoButton-${slugify(b.label)}`} {...b} />)}
    </div>
  </div>
)

ClassSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.shape()),
  buttons: PropTypes.arrayOf(PropTypes.shape()),
}

ClassSection.defaultProps = {
  description: '',
  children: [],
  buttons: [],
}

export default toClass(ClassSection)
