import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSongContext } from '../../context/setSongContext';
import './AudioPlayer.css'

function AudioPlayer() {
    const { song } = useSongContext()

    return (
        <div className='audio-container'
        // style={{
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        // width: '100%',
        // position: 'sticky'
        // }}
        >
            <ReactAudioPlayer
                style={{ width: '100%', borderRadius: '0px' }}
                src={song}
                controls
                autoPlay
            />
        </div>
    )
}

export default AudioPlayer
