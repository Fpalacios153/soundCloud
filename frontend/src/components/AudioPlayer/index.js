import ReactAudioPlayer from 'react-audio-player';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './AudioPlayer.css'
import { getOneSong } from '../../store/songs';

function AudioPlayer({ song }) {
    // const [song, setSong] = useState()
    const { songId } = useParams()
    console.log(song?.url)
    // const song = useSelector(state => state.songs)
    // console.log(song)
    // useEffect(() => {
    //     dispatchEvent(getOneSong(song))
    // })
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <ReactAudioPlayer
                src={song?.url}
                controls
            />
        </div>
    )
}

export default AudioPlayer
