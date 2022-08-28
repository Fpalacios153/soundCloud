import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './GetSongs.css'
import { getSongs } from '../../store/songs'
import { useSongContext } from '../../context/setSongContext'

const GetAllSongs = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const songs = useSelector(state => state.songs)
    const song = Object.values(songs)
    const { setSong } = useSongContext()

    useEffect(() => {
        dispatch(getSongs()).then(() => setIsLoaded(true))

    }, [dispatch])
    return (
        <>
            <div className='allSongs-container'>
                {/* <h2 className='allSAtitles'>{title}</h2> */}
                <div className='song-container'>
                    <ul >
                        <div className='song-list'>
                            {isLoaded && song.map((song) => (
                                <div className='song-tiles' key={song.id} >
                                    <div className='song-button-div'>
                                        <button className='song-button' onClick={() => setSong(song.url)}></button>
                                        <img className='song-image' style={{ height: '13em', width: '13em' }} src={song.previewImage} alt={song.title} />
                                        <NavLink className='remove-line' to={`/api/songs/${song.id}`} >
                                            <div className="overflow-title-div" style={{ fontSize: '14px' }}>
                                                {song.title}
                                            </div>
                                        </NavLink>
                                        <div style={{ height: '30px', width: '160px', fontSize: '12px', margin: 0 }} className="overflow-title-div" >
                                            {song.Artist.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default GetAllSongs
