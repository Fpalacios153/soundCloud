import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getAlbumsByCurrentUser } from '../../store/albums'

import './SelectAlbum.css'

export default function SelectUserAlbum() {
    const dispatch = useDispatch()

    const album = useSelector(state => (state.albums))

    const albums = Object.values(album)
    const [isLoaded, setIsLoaded] = useState(false);



    // const album1 = albums[0]

    useEffect(() => {
        dispatch(getAlbumsByCurrentUser()).then(() => setIsLoaded(true))
    }, [dispatch])


    return (
        <>
            <div className='allAlbum-container'>
                {albums.length > 0 && (<h2 className="allSAtitles" style={{ margin: 'auto', paddingTop: '1em' }}>Select Album to Add Song</h2>)}
                <div className='curr-album-container'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        // justifyContent: 'flex-start',
                        alignItems: 'center', paddingBottom: '10px'
                    }}>
                    {!albums.length && (
                        <>
                            <div className='no-albums-title'>

                                <div className="allSAtitles select-words">User does not have any Albums, Create one to add songs!</div>
                                {/* <h2 className="allSAtitles select-words"> Create one to add songs!</h2> */}
                            </div>
                        </>
                    )}
                    <ul>
                        <div className='album-list' >
                            {isLoaded && albums.map(album => (
                                <li key={album.id} className='album-tiles current-tiles'
                                    style={{ padding: '2em' }}                                >
                                    <NavLink to={`/albums/${album.id}`} key={album.id}>
                                        <img style={{ height: '15em', width: '15em' }} src={album.previewImage} alt={album.title} />
                                    </NavLink>
                                    <div
                                        className="overflow-title-div"
                                        style={{ fontWeight: 100, fontSize: '14px' }}>
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
