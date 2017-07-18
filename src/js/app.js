import React from 'react';
import axios from 'axios';

import Navigation from './components/Navigation';
// import Main from './components/Main';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		axios.get('/api/all').then((response) => {
			this.setState({
				...response.data
			});
		});
	}

	render() {
		return (
			<div>
				<Navigation {...this.state} />
			</div>
		);
	}
}


export default App;
