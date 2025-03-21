import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

const VideoInputContainer = ({ selectedVideo, setVideoToSend }) => {
    return (
        <div className='absolute bottom-14 mx-10 max-w-[400px] bg-[#364153] border-white/50 border-[1px] h-64 p-1 -right-5 rounded-md'>

            <IoIosCloseCircle
                className='absolute -right-2 -top-2 text-3xl cursor-pointer bg-black rounded-full'
                onClick={() => { setVideoToSend(null) }}
            />

            <video
                src={selectedVideo}
                controls
                className='h-full object-cover'
            />
        </div>
    )
}

export default VideoInputContainer
