import React from 'react'
import PropTypes from 'prop-types'

export interface IYoutubeFrame {
  embedId: string
}

export function exception3() {
  try {
      const a = JSON.parse("value")
  } catch (error) {
      //antipattern: reassign error
      error = { 'value': 2 }
      console.error(error)
  }
}

const YoutubeFrame = ({ embedId }: IYoutubeFrame) => (
  <div className="video-responsive">
    <iframe
      width="100%"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
)

YoutubeFrame.propTypes = {
  embedId: PropTypes.string.isRequired,
}

export default YoutubeFrame
