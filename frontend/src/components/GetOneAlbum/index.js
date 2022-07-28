import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { deleteAlbum } from '../../store/albums'
import { getOneAlbum } from "../../store/albums";
import './GetOneAlbum.css'
import EditModal from "../EditAlbumModel";
import CreateSongModel from "../CreateSong";


function AlbumView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    console.log('userID', sessionUser.id)

    const album = useSelector(state => state.albums[Number(albumId)])
    console.log('Aritst id', album.Artist)

    useEffect(() => {
        dispatch(getOneAlbum(album))
    }, [dispatch, albumId])


    ///remember to move this to current
    const Delete = (e) => {
        e.preventDefault();
        dispatch(deleteAlbum(albumId))
    }

    return (
        <>

            {album && album.Songs && (
                <div className="album-container" style={{ backgroundImage: `url('${album.previewImage}')` }}>

                    <div className="album-list">
                        <h1>{album.title}</h1>
                        <h2>{album.description}</h2>
                        <ul>
                            {album.Songs.map(song => (
                                <li key={song.id}>{song.title}</li>
                            ))}
                        </ul>
                    </div>

                    {album.Artist && sessionUser.id === album.Artist.userId && (<div>
                        <button onClick={Delete}>Delete</button>
                        <EditModal />
                        <CreateSongModel />
                    </div>
                    )}

                </div>
            )}


        </>
    )
}

export default AlbumView
