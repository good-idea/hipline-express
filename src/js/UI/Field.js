import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import R from 'ramda'

import { Input } from './FreeForm'

const singleToArray = R.when(
	(a => a.constructor !== Array),
	(a => [a]),
)

const HelpText = ({ text, classNames }) => (
	(text) ? <h5 className={cn('field__helpText', classNames)}>{text}</h5> : null
)

HelpText.propTypes = {
	text: PropTypes.string,
	classNames: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string),
	]),
}

HelpText.defaultProps = {
	classNames: '',
	text: '',
}

/**
 * Field
 */

class Field extends React.Component {

	renderHelpText() {
		if (!this.props.field.helpText) return null
		return singleToArray(this.props.field.helpText).map(text => (
			<HelpText key={text} text={text} />
		))
	}

	render() {
		const validationText = null
		return (
			<div className={cn(this.props.className, 'field')}>
				<label htmlFor={this.props.field.name}><h4>{this.props.field.label}:</h4></label>
				<div className="field__content">
					<div className="field__inputWrapper">
						<Input
							{...this.props.field}
							initialValue={this.props.initialValue}
							onFormChange={this.props.onFormChange}
						/>
						{ this.renderHelpText() }
						{ validationText }
					</div>
				</div>
			</div>
		)
	}
}

Field.propTypes = {
	className: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string,
		PropTypes.shape(),
	]),
}

Field.defaultProps = {
	classNames: ''
}

export default Field
