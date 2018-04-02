import React from 'react'
import { Link } from 'react-router-dom'
/**
 * NotFound
 */

const NotFound = () => (
	<section>
		<main className="notFound">
			<h1>Page not found!</h1>
			<h4>
				<Link href="/" to="/">
					Return home
				</Link>
			</h4>
			<h4>
				<a href="http://clients.mindbodyonline.com/ws.asp?studioid=4561&stype=-7">Sign up for classes</a>
			</h4>
		</main>
	</section>
)

NotFound.propTypes = {
	// title: PropTypes.string
}

NotFound.defaultProps = {
	// title: 'My Title'
}

export default NotFound
