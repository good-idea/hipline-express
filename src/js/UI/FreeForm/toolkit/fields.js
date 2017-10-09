import PropTypes from 'prop-types'
import {
	omit,
	pickAll,
	path,
} from 'ramda'

import {
	mapProps,
	withHandlers,
	getContext,
	compose,
	lifecycle,
} from 'recompose'

const getFieldValues = a => ((a) ? pickAll(['id', 'name', 'value', 'valid'])(a) : {})

const registerField = lifecycle({
	componentDidMount() {
		this.props.form.addField({...this.props})
	}
})



const mapFieldProps = mapProps((props) => {
	const fieldValues = path(['fields', props.id], props.form)
	return {
		value: props.initialValue,
		...props,
		...fieldValues,
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
	getFormContext,
	mapFieldProps,
	registerField,
	addFieldHandlers,
)

export const withFieldHelpers = compose(
	getFormContext,
	mapFieldProps,
)
