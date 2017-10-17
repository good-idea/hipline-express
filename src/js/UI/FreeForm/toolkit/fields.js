import PropTypes from 'prop-types'
import {
	omit,
	pickAll,
	path,
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
} from 'recompose'


const addRegistrationToLifecycle = lifecycle({
	componentDidMount() {
		this.props.form.addField({ ...this.props })
	},
	componentWillUnmount() {
		// TODO: Will removing this be better:
		// to allow the form to contain all values even if their inputs have been unmounted?
		this.props.form.removeField({ ...this.props })
	},
	componentWillReceiveProps(nextProps) {
		// console.log(this.props, nextProps)
	}
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
	onChange: props => (e) => {
		props.form.updateField(props.id, { ...props, value: e.target.value }, () => {
			props.form.emit('fieldChanged', props.id)
		})
	},
	onFocus: props => () => {
		props.form.emit('fieldFocused', props.id)
	},
	onBlur: props => () => {
		props.form.emit('fieldBlurred', props.id)
	},
})

export const getFormContext = getContext({
	form: PropTypes.object,
})


export const withInputHelpers = compose(
	withDefaultProps,
	mapFieldProps,
	getFormContext,
	addRegistrationToLifecycle,
	addFieldHandlers,
)

export const withFieldHelpers = compose(
	withDefaultProps,
	getFormContext,
	mapFieldProps,
)
