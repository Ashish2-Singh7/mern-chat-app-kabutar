import React from 'react'

const ImageInputContainer = ({ selectedImage }) => {
    return (
        <div className='absolute bottom-14 mx-10 bg-[#364153] border-white/50 border-[1px] h-32 p-1 -right-5 rounded-md'>
            <img
                src={selectedImage}
                className='h-full object-cover'
            />
        </div>
    )
}

export default ImageInputContainer
