import R from 'ramda'
import { withState, withHandlers, compose } from 'recompose'

const forceSingleToArray = R.when(a => a.constructor !== Array, a => [a])

const emptyListeners = new Map()

const withPubSub = compose(
  withState('listeners', 'updateListeners', emptyListeners),
  withHandlers({
    subscribe: props => (topics, callback) => {
      forceSingleToArray(topics).map(topic => {
        const listeners = R.clone(props.listeners)
        if (!listeners.has(topic)) listeners.set(topic, [])
        listeners.get(topic).push(callback)
        props.updateListeners(listeners)
      })
    },
    unsubscribe: props => (topics, callback) => {
      forceSingleToArray(topics).map(topic => {
        const listeners = R.clone(props.listeners)
        const listenersOfTopic = listeners.get(topic)
        if (listenersOfTopic && listenersOfTopic.length) {
          props.updateListeners(listeners.set(topic, R.reject(R.equals(callback), listenersOfTopic)))
        }
      })
    },
    emit: props => (topic, ...args) => {
      const listeners = props.listeners.get(topic)
      if (!listeners) return false
      R.forEach(listener => listener(...args))(listeners)
      return true
    },
  }),
)

export default withPubSub
