import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


import { getAlbums } from '../../../store/albums'
import './GetAlbum.css'


const AlbumBrowser = () => {
    const dispatch = useDispatch();
    const albums1 = useSelector(state => state.albums)
    const albums = Object.values(albums1)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAlbums()).then(() => setIsLoaded(true))
    }, [dispatch]);


    return (
        <>
            <div className="allAlbum-container">
                <h2 className="allSAtitles">All Albums</h2>
                <div className="album-container">
                    <ul>
                        <div className="album-list">
                            {albums.map(album => (
                                <li className='album-tiles' key={album.id}>
                                    <NavLink className='remove-line' to={`/albums/${album.id}`} key={album.id}>
                                        <img className='' style={{ height: '15em', width: '15em' }} src={album.previewImage} alt={album.title} />
                                        <div
                                            className="overflow-title-div"
                                            style={{ fontSize: '14px' }}                                      >
                                            {album.title}
                                        </div>
                                    </NavLink>
                                    <div className="overflow-title-div" style={{ fontSize: '12px' }}>
                                        {album.Artist.name}
                                    </div>
                                    <br />
                                </li>))}
                        </div>
                    </ul>
                </div>
            </div>
        </>

    )
}
export default AlbumBrowser
