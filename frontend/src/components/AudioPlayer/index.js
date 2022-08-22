import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './AudioPlayer.css'

function AudioPlayer({ song }) {
    console.log('SONGINAUDO', song)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}>
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
