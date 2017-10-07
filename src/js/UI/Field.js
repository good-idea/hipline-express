import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Input } from './FreeForm'

const HelpText = ({ text }) => (text) ? <h5 key={text} className="field__helpText">{text}</h5> : null

/**
 * Field
 */

class Field extends React.Component {
	constructor(props) {
		super(props)
		this.getHelpText = this.getHelpText.bind(this)
		this.getValidationText = this.getValidationText.bind(this)
		this.state = {}
	}

	getHelpText(helpText) {
		this.setState({ helpText })
	}

	getValidationText() {

	}

	renderHelpText() {
		return (
			<div className="ff__helpTexts">
				<HelpText text={this.props.helpText} />
				<HelpText text={this.state.helpText} />
			</div>
		)
	}

	render() {
		console.log(this.props)
		const validationText = null
		return (
			<div className={cn(this.props.className, 'field')}>
				<label htmlFor={this.props.field.name}><h4>{this.props.field.label}:</h4></label>
				<div className="field__content">
					<div className="field__inputWrapper">
						<Input
							something="nothing"
							{...this.props.field}
							onHelpTextUpdate={this.getHelpText}
							onValidationTextUpdate={this.getValidationText}
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
