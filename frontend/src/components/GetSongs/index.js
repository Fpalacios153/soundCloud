import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


import { getSongs } from '../../store/songs'
import { CreateSongg } from '../CreateSong'




const SongBrowser = () => {
    const dispatch =useDispatch()
    const song = useSelector(state => Object.values(state.songs))
    useEffect(()=> {
     dispatch(getSongs())

    }, [dispatch])
    return (
    <div>
        <ul>
            {song.map(song=> (
            <li key={song.id}>
            <NavLink to={`/api/songs/${song.id}`} key={song.id}
            // style={{backgroundImage: `url(${song.previewImage})`}}
            >{song.title}</NavLink>
            </li>))}
        </ul>
    </div>)
}

export default SongBrowser
