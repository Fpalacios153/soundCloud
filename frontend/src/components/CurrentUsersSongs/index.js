import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getSongByCurrentUser } from '../../store/songs'



export default function UsersSongs() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [song, setSong] = useState('')

    useEffect(() => {
        dispatch(getSongByCurrentUser()).then(() => setIsLoaded(true))

    }, [dispatch])

    const songs = useSelector(state => Object.values(state.songs))
    console.log(songs)

    return (
        <>
            <div>
                <h2>My Songs</h2>
                {isLoaded && !songs.length && (
                    <div>User has no songs</div>
                )}
                <ul>

                    {isLoaded && songs.length > 0 && songs.map(song => (
                        <li key={song.id}>
                            <NavLink to={`/api/songs/${song.id}`} key={song.id}
                            // style={{backgroundImage: `url(${song.previewImage})`}}
                            >{song.title}</NavLink>
                        </li>))}
                </ul>
            </div>
        </>
    )

}
