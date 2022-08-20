import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAlbumsByCurrentUser } from '../../store/albums'
import './SelectAlbum.css'

export default function SelectUserAlbum() {
    const dispatch = useDispatch()
    const albums = useSelector(state => Object.values((state.albums)))
    const [isLoaded, setIsLoaded] = useState(false);



    // const album1 = albums[0]

    useEffect(() => {
        dispatch(getAlbumsByCurrentUser()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <>
            <div className='upload-container'>
                <h2>Select Album to Add Song</h2>
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
