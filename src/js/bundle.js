import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const renderApp = (Component) => {
	ReactDOM.render((
		<AppContainer>
			<BrowserRouter>
				<Component />
			</BrowserRouter>
		</AppContainer>
	), document.getElementById('root'))
}

renderApp(App)

if (module.hot) {
	module.hot.accept('./App.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./App').default
		renderApp(NewApp)
	})
}
