import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Navigation from './sections/Navigation';
// import Main from './components/Main';
import Choreographers from './sections/Choreographers';
import Classes from './sections/Classes';
import InfoPage from './sections/InfoPage';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sections: {},
		};
	}

	componentDidMount() {
		let timer = Date.now();
		// Split the initial content & MBO requests into two: the MBO call may take longer.
		axios.get('/api/content/initial').then((response) => {
			console.log(`Response time of ${Date.now() - timer}`, response);
			this.setState({
				sections: { ...response.data },
			});
		});
	}

	render() {
		console.log(this.state);
		if (!this.state.sections.home) return null;
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
				<Route
					exact
					path="/community"
					render={() => <InfoPage {...this.state.sections.community} />}
				/>
			</div>
		);
	}
}

export default App;
