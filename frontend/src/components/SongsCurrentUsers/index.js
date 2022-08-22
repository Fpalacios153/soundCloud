import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getSongByCurrentUser } from '../../store/songs'
import './CurrentSongs.css'



export default function UsersSongs() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const song = useSelector(state => (state.songs))
    const songs = Object.values(song)
    const sessionUser = useSelector(state => state.session.user)

    // sessionUser.id === song.Artist.userId &&
    console.log(songs)


    // √song && song.Artist && sessionUser.id === song.Artist.userId &&
    // const [song, setSong] = useState('')

    useEffect(() => {
        dispatch(getSongByCurrentUser()).then(() => setIsLoaded(true))

    }, [dispatch])

    return (
        <>
            <div className='currSong-container'>
                <h2 className='allSAtitles'>My Songs</h2>
                {isLoaded && !songs.length && (
                    <div>User has no songs</div>
                )}
                <div className='song-container'>
                    <ul>
                        <div className='song-list .wrap'>

                            {isLoaded && songs.length > 0 && songs.map(song => (
                                <li key={song.id}>
                                    <NavLink className='song-tiles' to={`/api/songs/${song.id}`} key={song.id}>
                                        <img style={{ height: '10em', width: '10em' }} src={song.previewImage} alt={song.title} />
                                    </NavLink>
                                    <div style={{ fontWeight: 100, fontSize: '14px' }}>
                                        {song.title}
                                    </div>
                                </li>))}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )

}
