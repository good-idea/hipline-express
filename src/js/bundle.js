import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const render = (Component) => {
	console.log('')
	console.log('')
	console.log('************ RENDER ***********')
	ReactDOM.render((
		<AppContainer>
			<BrowserRouter>
				<Component />
			</BrowserRouter>
		</AppContainer>
	), document.getElementById('root'))
}

render(App)

if (module.hot) module.hot.accept()
//
// if (module.hot) {
// 	module.hot.accept('./App', (a, b) => {
// 		console.log({a, b})
// 		console.log('HOTT')
// 		render(App)
// 	})
// }
