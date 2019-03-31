import * as React from 'react'
import PropTypes from 'prop-types'
import ResponsiveImage from './ResponsiveImage'

const { useState } = React

const getSettings = settings => ({
	enabled: /enabled/.test(settings),
	autoplay: /autoplay/.test(settings),
})

const Carousel = ({ images, settings }) => {
	const { enabled, autoplay } = getSettings(settings)
	if (!enabled || images.length === 0) return null
	const [currentSlide, setCurrentSlide] = useState(0)
	const previous = () => {
		const prev = currentSlide - (1 % images.length)
		setCurrentSlide(prev < 0 ? images.length - 1 : prev)
	}

	const next = () => {
		setCurrentSlide((currentSlide + 1) % images.length)
	}
	return (
		<div className="carousel">
			<button className="carousel__button carousel__button--previous" onClick={previous} />
			<button className="carousel__button carousel__button--next" onClick={next} />
			<ResponsiveImage classNames="carousel__image--sizer" {...images[0]} />
			{images.map((image, index) => (
				<ResponsiveImage
					classNames={`carousel__image ${index === currentSlide ? 'carousel__image--active' : ''}`}
					key={image.url}
					{...image}
				/>
			))}
		</div>
	)
}

Carousel.propTypes = {
	settings: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired,
			url: PropTypes.string.isRequired,
			isOriginal: PropTypes.boolean,
		}),
	),
}

Carousel.defaultProps = {
	settings: '',
	images: [],
}

export default Carousel
