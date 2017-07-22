import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Navigation from './sections/Navigation';
// import Main from './components/Main';
import Choreographers from './sections/Choreographers';
import Classes from './sections/Classes';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sections: {},
		};
	}

	componentDidMount() {
		axios.get('/api/all').then((response) => {
			console.log(response);
			this.setState({
				sections: { ...response.data },
			});
		});
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<Navigation />
				<Route
					exact
					path="/"
					render={match => <Choreographers match={match} content={this.state.sections.choreographers} />}
				/>
				<Route
					exact
					path="/classes"
					render={match => <Classes match={match} content={this.state.sections.classes} />}
				/>
			</div>
		);
	}
}

export default App;
