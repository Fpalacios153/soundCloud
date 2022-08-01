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
    console.log('TTTTTT', albums)

    return (
        <>

            <div className='currAlbums-container'>
                <h2 className='allSAtitles'>My Albums</h2>
                {!albums.length && (
                    <div>User has no Albums</div>
                )}
                <div className='album-container'>
                    <ul>
                        <div className='album-list'>
                            {isLoaded && albums.length > 0 && albums.map(album => (
                                <li key={album.id} className='curralbum-tiles' >
                                    <NavLink to={`/api/albums/${album.id}`} key={album.id}>
                                        <img style={{ height: '10em', width: '10em' }} src={album.previewImage} alt={album.title} />
                                    </NavLink>
                                    <div style={{ fontWeight: 100, fontSize: '14px' }}>
                                        {album.title}
                                    </div>
                                </li>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )


}
