import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Avatar from '../components/Avatar'
import Squiggle from '../components/Squiggle'
import Icon from '../components/Icon'
import { ScrollableChild } from '../UI/Scroll'
import { markdownToJSX } from '../utils/text'
import { mbolinks } from '../constants'

/**
 * ChoreographerSocial
 */

const ChoreographerSocial = ({ accounts }) => {
  if (accounts === '') return null

  const { facebook, instagram, twitter } = accounts[0]
  return (
    <div className="profile__socials">
      {facebook !== '' ? (
        <div className="profile__social">
          <a href={facebook} target="_blank">
            <Icon glyph="facebook" />
          </a>
        </div>
      ) : null}

      {instagram !== '' ? (
        <div className="profile__social">
          <a href={/https?/.test(instagram) ? instagram : `https://www.instagram.com/${instagram}`} target="_blank">
            <Icon glyph="instagram" />
          </a>
        </div>
      ) : null}

      {twitter !== '' ? (
        <div className="profile__social">
          <a href={twitter} target="_blank">
            <Icon glyph="twitter" />
          </a>
        </div>
      ) : null}
    </div>
  )
}

const ChoreographerProfile = props => {
  const bioBody = markdownToJSX(props.bio)

  const expectationsBody = markdownToJSX(props.expectations)

  const quote = props.quote.body ? (
    <h4 className="profile__quote">
      “{props.quote.body}” —&nbsp;<span className="citation">{props.quote.citation}</span>
    </h4>
  ) : null

  const website =
    props.biolink && props.biolink.length ? (
      <h5 className="profile__website">
        <a href={props.biolink}>{props.biolinktext.length ? props.biolinktext : props.biolink.replace(/https?:\/\//, '')}</a>
      </h5>
    ) : null
  const musicians = props.musicians.length ? props.musicians.split(',') : []
  const classtypes = props.classtypes.length ? props.classtypes.split(',') : []

  return (
    <ScrollableChild autoScroll={props.autoScroll} slug={`profile-${props.slug}`}>
      <div className="profile" id={props.slug}>
        <div className="profile__top column column--wide">
          <div className="profile__title">
            <h2 className="profile__name">{props.title}</h2>
            <ChoreographerSocial accounts={props.social} />
          </div>
          <div className="profile__photo">
            <Avatar autoPlay choreographer={props} ratio={0.85} />
          </div>
          <div className="profile__bio">
            {quote}
            <div className="profile__bio__body">{bioBody}</div>
            {website}
          </div>
        </div>
        <div className="profile__bottom column column--wide">
          <div className="profile__classes">
            <div className="profile__bottom__title">
              <h4>Classes</h4>
              <Squiggle num={0} />
            </div>
            <div className="profile__bottom__content">
              {classtypes.map(classType => (
                <p key={classType}>{classType}</p>
              ))}
              <div className="profile__cta">
                <p className="profile__link">
                  <a href={mbolinks.schedule} target="_blank" rel="noopener noreferrer">
                    View Schedule
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="profile__expectations">
            <div className="profile__bottom__title">
              <h4>Expectations</h4>
              <Squiggle num={1} />
            </div>
            <div className="profile__bottom__content">{expectationsBody}</div>
          </div>
          <div className="profile__playlist">
            <div className="profile__bottom__title">
              <h4>Playlist</h4>
              <Squiggle num={3} />
            </div>
            <div className="profile__bottom__content">
              {musicians.map(artist => (
                <p key={artist}>{artist}</p>
              ))}
              {props.spotify_playlist ? (
                <p className="profile__link">
                  <a href={props.spotify_playlist}>View Playlist</a>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ScrollableChild>
  )
}

ChoreographerProfile.propTypes = {
  biolink: PropTypes.string,
  biolinktext: PropTypes.string,
  bio: PropTypes.string,
  slug: PropTypes.string.isRequired,
  expectations: PropTypes.string,
  autoscroll: PropTypes.bool,
  quote: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      body: PropTypes.string,
      citation: PropTypes.string,
    }),
  ]),
  classtypes: PropTypes.string,
  cover: PropTypes.shape({
    sizes: PropTypes.string,
    srcset: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]),
  }).isRequired,
  social: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        facebook: PropTypes.string,
        instagram: PropTypes.string,
        twitter: PropTypes.string,
      }),
    ),
  ]),
  musicians: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  spotify_playlist: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

ChoreographerProfile.defaultProps = {
  bio: '',
  biolink: '',
  biolinktext: '',
  expectations: '',
  quote: '',
  social: '',
  musicians: false,
  spotify_playlist: false,
  classtypes: '',
  autoscroll: false,
}

export default ChoreographerProfile
