import React from 'react'
import PropTypes from 'prop-types'
import ResponsiveImage from './ResponsiveImage'
import { cn } from '../utils/helpers'

class CoverVideo extends React.Component {
	constructor(props) {
		super(props)
		this.playVideo = this.playVideo.bind(this)
		this.stopVideo = this.stopVideo.bind(this)
		this.state = {
			playing: false,
		}
	}

	componentDidMount() {
		if (this.video && this.props.playOnHover) {
			this.container.addEventListener('mouseenter', this.playVideo)
			this.container.addEventListener('mouseleave', this.stopVideo)
		}
		if (this.props.autoPlay && this.video) this.playVideo()
	}

	componentWillUnmount() {
		if (this.video && this.props.playOnHover) {
			this.container.removeEventListener('mouseenter', this.playVideo)
			this.container.removeEventListener('mouseleave', this.stopVideo)
		}
	}

	playVideo() {
		this.video
			.play()
			.then(() => {
				this.setState({ playing: true })
			})
			.catch(e => {
				console.log(e)
			})
	}

	stopVideo() {
		this.setState({ playing: false })
		this.video.pause()
	}

	renderVideo() {
		if (!this.props.videoSrc) return null
		return (
			<video
				ref={element => {
					this.video = element
				}}
				autoPlay={this.props.autoPlay}
				src={this.props.videoSrc}
				playsInline
				webkit-playsinline="true"
				muted
				loop
			/>
		)
	}

	render() {
		const classNames = ['avatar']
		if (this.state.playing) classNames.push('avatar--playing')
		return (
			<div
				ref={element => {
					this.container = element
				}}
				className={cn(classNames, this.props.classNames)}
			>
				<div className="avatar__padding" style={{ paddingBottom: `${this.props.ratio * 100}%` }} />
				{this.renderVideo()}
				<ResponsiveImage {...this.props.image} />
			</div>
		)
	}
}

CoverVideo.propTypes = {
	classNames: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	ratio: PropTypes.number,
	autoPlay: PropTypes.bool,
	playOnHover: PropTypes.bool,
	videoSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	image: PropTypes.shape({
		sizes: PropTypes.string,
		srcset: PropTypes.arrayOf(PropTypes.object),
		meta: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]),
	}).isRequired,
}

CoverVideo.defaultProps = {
	classNames: [],
	autoPlay: false,
	ratio: 0.56,
	videoSrc: false,
	playOnHover: true,
}

export default CoverVideo
