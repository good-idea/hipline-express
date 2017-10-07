import React from 'react'
import PropTypes from 'prop-types'
import { reduce, assoc, reject, equals, mapObjIndexed, pick } from 'ramda'

import { filterFalsyChildren } from '../utils/react'

/**
 * FFBase
 */

class FFBase extends React.Component {
	constructor(props) {
		super(props)
		this.addField = this.addField.bind(this)
		this.removeField = this.removeField.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.unsubscribe = this.unsubscribe.bind(this)
		this.emit = this.emit.bind(this)
		this.fields = []
		this.listeners = new Map()
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
			<div>
				{ React.Children.map(children, c => React.cloneElement(c, {})) }
			</div>
		)
	}
}

FFBase.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]).isRequired,
}

FFBase.defaultProps = {
	// title: 'My Title'
}

export default FFBase
