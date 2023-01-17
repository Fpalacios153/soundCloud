import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './GetSongs.css'
import { getSongs } from '../../store/songs'
import { useSongContext } from '../../context/setSongContext'
import AddSongToPlaylistModal from '../Playlist/PlaylistAddSong'
import missingImage from '../images/missingImage.png'


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
            <div className='currSong-container'>
                {sessionUser ? (
                    <h2 className="allSongs">All Songs</h2>) : null}
                <div className='song-container'>
                    <div className='song-list screen-adjustment'>
                        {song.map((song) => (
                            <div className='song-tiles' key={song.id} >
                                <div className='song-button-div'>
                                    <button className='song-button' onClick={() => setSong(song)}></button>
                                    <img className='song-image'
                                        style={{ height: '15em', width: '15em' }}
                                        src={song.previewImage}
                                        alt={song.title}
                                        onError={e => { e.currentTarget.src = missingImage }}
                                    />
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
                                    <div className="overflow-title-div" >
                                        {song.Artist.name}
                                    </div>
                                    {sessionUser ? (
                                        <AddSongToPlaylistModal songId={song.id} />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetAllSongs
