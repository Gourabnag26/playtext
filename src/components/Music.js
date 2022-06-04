import React from 'react'
import ReactAudioPlayer from 'react-audio-player';
const Music = () => {
  return (
    <ReactAudioPlayer
    src="http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
    autoPlay
    controls
  />
  )
}

export default Music
