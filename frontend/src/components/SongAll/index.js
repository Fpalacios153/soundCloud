import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './GetSongs.css'
import { getSongs } from '../../store/songs'
import { useSongContext } from '../../context/setSongContext'
import AddSongToPlaylistModal from '../Playlist/PlaylistAddSong'

const GetAllSongs = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user)


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
                            {song.map((song) => (
                                <div className='song-tiles' key={song.id} >
                                    <div className='song-button-div'>
                                        <button className='song-button' onClick={() => setSong(song)}></button>
                                        <img className='song-image' style={{ height: '15em', width: '15em' }} src={song.previewImage} alt={song.title} />
                                        {sessionUser ? (
                                            <NavLink className='remove-line' to={`/songs/${song.id}`} >
                                                <div className="overflow-title-div" style={{ fontSize: '14px' }}>
                                                    {song.title}
                                                </div>
                                            </NavLink>) :
                                            // <div onClick={() => setSong(song)} >
                                            <div className="overflow-title-div" style={{ fontSize: '14px' }}>
                                                {song.title}
                                            </div>
                                            // </div>

                                        }
                                        <div style={{ height: '30px', width: '160px', fontSize: '12px', margin: 0 }} className="overflow-title-div" >
                                            {song.Artist.name}
                                        </div>
                                        <AddSongToPlaylistModal songId={song.id} />
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
