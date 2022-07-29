import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getSongByCurrentUser } from '../../store/songs'



export default function UsersSongs() {
    const dispatch = useDispatch()
    const [songs, setSongs] = useState('')
    const userSong = useSelector(state => Object.values(state.songs))
    // console.log(userSong)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSongByCurrentUser())
            .catch(async (res) => {
                const data = await res.json();
                console.log('THIS IS DATA', data)
                if (data) {
                    setSongs('')
                } else {
                    setSongs(userSong)
                }
            })
    }, [dispatch])


    return (
        <>
            <div>
                <h2>My Songs</h2>
                {!userSong.length && (
                    <div>User has no songs</div>
                )}
                <ul>

                    {userSong.length > 0 && userSong.map(song => (
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
