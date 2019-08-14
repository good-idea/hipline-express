import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { init, RouteTracker } from './services/GoogleAnalytics'
import App from './App'

const renderApp = Component => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <React.Fragment>
          {init() && <RouteTracker />}
          <Component />
        </React.Fragment>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'),
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./App.js', () => {
    // eslint-disable-next-line
    const NewApp = require('./App').default
    renderApp(NewApp)
  })
}
