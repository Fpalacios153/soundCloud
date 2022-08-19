import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './GetSongs.css'
import { getOneSong, getSongs } from '../../store/songs'

const GetAllSongs = () => {
    const dispatch = useDispatch()
    const song = useSelector(state => Object.values(state.songs))
    console.log("GET ALL", song)
    useEffect(() => {
        dispatch(getSongs())

    }, [dispatch])
    return (
        <>
            <div className='allSongs-container'>
                <h2 className='allSAtitles'>All Songs</h2>
                <div className='song-container'>
                    <ul >
                        <div className='song-list'>
                            {song.map(song => (
                                <li className='song-tiles' key={song.id} >
                                    <NavLink to={`/api/songs/${song.id}`} >
                                        <img style={{ height: '10em', width: '10em' }} src={song.previewImage} alt={song.title} />

                                    </NavLink>
                                    <div style={{ fontWeight: 150, fontSize: '14px' }}>
                                        {song.title}
                                    </div>
                                    <div style={{ display: 'border-box', height: '30px', width: '160px', fontSize: '12px', margin: 0 }}>
                                        {song.description}
                                    </div>
                                    <br />
                                </li>))}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default GetAllSongs
