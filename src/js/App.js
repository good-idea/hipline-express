import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Route, Switch, withRouter } from 'react-router-dom'

import Announcement from './sections/Announcement'
import Navigation from './sections/Navigation'
import Choreographers from './sections/Choreographers'
import Classes from './sections/Classes/Classes'
import Pricing from './sections/Pricing/Pricing'
import InfoPage from './sections/InfoPage'
import Footer from './sections/Footer'
import NotFound from './sections/NotFound'

import { SquigglePaths } from './components/Squiggle'

import { parseContent } from './utils/content'
import withPubSub from './enhancers/withPubSub'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.setDropdown = this.setDropdown.bind(this)
		this.state = {
			sections: {},
			infoPages: [],
			footerPages: [],
		}
	}

	componentDidMount() {
		// const apiRoot = (window.)
		// Split the initial content & MBO requests into two:
		// the MBO call may take longer, or the API server may be down
		axios.get(`http://0.0.0.0:8090/api/initial?uri=${this.props.location.pathname}`).then(response => {
			// axios.get(`/api/content/initial?uri=${this.props.location.pathname}`).then(response => {
			console.log(response.data)
			const newState = parseContent({ ...this.state, ...response.data })
			this.setState(newState, () => {
				this.props.emit('cmsContentLoaded')
			})
		})
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			document.body.scrollTop = 0
		}
	}

	setDropdown(dropdown) {
		this.setState({ dropdown })
	}

	showAnnouncement = () => {
		this.setState({ announcement: true })
	}

	hideAnnouncement = () => {
		this.setState({ announcement: false })
	}

	render() {
		if (!this.state.home) return null
		console.log(this.state)
		const currentSection = this.props.location.pathname.replace(/^\//, '').split('/')[0]
		const hasAnnouncement = this.state.announcement ? 'withAnnouncement' : ''
		return (
			<div id="app" className={`section--${currentSection} ${hasAnnouncement}`}>
				<SquigglePaths />
				<Announcement
					text={this.state.home.announcement}
					link={this.state.home.announcementurl}
					showAnnouncement={this.showAnnouncement}
					hideAnnouncement={this.hideAnnouncement}
				/>
				<Navigation pages={this.state.infoPages} />
				<Switch>
					<Route
						exact
						path="/"
						render={match => (
							<Choreographers match={match} home={this.state.home} {...this.state.choreographers} seo={this.state.meta} />
						)}
					/>
					<Route exact path="/passes" render={() => <Pricing passes={this.state.passes} seo={this.state.passes.seo} />} />
					<Route
						exact
						path="/classes"
						render={match => (
							<Classes
								match={match}
								splashText={this.state.classes.intro}
								seo={this.state.classes.seo}
								classtypes={this.state.classtypes}
							/>
						)}
					/>
					{this.state.infoPages.map(page => (
						<Route exact key={`info-${page.slug}`} path={`/${page.slug}`} render={() => <InfoPage {...page} />} />
					))}
					{this.state.footerPages.map(page => (
						<Route exact key={`footer-${page.slug}`} path={`/${page.slug}`} render={() => <InfoPage {...page} />} />
					))}
					<NotFound />
				</Switch>
				<Footer footerPages={this.state.footerPages} {...this.state.home} />
			</div>
		)
	}
}

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	emit: PropTypes.func.isRequired,
}

export default withRouter(withPubSub(App))
