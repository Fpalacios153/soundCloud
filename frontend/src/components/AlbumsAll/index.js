import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


import { getAlbums } from '../../store/albums'
import './GetAlbum.css'


const AlbumBrowser = () => {
    const dispatch = useDispatch();
    const albums1 = useSelector(state => state.albums)
    const albums = Object.values(albums1)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAlbums()).then(() => setIsLoaded(true))
    }, [dispatch]);
    console.log(albums)


    return (
        <>
            <div className="allAlbum-container">
                <h2 className="allSAtitles">All Albums</h2>
                <div className="album-container">
                    <ul>
                        <div className="album-list">
                            {isLoaded && albums.map(album => (
                                <li className='album-tiles' key={album.id}>
                                    <NavLink to={`/api/albums/${album.id}`} key={album.id}>
                                        <img className='' style={{ height: '12em', width: '13em' }} src={album.previewImage} alt={album.title} />
                                        <div style={{ fontWeight: 150, fontSie: '14px' }}>
                                            {album.title}
                                        </div>
                                    </NavLink>
                                    <div style={{ fontWeight: 150, fontSize: '12px' }}>
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
