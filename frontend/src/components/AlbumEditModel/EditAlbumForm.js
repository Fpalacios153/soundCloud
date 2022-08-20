import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAlbum } from '../../store/albums'



const EditAlbum = () => {
    const { albumId } = useParams()
    const album = useSelector(state => state.albums[Number(albumId)])
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState(album.title)
    const [description, setDescription] = useState(album.description)
    const [imageUrl, setPreviewImage] = useState(album.previewImage)
    const [validationErrors, setValidationErrors] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const album = {
            title,
            description,
            imageUrl,

        }
        if (!title.length) {
            setValidationErrors([]);
            // history.push(`/you/library`)
            return dispatch(editAlbum(album, albumId))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log('this is DATD FROM ALBUM', data)
                    if (data && data.errors) setValidationErrors(data.errors)
                })
        }
        if (title.length) {
            setValidationErrors([]);
            history.push(`/you/library`)
            return dispatch(editAlbum(album, albumId))
        }
    }



    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    // };
    return (
        <>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
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
                        placeholder="Describe your album"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Upload Image
                    <input
                        className="Album Cover"
                        type='text'
                        value={imageUrl}
                        onChange={(e) => setPreviewImage(e.target.value)}
                    />
                </label>
                <button type="submit">Save</button>
                {/* <button onClick={handleCancelClick} type="button">Cancel</button> */}
            </form>
        </>
    )
}

export default EditAlbum
