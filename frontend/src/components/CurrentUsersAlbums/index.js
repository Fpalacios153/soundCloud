import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAlbumsByCurrentUser } from '../../store/albums'

export default function UsersAlbums() {
    const dispatch = useDispatch()
    const [albums, setAlbums] = useState('')

    // setAlbums(useSelector(state => Object.values((state.albums))))
    useEffect(() => {
        dispatch(getAlbumsByCurrentUser())
            .catch(async (res) => {
                const data = await res.json();
                console.log('THIS IS DATA', data)
                if (data) {
                    setAlbums('')
                }
            })
    }, [dispatch])
    const Useralbums = useSelector(state => Object.values((state.albums)))

    console.log('This is USERALBUM',)




    return (
        <>
            <div>
                <h2>My Albums</h2>
                {!Useralbums.length && (
                    <div>User has no Albums</div>
                )}
                <ul>
                    {Useralbums.length > 0 && Useralbums.map(album => (
                        <li key={album.id}>
                            <NavLink to={`/api/albums/${album.id}`} key={album.id}>{album.title}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )


}
