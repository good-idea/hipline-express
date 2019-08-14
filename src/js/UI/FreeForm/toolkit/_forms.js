import React from 'react'
import PropTypes from 'prop-types'
import { assoc, forEach, path, clone, merge, prop, reject, equals } from 'ramda'
import { compose, withState } from 'recompose'

import { singleToArray } from '../utils/data'

const emptyForm = {
  fields: {},
  valid: true,
  disabled: false,
}

const enhance = compose(withState('form', 'updateForm', emptyForm))

const withFormHelpers = WrappedComponent => {
  class FreeFormWrapper extends React.Component {
    constructor(props) {
      super(props)
      this.addField = this.addField.bind(this)
      this.removeField = this.removeField.bind(this)
      this.updateField = this.updateField.bind(this)
      this.getFieldValues = this.getFieldValues.bind(this)

      this.subscribe = this.subscribe.bind(this)
      this.unsubscribe = this.unsubscribe.bind(this)
      this.emit = this.emit.bind(this)

      this.handleSubmit = this.handleSubmit.bind(this)

      this.listeners = new Map()
      this.initialFields = {}
    }

    getChildContext() {
      return {
        form: {
          addField: this.addField,
          removeField: this.removeField,
          fields: this.props.form.fields,

          updateField: this.updateField,
          subscribe: this.subscribe,
          unsubscribe: this.unsubscribe,
          emit: this.emit,

          classNamePrefix: this.props.classNamePrefix || 'ff_',
        },
      }
    }

    getFieldValues() {
      return this.props.form.fields
    }

    removeField(field) {
      this.props.updateForm(currentFormState => {
        return {
          ...currentFormState,
          fields: reject(equals(field), currentFormState.fields),
        }
      })
    }

    addField(field) {
      this.props.updateForm(currentFormState => {
        return {
          ...currentFormState,
          fields: assoc(field.id, field, currentFormState.fields),
        }
      })
    }

    updateField(fieldId, newValues, callback) {
      const values = merge(prop(fieldId, this.props.form.fields), newValues)
      this.props.updateForm(
        {
          ...this.props.form,
          fields: assoc(fieldId, values, this.props.form.fields),
        },
        callback,
      )
    }

    subscribe(topics, callback) {
      singleToArray(topics).map(topic => {
        // if the listener does not have the topic yet, add it.
        if (!this.listeners.has(topic)) this.listeners.set(topic, [])
        // push the callback to the topic's array
        this.listeners.get(topic).push(callback)
      })
    }

    unsubscribe(topics, callback) {
      singleToArray(topics).map(topic => {
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
      const fieldValues = path(['form', 'fields'], this.props)
      forEach(listener => listener({ fieldValues, event: topic, triggerFieldId: fieldId }))(listeners)
      return true
    }

    handleSubmit(e) {
      e.preventDefault()
      this.props.onSubmit('some values')
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <WrappedComponent
            subscribe={this.subscribe}
            unsubscribe={this.unsubscribe}
            // emit={this.emit} why would anything outside of the form emit?
            updateField={this.updateField}
            getFieldValues={this.getFieldValues}
            {...this.props}
          />
        </form>
      )
    }
  }

  FreeFormWrapper.childContextTypes = {
    form: PropTypes.object,
  }

  return enhance(FreeFormWrapper)
}

export default withFormHelpers
