import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
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
    if (!album && album.Songs) return null
    return (
        <>
            <div className="detail-container">
                <div>
                    {album && album.Songs && (
                        <div className="album-background">
                            <div>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10px' }}>
                                    <div style={{ paddingLeft: '1em' }}>
                                        <h1 className="album-detail-title">{album.title}</h1>
                                        {/* maybe add Navlink back to album */}
                                        <h3 className="album-detail-name">{album.Artist.name}</h3>
                                    </div>
                                    <div className="album-image-container">
                                        <img src={album.previewImage} alt={album.title} style={{ width: '26em', height: '26em', }} />
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    {album.Artist && sessionUser.id === album.Artist.userId && (
                        <div>
                            <button onClick={Delete}>Delete</button>
                            <EditModal />
                            <CreateSongModel />
                        </div>)}
                    <div style={{ display: 'flex', justifyContent: "start", width: '75%' }}>
                        {album && album.Songs && (<h2 style={{ padding: '0px 10px' }}>{album.Artist.name}</h2>)}
                        <p style={{ paddingLeft: '3em', flexWrap: 'wrap', width: '70%', height: 'auto' }}>{album.description} </p>
                    </div>
                    <div >
                        <table className='song-list-table'>
                            <tbody>
                                {album && album.Songs && album.Songs.map((song, i) => (
                                    <tr key={song.id} >
                                        <td>
                                            <button onClick={() => setSong(song.url)}>
                                                <img style={{ height: '3em', width: '3em' }} src={song.previewImage} alt={song.title} />
                                            </button>
                                        </td>
                                        <Link className='link-to-song' to={`/api/songs/${song.id}`} >
                                            <td className="centered">{`${i + 1}  `}</td>
                                            <td className="centered">{song.title}</td>
                                        </Link>
                                    </tr>

                                ))}
                            </tbody>
                        </table>


                        <div style={{ fontWeight: 150, fontSize: '14px' }}>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AlbumView
