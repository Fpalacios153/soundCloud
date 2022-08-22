import { useHistory, useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { deleteAlbum } from '../../store/albums'
import { getOneAlbum } from "../../store/albums";
import './GetOneAlbum.css'
import EditModal from "../AlbumEditModel";
import CreateSongModel from "../SongCreate";


function AlbumView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const sessionUser = useSelector(state => state.session.user)

    const album = useSelector(state => state.albums[Number(albumId)])

    useEffect(() => {
        dispatch(getOneAlbum(album))
    }, [dispatch, albumId])

    // console.log(album)
    ///remember to move this to current
    const Delete = (e) => {
        e.preventDefault();
        dispatch(deleteAlbum(albumId))
        history.push('/you/library')
    }

    return (
        <>
            <div>

                <div>
                    {album && album.Songs && (
                        <div className="album-container" style={{ backgroundImage: `url('${album.previewImage}')` }}>

                            <div className="">
                                <h1>{album.title}</h1>
                                <h2>{album.Artist.name}</h2>
                                <h2>{album.description}</h2>
                            </div>


                        </div>)}
                    <div className='song-list'>
                        {album && album.Songs && album.Songs.map(song => (
                            <li className='song-tiles' key={song.id} >
                                <NavLink to={`/api/songs/${song.id}`} >
                                    <img style={{ height: '10em', width: '10em' }} src={song.previewImage} alt={song.title} />

                                </NavLink>
                                <div style={{ fontWeight: 550, fontSize: '14px' }}>
                                    {song.title}
                                </div>
                                <div style={{ display: 'border-box', height: '30px', width: '160px', fontSize: '12px', margin: 0 }}>
                                    {song.description}
                                </div>
                                <br />
                            </li>))}
                    </div>
                </div>
            </div>
            {album.Artist && sessionUser.id === album.Artist.userId && (
                <div>
                    <button onClick={Delete}>Delete</button>
                    <EditModal />
                    <CreateSongModel />
                </div>)}
        </>
    )
}

export default AlbumView
