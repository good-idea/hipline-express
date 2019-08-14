import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
        console.warn('Error playing video:')
        console.warn(e)
      })
  }

  stopVideo() {
    this.setState({ playing: false })
    this.video.pause()
  }

  render() {
    const classNames = ['avatar']
    if (this.state.playing) classNames.push('avatar--playing')
    const { cover, coverVideo, slug } = this.props.choreographer
    return (
      <div
        ref={element => {
          this.container = element
        }}
        className={cn(classNames, this.props.classNames)}
      >
        <Link to={`/#${slug}`} href={`/#${slug}`}>
          <div className="avatar__padding" style={{ paddingBottom: `${this.props.ratio * 100}%` }} />
          {coverVideo ? (
            /* eslint-disable jsx-a11y/media-has-caption */
            <video
              ref={element => {
                this.video = element
              }}
              autoPlay={this.props.autoPlay}
              src={coverVideo}
              playsInline
              webkit-playsinline="true"
              muted
              loop
            />
          ) : null}
          <ResponsiveImage {...cover} />
        </Link>
      </div>
    )
  }
}

CoverVideo.propTypes = {
  classNames: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  ratio: PropTypes.number,
  autoPlay: PropTypes.bool,
  playOnHover: PropTypes.bool,
  choreographer: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    coverVideo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    cover: PropTypes.shape({
      sizes: PropTypes.string,
      srcset: PropTypes.arrayOf(PropTypes.object),
      meta: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]),
    }).isRequired,
  }).isRequired,
}

CoverVideo.defaultProps = {
  classNames: [],
  autoPlay: false,
  ratio: 0.56,
  playOnHover: true,
}

export default CoverVideo
