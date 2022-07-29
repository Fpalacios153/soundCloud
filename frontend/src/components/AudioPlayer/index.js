import ReactAudioPlayer from 'react-audio-player';
import React from 'react';


function AudioPlayer() {

    return (
        <div>
            <ReactAudioPlayer
                src="https://res.cloudinary.com/fpalacios153/video/upload/v1659048867/Symphony_No.6_1st_movement_y2via3.mp3"
                controls
            />
        </div>
    )
}

export default AudioPlayer