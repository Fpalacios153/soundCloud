import { useHistory, useParams } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { useEffect  } from "react";

import { getOneAlbum } from "../../store/albums";
import './GetOneAlbum.css'


function AlbumView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {albumId} = useParams();

    const album = useSelector(state => state.albums[Number(albumId)])
    console.log(album)

    useEffect(()=>{
        dispatch(getOneAlbum(album))
    },[dispatch, albumId])


    return (
        <>
        <div className="album-container">
            {album && (
                <div>
                    <h1>{album.title}</h1>
                    <h2>{album.description}</h2>
                    <h2>{album.previewImage}</h2>
                </div>
            )}
        </div>
        </>
    )
}

export default AlbumView
