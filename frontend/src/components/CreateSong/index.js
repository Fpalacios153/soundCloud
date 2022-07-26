import { createSong } from "../../store/songs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";



export const CreateSongg =() => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage]= useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

const handleSubmit = async (e) =>{
    e.preventDefault();

    const song = {
        title,
        description,
        image,
        selectedFile
    }

    dispatch(createSong(song))
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
            placeholder="Describe your track"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            />
        </label>
        <button>
            Upload Image
            <input
            className="image"
            type='file'
            value={image}
            onChange={(e)=> setImage(e.target.files[0])}
            />
        </button>
        <label>
            Upload a file
            <input
            className="audio"
            type='file'
            value={selectedFile}
            onChange={(e)=> setSelectedFile(e.target.files[0])}
            />
        </label>
        <button type="submit">Save</button>
        <button onClick={handleCancelClick} type="button">Cancel</button>
    </form>
    </>
    )
}
