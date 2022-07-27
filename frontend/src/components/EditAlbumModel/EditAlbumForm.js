import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {editAlbum} from '../../store/albums'



const EditAlbum =() => {
    const {albumId} = useParams()
    const album = useSelector(state => state.albums[Number(albumId)])
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState(album.title)
    const [description, setDescription] = useState(album.description)
    const [imageUrl, setPreviewImage]= useState(album.previewImage)

const handleSubmit = async (e) =>{
    e.preventDefault();

    const album = {
        title,
        description,
        imageUrl,

    }

    dispatch(editAlbum(album,albumId))
    history.push(`/you/library`)

}


const handleCancelClick = (e) => {
    e.preventDefault();
  };
    return(
    <>
    <form  onSubmit={handleSubmit}>
        <label className='required-field'>
            Title
            <input
            type='text'
            placeholder="Title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            />
        </label>
        <label>
            Description
            <input
            type='text'
            placeholder="Describe your album"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            />
        </label>
        <label>
            Upload Image
            <input
            className="Album Cover"
            type='text'
            value={imageUrl}
            onChange={(e)=> setPreviewImage(e.target.value)}
            />
        </label>
        <button type="submit">Save</button>
        <button onClick={handleCancelClick} type="button">Cancel</button>
    </form>
    </>
    )
}

export default EditAlbum
