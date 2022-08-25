import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSong } from "../../store/songs";



export const EditSong = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { songId } = useParams()
    const song = useSelector(state => state.songs[Number(songId)])


    const [title, setTitle] = useState(song.title)
    const [description, setDescription] = useState(song.description)
    const [imageUrl, setPreviewImage] = useState(song.previewImage)
    const [url, setSelectedFile] = useState(song.url)

    // const user = useSelector(state => state.session.user)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const song = {
            title,
            description,
            imageUrl,
            url
        }

        dispatch(editSong(song, songId))
        history.push(`/you/library`)
    }


    const handleCancelClick = (e) => {
        e.preventDefault();
        // console.log(songId)
        history.push(`/api/song/${songId}`)
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className='required-field'>
                    Title
                    <input
                        type='text'
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <input
                        type='text'
                        placeholder="Describe your track"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Upload Image
                    <input
                        className="image"
                        type='text'
                        value={imageUrl}
                        onChange={(e) => setPreviewImage(e.target.value)}
                    />
                </label>
                <label>
                    Upload a file
                    <input
                        className="audio"
                        type='text'
                        value={url}
                        onChange={(e) => setSelectedFile(e.target.value)}
                    />
                </label>
                <button type="submit">Save</button>
                {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
            </form>
        </>
    )
}
