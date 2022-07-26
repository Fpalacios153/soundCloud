import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getSongByCurrentUser} from '../../store/songs'



export default function   UsersSongs() {
    const dispatch = useDispatch()
    const songs = useSelector(state => Object.values(state.songs))

    useEffect(()=>{
        dispatch(getSongByCurrentUser())
    },[dispatch])
    return (
    <>
    <div>
        <ul>
            {songs.map(song=> (
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
