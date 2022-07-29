import ReactAudioPlayer from 'react-audio-player';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function AudioPlayer() {
    // const [song, setSong] = useState()
    const { songId } = useParams()
    const song = useSelector(state => state.songs)
    console.log(song)

    return (
        <div>
            <ReactAudioPlayer
                src="so"
                controls
            />
        </div>
    )
}

export default AudioPlayer
