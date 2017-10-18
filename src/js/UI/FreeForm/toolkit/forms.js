import PropTypes from 'prop-types'
import R from 'ramda'

import {
	withState,
	withHandlers,
	withContext,
	compose,
	lifecycle,
} from 'recompose'

// import { forceSingleToArray } from '../../../utils/helpers'
import { forceSingleToArray } from '../utils/data'

// Set the initial state and some handlers.

const emptyListeners = new Map()

const emptyForm = {
	fields: {},
	valid: true,
	disabled: false,
}

const setInitialState = compose(
	// Form State
	withState('form', 'updateForm', emptyForm),
	withHandlers({
		addField: props => (field) => {
			props.updateForm(currentFormState => ({
				...currentFormState,
				fields: R.assoc(field.id, field, currentFormState.fields),
			}))
		},
		removeField: props => (field) => {
			props.updateForm(currentFormState => ({
				...currentFormState,
				fields: R.reject(R.equals(field), currentFormState.fields),
			}))
		},
		updateField: props => (fieldId, newValues, callback) => {
			const values = R.merge(
				R.prop(fieldId, props.form.fields),
				newValues,
			)
			props.updateForm((currentFormState) => {
				return ({
					...currentFormState,
					fields: R.assoc(fieldId, values, currentFormState.fields),
				})
			}, callback)
		},
		getFieldValues: props => () => R.clone(props.form.fields),
	}),

	// Publisher State
	withState('listeners', 'updateListeners', emptyListeners),
	withHandlers({
		subscribe: props => (topics, callback) => {
			forceSingleToArray(topics).map((topic) => {
				const listeners = R.clone(props.listeners)
				if (!listeners.has(topic)) listeners.set(topic, [])
				listeners.get(topic).push(callback)
				props.updateListeners(listeners)
			})
		},
		unsubscribe: props => (topics, callback) => {
			forceSingleToArray(topics).map((topic) => {
				const listeners = R.clone(props.listeners)
				const listenersOfTopic = listeners.get(topic)
				if (listenersOfTopic && listenersOfTopic.length) {
					props.updateListeners(
						listeners.set(topic, R.reject(R.equals(callback), listenersOfTopic)),
					)
				}
			})
		},
		emit: props => ({ topic, fieldId, ...rest }) => {
			const listeners = props.listeners.get(topic)
			if (!listeners) return false
			const fieldValues = R.path(['form', 'fields'], props)
			R.forEach(
				(listener => listener({ fieldValues, topic, triggerFieldId: fieldId, ...rest })),
			)(listeners)
			return true
		},
	}),
)


// Set up the context

const setUpContext = withContext(
	{ form: PropTypes.object },
	(props => ({
		form: {
			addField: props.addField,
			removeField: props.removeField,
			// fields: props.form.fields,
			updateField: props.updateField,
			getFieldValues: props.getFieldValues,

			subscribe: props.subscribe,
			unsubscribe: props.unsubscribe,
			emit: props.emit,

			classNamePrefix: props.classNamePrefix || 'ff_',
		},
	})),
)


// Set up some event handlers and watch them in the lifecycle

const addOnSubmitHandler = withHandlers({
	onSubmit: props => (e) => {
		e.preventDefault()
		// console.log(e.isPropagationStopped)
		const values = R.compose(
			R.values,
			R.map(R.pickAll(['name', 'value'])),
		)(props.getFieldValues())
		props.onSubmit(values)
	},
})

const formEnhancer = compose(
	setInitialState,
	setUpContext,
	addOnSubmitHandler,
)

export default formEnhancer
