import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import R from 'ramda'

import { Field } from './FreeForm'
import { withFieldHelpers } from './FreeForm/toolkit/fields'

const singleToArray = R.when(
	(a => a.constructor !== Array),
	(a => [a]),
)

const HelpText = ({ text, classNames }) => (
	(text) ? <h5 className={cn('field__helptext', classNames)}>{text}</h5> : null
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
 * FieldContainer
 */

class FieldContainer extends React.Component {

	renderHelpText() {
		if (!this.props.helptext) return null
		return singleToArray(this.props.helptext).map(text => (
			<HelpText key={text} text={text} />
		))
	}

	render() {
		const validationText = null
		const label = (this.props.label)
			? <label htmlFor={this.props.name}><h4>{this.props.label}:</h4></label>
			: null
		const additionalClassNames = []
		if (this.props.visible === false) additionalClassNames.push('field--hidden')
		if (this.props.required === true) additionalClassNames.push('field--required')
		if (this.props.disabled === true) additionalClassNames.push('field--disabled')
		if (this.props.valid === false) additionalClassNames.push('field--invalid')
		return (
			<div className={cn(this.props.classNames, 'field', additionalClassNames)}>
				{label}
				<div className="field__content">
					<div className="field__inputWrapper">
						<Field
							{...this.props}
							initialValue={this.props.initialValue}
						/>
						{ this.renderHelpText() }
						{ validationText }
					</div>
				</div>
			</div>
		)
	}
}

FieldContainer.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	initialValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
	]),
	classNames: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string,
		PropTypes.shape(),
	]),
	visible: PropTypes.bool,
}

FieldContainer.defaultProps = {
	label: undefined,
	initialValue: undefined,
	classNames: '',
	visible: true,
}

export default withFieldHelpers(FieldContainer)
