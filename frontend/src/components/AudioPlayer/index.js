import React from 'react';
// import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSongContext } from '../../context/setSongContext';
import './AudioPlayer.css'

function AudioPlayers() {
    const { song } = useSongContext()

    return (
        <div className='audio-container'>
            <AudioPlayer
                autoPlay
                src={song}
                onPlay={e => console.log("onPlay")}
            // other props here
            />
        </div>
    )
}

export default AudioPlayers

// style={{
// display: 'flex',
// flexDirection: 'column',
// justifyContent: 'flex-end',
// width: '100%',
// position: 'sticky'
// }}

{/* <ReactAudioPlayer
                className='footer'
                style={{ width: '100%', borderRadius: '0px' }}
                src={song}
                controls
                autoPlay
            /> */}
