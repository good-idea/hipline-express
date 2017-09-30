import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import Form from '../../components/Forms/Form'
import Fieldset from '../../components/Forms/Fieldset'
import FormField from '../../components/Forms/FormField'

/**
 * Field Helper Functions
 */

const showOtherText = (formFields, currentState) => {
	const classNames = (formFields.ReferredBy.value === 'Other') ?
		R.filter(c => c !== 'form__field--hidden', currentState.classNames) :
		R.uniq([...currentState.classNames, 'form__field--hidden'])
	return { classNames }
}

/**
 * Register
 */

class Register extends React.Component {
	constructor(props) {
		super(props)
		const fields = (props.registrationFields) ? this.sortFields(props) : false
		this.state = { fields }
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.fields === false) {
			const fields = this.sortFields(nextProps)
			this.setState({ fields })
		}
	}

	sortFields(props = this.props) {
		const agreeFieldNames = ['LiabilityRelease', 'EmailOptIn']
		const loginFieldNames = ['Username', 'Password']
		const contactFieldNames = ['FirstName', 'LastName', 'BirthDate', 'MobilePhone', 'AddressLine1', 'City', 'State', 'PostalCode', 'ReferredBy', 'ReferredByOtherText']
		const fields = R.pipe(
			// Associate any validator functions
			R.map((f) => {
				if (f.name === 'ReferredByOtherText') return R.assoc('onFormUpdate', showOtherText)(f)
				return f
			}),

			// Group the field config objects into sets
			R.groupBy((f) => {
				if (loginFieldNames.includes(f.name)) return 'loginFields'
				if (agreeFieldNames.includes(f.name)) return 'agreeFields'
				return 'contactFields'
			}),
			//  sort them in the proper order
			R.map(
				R.sort((a, b) => {
					if (loginFieldNames.includes(a.name) || loginFieldNames.includes(b.name)) {
						const indexA = loginFieldNames.indexOf(a.name)
						const indexB = loginFieldNames.indexOf(b.name)
						if (indexA > indexB) return 1
						if (indexA === indexB) return 0
						return -1
					}
					const indexA = contactFieldNames.indexOf(a.name)
					const indexB = contactFieldNames.indexOf(b.name)
					if (indexA > indexB) return 1
					if (indexA === indexB) return 0
					return -1
				}),
			),
		)(props.registrationFields)

		return fields
	}

	handleSubmit(fields) {
		console.log(fields)
		// this.props.registerUser(userInfo)
	}

	render() {
		if (!this.state.fields) return null
		const { contactFields, loginFields, agreeFields } = this.state.fields
		return (
			<div>
				<Form handleSubmit={this.handleSubmit} >
					<Fieldset>
						{contactFields.map(f => <FormField key={`registration-${f.name}`} {...f} />)}
					</Fieldset>
					<Fieldset>
						{loginFields.map(f => <FormField key={`registration-${f.name}`} {...f} />)}
					</Fieldset>
					<Fieldset>
						{agreeFields.map(f => <FormField key={`registration-${f.name}`} {...f} />)}
					</Fieldset>
					<button type="submit">Sign Up</button>
				</Form>
			</div>
		)
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	registrationFields: PropTypes.arrayOf(PropTypes.shape),
}

Register.defaultProps = {
	registrationFields: undefined,
}

export default Register
