import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import formEnhancer from '../toolkit/forms'

import { filterFalsyChildren } from '../utils/react'

/**
 * Form
 */

class Form extends React.Component {
  render() {
    const children = filterFalsyChildren(this.props.children)
    return (
      <form className={this.props.className} onSubmit={this.props.onSubmit}>
        {React.Children.map(children, c => {
          const extraProps =
            typeof c.type !== 'string' ? { emit: this.emit, subscribe: this.subscribe, unsubscribe: this.unsubscribe } : {}
          return React.cloneElement(c, extraProps)
        })}
      </form>
    )
  }
}

Form.propTypes = {
  classNames: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string, PropTypes.shape()]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
  onSubmit: PropTypes.func,
}

Form.defaultProps = {
  classNamePrefix: 'ff__',
  classNames: '',
  onSubmit: () => {},
}

export default formEnhancer(Form)
