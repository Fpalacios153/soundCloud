import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAlbumsByCurrentUser } from '../../store/albums'
import './CurrentAlbums.css'

export default function UsersAlbums() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const albums = useSelector(state => Object.values((state.albums)))
    useEffect(() => {
        dispatch(getAlbumsByCurrentUser()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <>

            <div>
                <h2>My Albums</h2>

                {!albums.length && (
                    <div>User has no Albums</div>
                )}
                <ul>
                    {isLoaded && albums.length > 0 && albums.map(album => (
                        <li key={album.id}>
                            <NavLink to={`/api/albums/${album.id}`} key={album.id}>
                                {album.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )


}
