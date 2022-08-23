import { useHistory, useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { deleteAlbum } from '../../store/albums'
import { getOneAlbum } from "../../store/albums";
import './GetOneAlbum.css'
import EditModal from "../AlbumEditModel";
import CreateSongModel from "../SongCreate";
import { useSongContext } from "../../context/setSongContext";


function AlbumView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[Number(albumId)])
    const { setSong } = useSongContext()

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
                    {album.Artist && sessionUser.id === album.Artist.userId && (
                        <div>
                            <button onClick={Delete}>Delete</button>
                            <EditModal />
                            <CreateSongModel />
                        </div>)}
                    <div className='song-list'>
                        {album && album.Songs && album.Songs.map((song, i) => (
                            <li className='song-tiles songInAlbums' key={song.id} >
                                <button onClick={() => setSong(song.url)}>
                                    <img style={{ height: '10em', width: '10em' }} src={song.previewImage} alt={song.title} />
                                </button>
                                <NavLink to={`/api/songs/${song.id}`} >
                                    <div style={{ fontWeight: 150, fontSize: '14px' }}>
                                        <span>{`${i + 1}  `} </span> {song.title}
                                    </div>
                                </NavLink>
                            </li>))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlbumView
