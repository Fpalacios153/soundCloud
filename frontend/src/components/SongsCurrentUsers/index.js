import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getSongByCurrentUser } from '../../store/songs'
import { useSongContext } from '../../context/setSongContext'
import missingImage from '../images/missingImage.png'

import './CurrentSongs.css'
import AddSongToPlaylistModal from '../Playlist/PlaylistAddSong'



export default function UsersSongs() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const song = useSelector(state => (state.songs))
    const songs = Object.values(song)
    const { setSong } = useSongContext()



    useEffect(() => {
        dispatch(getSongByCurrentUser()).then(() => setIsLoaded(true))

    }, [dispatch])
    // const sessionUser = useSelector(state => state.session.user)
    // const [validationErrors, setValidationErrors] = useState([])
    // sessionUser.id === song.Artist.userId &&
    // useEffect(() => {
    //     if (!isLoaded) {
    //         dispatch(getSongByCurrentUser())
    //             .catch(async (res) => {
    //                 const data = await res.json();
    //                 if (data && data[0].message) setValidationErrors(data[0].message)
    //             })
    //     }
    // }, [])
    // useEffect(() => {
    //     if (validationErrors.length < 0) {
    //         setIsLoaded(true)
    //     }
    // }, [validationErrors])
    return (
        <>
            <div className='currSong-container'>
                <h2 className='allSAtitles'>My Songs</h2>
                {isLoaded && !songs.length && (
                    <div className='current-titles'>User has no Songs</div>
                )}
                <div className='song-container'>
                    <div className='song-list'>
                        {isLoaded && songs.length > 0 && songs.map(song => (
                            <div className='song-tiles' key={song.id} >
                                <div className='song-button-div'>
                                    <button className='song-button' onClick={() => setSong(song)}></button>
                                    <img className='song-image'
                                        style={{ height: '15em', width: '15em' }}
                                        onError={e => { e.currentTarget.src = missingImage }}
                                        src={song.previewImage} alt={song.title} />
                                    <NavLink className='remove-line' to={`/songs/${song.id}`} >
                                        <div className="overflow-title-div" style={{ fontWeight: 100, fontSize: '14px' }}>
                                            {song.title}
                                        </div>
                                    </NavLink>
                                    <div className="overflow-title-div" style={{ fontWeight: 150, fontSize: '12px' }}>
                                        {song.Album.title}
                                    </div>
                                    <AddSongToPlaylistModal songId={song.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}
