import { useHistory, useParams } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { useEffect  } from "react";
import {deleteAlbum} from '../../store/albums'
import { getOneAlbum } from "../../store/albums";
import './GetOneAlbum.css'
import EditModal from "../EditAlbumModel";


function AlbumView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {albumId} = useParams();
    // console.log('apple', albumId)

    const album = useSelector(state => state.albums[Number(albumId)])
    // console.log(album[0])

    useEffect(()=>{
        dispatch(getOneAlbum(album))
    },[dispatch, albumId])
    // console.log(album.Songs)


    ///remember to move this to current
    const Delete = (e)=>{
        e.preventDefault();
        dispatch(deleteAlbum(albumId))
    }

    return (
        <>

        {album  && album.Songs && (
        <div className="album-container"style={{backgroundImage: `url('${album.previewImage}')`}}>

                <div className="album-list">
                    <h1>{album.title}</h1>
                    <h2>{album.description}</h2>
                    <ul>
                    {album.Songs.map(song=> (
                        <li key={song.id}>{song.title}</li>
                    ))}
                    </ul>
                </div>
                <button onClick={Delete}>Delete</button>
                <EditModal/>
            </div>
            )}


        </>
    )
}

export default AlbumView
