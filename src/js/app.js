import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'

import Navigation from './sections/Navigation';
// import Main from './components/Main';
import Choreographers from './sections/Choreographers';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		axios.get('/api/all').then((response) => {
			this.setState({
				...response.data,
			});
		});
	}

	render() {
		return (
			<div>
				<Navigation />
				<Route path="/" render={match => (
					<Choreographers match={match} choreographers={this.state.choreographers} />
					)}
				/>
			</div>
		);
	}
}

export default App;
