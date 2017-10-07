import React from 'react'
import PropTypes from 'prop-types'
import { reduce, assoc, reject, equals, mapObjIndexed, pick } from 'ramda'
import cn from 'classnames'

import { filterFalsyChildren } from '../utils/react'

/**
 * Form
 */

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.addField = this.addField.bind(this)
		this.removeField = this.removeField.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.unsubscribe = this.unsubscribe.bind(this)
		this.emit = this.emit.bind(this)

		this.classNamePrefix = props.classNamePrefix || 'ff__'


		this.fields = []
		this.listeners = new Map()
	}

	getChildContext() {
		return {
			form: {
				addField: this.addField,
				removeField: this.removeField,
				subscribe: this.subscribe,
				unsubscribe: this.unsubscribe,
				emit: this.emit,
				classNamePrefix: this.classNamePrefix
			},
		}
	}

	onSubmit(e) {
		e.preventDefault()
		const values = this.getFieldValues()
		if (this.props.onSubmit) this.props.onSubmit(values)
	}

	getFieldValues() {
		return reduce(
			(acc, f) => (
				assoc(
					f.props.name,
					{
						...f.state,
						...pick(['initialValue'])(f.props),
					},
				)(acc)
			), {})(this.fields)
	}

	addField(field) {
		this.fields.push(field)
	}

	removeField(field) {
		this.fields = reject(equals(field), this.fields)
	}

	subscribe(topic, callback) {
		// if the listener does not have the topic yet, add it.
		if (!this.listeners.has(topic)) this.listeners.set(topic, [])
		// push the callback to the topic's array
		this.listeners.get(topic).push(callback)
	}

	unsubscribe(topic, callback) {
		const listenersOfTopic = this.listeners.get(topic)
		if (listenersOfTopic && listenersOfTopic.length) {
			// remove the callback
			this.listeners.set(topic, reject(equals(callback), listenersOfTopic))
			return true
		}
		return false
	}

	emit(topic, updatedFieldId) {
		const listeners = this.listeners.get(topic)
		if (listeners && listeners.length) {
			const values = mapObjIndexed(
				(value, key) => {
					if (key === updatedFieldId) return assoc('triggeredChange', true, value)
					return value
				},
			)(this.getFieldValues())
			listeners.forEach((listener) => {
				listener(values)
			})
			return true
		}
		return false
	}


	render() {
		const children = filterFalsyChildren(this.props.children)
		return (
			<form className={cn(this.props.classNames, `${this.classNamePrefix}form`)} onSubmit={this.onSubmit}>
				{ React.Children.map(children, (c) => {
					const extraProps = (typeof c.type !== 'string') ? { emit: this.emit, subscribe: this.subscribe, unsubscribe: this.unsubscribe } : {}
					return React.cloneElement(c, extraProps)
				})}
			</form>
		)
	}
}

Form.childContextTypes = {
	form: PropTypes.object,
}

Form.propTypes = {
	classNamePrefix: PropTypes.string,
	classNames: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string,
		PropTypes.shape(),
	]),
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]).isRequired,
	onSubmit: PropTypes.func,
}

Form.defaultProps = {
	classNamePrefix: 'ff__',
	classNames: '',
	onSubmit: () => {},
}

export default Form
