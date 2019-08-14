import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import { asFreeForm } from '../../UI/FreeForm/toolkit'

import LoginStep from './LoginStep'
import ContactStep from './ContactStep'
import AcceptStep from './AcceptStep'

/**
 * RegistrationForm
 */

class RegistrationForm extends React.Component {
  onSubmit = e => {
    // this.props.onSubmit(e)
  }

  render() {
    if (!this.props.fieldConfig) return null
    const loginFields = R.pick(['Username', 'Password', 'Password2'])(this.props.fieldConfig)
    const contactFields = R.pick([
      'FirstName',
      'LastName',
      'BirthDate',
      'MobilePhone',
      'AddressLine1',
      'City',
      'State',
      'PostalCode',
    ])(this.props.fieldConfig)
    const acceptFields = R.pick(['LiabilityRelease', 'EmailOptIn', 'ReferredBy', 'ReferredByOtherText'])(this.props.fieldConfig)

    const commonProps = {
      subscribe: this.props.subscribe,
      unsubscribe: this.props.unsubscribe,
      // emit: this.props.emit,
      updateField: this.props.updateField,
    }
    // return null
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form__steps">
          <LoginStep
            active={this.props.currentStep === 1}
            advance={this.props.advance}
            fieldConfig={loginFields}
            getFieldValues={this.props.getFieldValues}
            {...commonProps}
          />
          <ContactStep
            active={this.props.currentStep === 2}
            advance={this.props.advance}
            fieldConfig={contactFields}
            getFieldValues={this.props.getFieldValues}
            {...commonProps}
          />
          <AcceptStep
            active={this.props.currentStep === 3}
            fieldConfig={acceptFields}
            getFieldValues={this.props.getFieldValues}
            liabilityText={this.props.liabilityText}
            {...commonProps}
          />
        </div>
      </form>
    )
  }
}

RegistrationForm.propTypes = {
  // registerUser: PropTypes.func.isRequired,
  // fieldConfig: PropTypes.arrayOf(PropTypes.shape),
  // currentStep: PropTypes.number.isRequired,
  // subscribe: PropTypes.func.isRequired,
  // unsubscribe: PropTypes.func.isRequired,
  // emit: PropTypes.func.isRequired,
}

RegistrationForm.defaultProps = {
  fieldConfig: undefined,
}

export default asFreeForm(RegistrationForm)
