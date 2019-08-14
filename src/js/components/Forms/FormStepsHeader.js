import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { cn } from '../../utils/helpers'

/**
 * FormStepsHeader
 */

const FormStepsHeader = props => {
  const classNames = ['formStepsHeader']
  if (props.currentStep === 1) classNames.push('formStepsHeader--firstStep')
  return (
    <div className={cn(classNames)}>
      <div className="formStepsHeader__top">
        <button className="formStepsHeader__goBack" onClick={props.goBack} />
        <h5 className="formStepsHeader__title">
          Step {props.currentStep} of {props.totalSteps}
        </h5>
        <button className="formStepsHeader__advance" onClick={props.advance} />
      </div>
      <div className="progress">
        {R.times(num => {
          const progressClassNames = ['progress__dot']
          if (num < props.currentStep) progressClassNames.push('progress__dot--complete')
          return <div key={`progress-${num}`} className={cn(progressClassNames)} />
        }, props.totalSteps)}
        <div className="progress__bar">
          <div
            className="progress__bar__inner"
            style={{ width: `${((props.currentStep - 1) / (props.totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

FormStepsHeader.propTypes = {
  // title: PropTypes.string
}

FormStepsHeader.defaultProps = {
  // title: 'My Title'
}

export default FormStepsHeader
