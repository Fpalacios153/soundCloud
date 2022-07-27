import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAlbumsByCurrentUser } from '../../store/albums'

export default function UsersAlbums() {
    const dispatch =useDispatch()
    const albums = useSelector(state => Object.values((state.albums)))
    console.log('NEW',albums)
    console.log('another', albums[0])

    const album1 = albums[0]

    useEffect(()=>{
        dispatch(getAlbumsByCurrentUser())
    },[dispatch])

    return (
        <>
        <div>
            <ul>
                {albums.length > 0 && albums.map(album =>(
                    <li key={album.id}>
                        <NavLink to={`/api/albums/${album.id}`} key={album.id}>{album.title}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )


}
