import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

/**
 * DashboardNavButton
 */

const DashboardNavButton = props => {
  const handleClick = () => {
    props.changeNavSection(props.id)
  }
  const classNames = ['aside-nav-item']
  if (props.active) classNames.push('aside-nav-item--active')
  return (
    <button onClick={handleClick} className={cn(classNames, props.classNames)}>
      <h3>{props.label}</h3>
    </button>
  )
}

DashboardNavButton.propTypes = {
  // title: PropTypes.string
}

DashboardNavButton.defaultProps = {
  // title: 'My Title'
}

export default DashboardNavButton
