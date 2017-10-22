import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

/**
 * SpoofUser
 */

class SpoofUser extends React.Component {
	onSubmit = (e) => {
		e.preventDefault()
		axios.get('/api/admin/user/account', { params: { userId: this.input.value }}).then((response) => {
			this.props.setUserData(response.data.user)
		}).catch(err => console.log(err))
	}

	render() {
		return (
			<form className="spoofUser" onSubmit={this.onSubmit}>
				<input type="text" ref={(element) => { this.input = element }} />
			</form>
		)
	}
}

SpoofUser.propTypes = {
	// title: PropTypes.string
}

SpoofUser.defaultProps = {
	// title: 'My Title'
}

export default SpoofUser
