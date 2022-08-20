import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


import { getAlbums } from '../../store/albums'
import './GetAlbum.css'


const AlbumBrowser = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state => Object.values(state.albums))
    // console.log("THIS IS", albums)
    useEffect(() => {
        dispatch(getAlbums())
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
                                    <NavLink to={`/api/albums/${album.id}`} key={album.id}>
                                        <img style={{ height: '10em', width: '10em' }} src={album.previewImage} alt={album.title} />
                                    </NavLink>
                                    <div style={{ fontWeight: 150, fontSize: '14px' }}>
                                        {album.title}
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
