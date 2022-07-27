import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSong } from "../../store/songs";



export const EditSong =() => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setPreviewImage]= useState('')
    const [url, setSelectedFile] = useState('')
    const {songId} = useParams()

    // const user = useSelector(state => state.session.user)
const handleSubmit = async (e) =>{
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
    // e.preventDefault();
    // history.push(`/api/song/${songId}`)
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
            placeholder="Describe your track"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            />
        </label>
        <label>
            Upload Image
            <input
            className="image"
            type='text'
            value={imageUrl}
            onChange={(e)=> setPreviewImage(e.target.value)}
            />
        </label>
        <label>
            Upload a file
            <input
            className="audio"
            type='text'
            value={url}
            onChange={(e)=> setSelectedFile(e.target.value)}
            />
        </label>
        <button type="submit">Save</button>
        <button  type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
    </>
    )
}
