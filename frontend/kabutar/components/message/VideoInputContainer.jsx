import React from 'react'

const VideoInputContainer = ({ selectedVideo}) => {
    return (
        <div className='absolute bottom-14 mx-10 max-w-[400px] bg-[#364153] border-white/50 border-[1px] h-64 p-1 -right-5 rounded-md'>
            <video
                src={selectedVideo}
                controls
                className='h-full object-cover'
            />
        </div>
    )
}

export default VideoInputContainer
