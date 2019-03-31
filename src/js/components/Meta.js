import * as React from 'react'
import propTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'

const Meta = ({ seo, location, children }) => {
	const { description, title, image, keywords } = seo
	if (children) throw new Error('<Meta /> cannot have children')

	const canonical = `https://www.myhipline.com${location.pathname}`
	const imageUrl = image && image.url ? image.url : null
	return (
		<Helmet
			title={title}
			meta={[
				{ name: 'description', content: description },
				{ name: 'keywords', content: keywords },
				{ property: 'og:title', content: title },
				{ property: 'og:description', content: description },
				{ property: 'og:image', content: imageUrl || null },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: canonical },
				{ name: 'robots', content: 'index, follow' },
				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:title', content: 'Hipline' },
				{ name: 'twitter:description', content: title },
				{ name: 'twitter:image', content: imageUrl || null },
			]}
			link={[{ rel: 'canonical', href: canonical }]}
		/>
	)
}

Meta.propTypes = {
	seo: propTypes.shape({
		title: propTypes.string,
		description: propTypes.string,
		image: propTypes.object,
		keywords: propTypes.string,
	}),
	location: propTypes.shape({
		pathname: propTypes.string,
	}).isRequired,
	children: propTypes.node,
}

Meta.defaultProps = {
	seo: {},
	children: null,
}

export default withRouter(Meta)
