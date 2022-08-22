import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './GetSongs.css'
import { getSongs } from '../../store/songs'

const GetAllSongs = ({ setSong, title }) => {
    const dispatch = useDispatch()

    const songs = useSelector(state => state.songs)
    const song = Object.values(songs)
    // const [title, setTitle] = useState('All Songs')

    useEffect(() => {
        dispatch(getSongs())

    }, [dispatch])
    // console.log(song)
    return (
        <>
            <div className='allSongs-container'>
                <h2 className='allSAtitles'>{title}</h2>
                <div className='song-container'>
                    <ul >
                        <div className='song-list'>
                            {song.map((song) => (
                                <li className='song-tiles' key={song.id} >
                                    <button onClick={() => setSong(song.url)}>
                                        <img style={{ height: '11em', width: '11em' }} src={song.previewImage} alt={song.title} />
                                    </button>
                                    <NavLink to={`/api/songs/${song.id}`} >
                                        <div style={{ fontWeight: 150, fontSize: '14px' }}>
                                            {song.title}
                                        </div>
                                    </NavLink>
                                    <div style={{ display: 'border-box', height: '30px', width: '160px', fontSize: '12px', margin: 0 }}>
                                        {song.Artist.name}
                                    </div>
                                </li>))}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default GetAllSongs