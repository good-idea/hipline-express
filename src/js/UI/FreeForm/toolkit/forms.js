import React from 'react'
import PropTypes from 'prop-types'
import { clone, forEach, map, reduce, assoc, reject, equals, pick } from 'ramda'
import cn from 'classnames'

import { singleToArray } from '../utils/data'

const withFormHelpers = (WrappedComponent) => {
	class FreeFormWrapper extends React.Component {
		constructor(props) {
			super(props)
			this.addField = this.addField.bind(this)
			this.removeField = this.removeField.bind(this)
			this.subscribe = this.subscribe.bind(this)
			this.unsubscribe = this.unsubscribe.bind(this)
			this.emit = this.emit.bind(this)

			this.getFieldValues = this.getFieldValues.bind(this)
			this.setFieldValues = this.setFieldValues.bind(this)

			this.onSubmit = this.onSubmit.bind(this)

			this.classNamePrefix = props.classNamePrefix || 'ff__'
			this.fields = []
			this.listeners = new Map()
			this.state = {
				fields: []
			}
		}

		getChildContext() {
			return {
				form: {
					addField: this.addField,
					removeField: this.removeField,
					setFieldValues: this.setFieldValues,
					subscribe: this.subscribe,
					unsubscribe: this.unsubscribe,
					emit: this.emit,
					classNamePrefix: this.classNamePrefix,
					fields: this.fields,
				},
			}
		}

		onSubmit(e) {
			if (this.props.preventDefault === true) e.preventDefault()
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

		setFieldValues(fieldId, values) {
			this.fields = R.assoc(fieldId, values, this.fields)
		}
		//
		// componentDidMount() {
		// 	this.setState({
		// 		fields: this.fields
		// 	})
		// }

		addField(field) {
			console.log('add field')
			console.log(field)

			this.setState({
				fields: this.state.fields.push(field)
			}, () => console.log(this.state.fields))
			// this.fields.push(field)
		}

		removeField(field) {
			// this.setState({
			// 	fields: reject((f => f.// IDEA: ))
			// }) = reject(equals(field), this.fields)
		}

		subscribe(topics, callback) {
			singleToArray(topics).map((topic) => {
				// if the listener does not have the topic yet, add it.
				if (!this.listeners.has(topic)) this.listeners.set(topic, [])
				// push the callback to the topic's array
				this.listeners.get(topic).push(callback)
			})
		}

		unsubscribe(topics, callback) {
			singleToArray(topics).map((topic) => {
				const listenersOfTopic = this.listeners.get(topic)
				if (listenersOfTopic && listenersOfTopic.length) {
					// remove the callback
					this.listeners.set(topic, reject(equals(callback), listenersOfTopic))
					return true
				}
				return false
			})
		}

		emit(topic, fieldId) {
			const listeners = this.listeners.get(topic)
			if (!listeners) return false
			const fieldValues = this.getFieldValues()
			forEach(
				(listener => listener({ fieldValues, event: topic, triggerFieldId: fieldId })),
			)(listeners)
			return true
		}

		buildClassName() {
			const baseClassNames = ['form']
			if (this.state.disabled) baseClassNames.push('form--disabled')
			if (this.state.valid !== true) baseClassNames.push('form--invalid')
			if (this.state.valid === true) baseClassNames.push('form--valid')

			const prefix = this.props.classNamePrefix || 'ff__'
			const prefixedClassNames = map(c => `${prefix}${c}`)(baseClassNames)

			return cn([...cn(this.props.classNames), ...prefixedClassNames])
		}

		render() {
			return (
				<WrappedComponent
					className={this.buildClassName()}
					{...this.props}
					{...this.state}
					subscribe={this.subscribe}
					unsubscribe={this.unsubscribe}
					emit={this.emit}
					onChange={this.handleChange}
					getFieldValues={this.getFieldValues}
					onSubmit={this.onSubmit}
				/>
			)
		}
	}

	FreeFormWrapper.childContextTypes = {
		form: PropTypes.object,
	}

	FreeFormWrapper.propTypes = {
		classNamePrefix: PropTypes.string,
		classNames: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.string,
			PropTypes.shape(),
		]),
		onSubmit: PropTypes.func,
		preventDefault: PropTypes.bool,
	}

	FreeFormWrapper.defaultProps = {
		classNamePrefix: 'ff__',
		classNames: '',
		onSubmit: () => {},
		preventDefault: false,
	}

	return FreeFormWrapper
}

export default withFormHelpers
