import PropTypes from 'prop-types'
import {
	prop,
	dissoc,
} from 'ramda'

import {
	mapProps,
	withHandlers,
	getContext,
	compose,
	lifecycle,
	defaultProps,
	pure,
} from 'recompose'

const addLifecycleRegistrationMethods = lifecycle({
	componentDidMount() {
		this.props.form.addField({ ...this.props })
	},
	componentWillUnmount() {
		// TODO: Will removing this be better:
		// to allow the form to contain all values even if their inputs have been unmounted?
		this.props.form.removeField({ ...this.props })
	},
})

const withDefaultProps = defaultProps({ valid: true, disabled: false })

const mapFieldProps = mapProps((props) => {
	const newFieldValues = prop(props.id, props.form.getFieldValues())
	return {
		value: props.initialValue,
		...props,
		...newFieldValues,
	}
})

const addFieldHandlers = withHandlers({
	onChange: props => (event) => {
		event.persist()
		const value = (props.type === 'checkbox')
			? event.target.checked
			: event.target.value
		props.form.updateField(props.id, { ...props, value }, () => {
			props.form.emit({ topic: 'fieldChanged', triggerFieldId: props.id, event })
		})
	},
	onFocus: props => (event) => {
		props.form.emit({ topic: 'fieldFocused', triggerFieldId: props.id, event })
	},
	onBlur: props => (event) => {
		event.target.checkValidity()
		props.form.emit({ topic: 'fieldBlurred', triggerFieldId: props.id, event })
	},
	onKeyDown: props => (event) => {
		event.persist()
		if (event.keyCode === 13) {
			props.form.emit({ topic: 'enterKeyPressed', triggerFieldId: props.id, event })
		}
	},
})

export const getFormContext = getContext({
	form: PropTypes.object,
})


export const withInputHelpers = compose(
	withDefaultProps,
	addLifecycleRegistrationMethods,
	pure,
	getFormContext,
	addFieldHandlers,
	mapFieldProps,
)

export const withFieldHelpers = compose(
	withDefaultProps,
	getFormContext,
	pure,
	mapFieldProps,
)
