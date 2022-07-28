import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


import{getAlbums} from '../../store/albums'


const AlbumBrowser =() =>{
    const dispatch = useDispatch();
    const albums = useSelector(state => Object.values(state.albums))
    useEffect(()=>{
        dispatch(getAlbums())
    }, [dispatch]);


    return (
        <>
        <h2>All Albums</h2>
        <div>
            <ul>
            {albums.map(album => (
                <li>
                    <NavLink to={`/api/albums/${album.id}`} key={album.id}>{album.title}</NavLink>
                </li>
            ))}
            </ul>
        </div>
        </>

    )
}
export default AlbumBrowser
