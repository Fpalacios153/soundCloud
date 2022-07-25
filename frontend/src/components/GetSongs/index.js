import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import SongView from '../SongsView'


import { getSongs } from '../../store/songs'




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
            <NavLink to={`/api/songs/${song.id}`} key={song.id}>{song.title}</NavLink>
            </li>))}
        </ul>
    </div>)
}

export default SongBrowser
