import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

const ImageInputContainer = ({ selectedImage, setImageToSend }) => {
    return (
        <div className='absolute bottom-14 mx-10 bg-[#364153] border-white/50 border-[1px] h-32 p-1 -right-5 rounded-md'>

            <IoIosCloseCircle
                className='absolute -right-2 -top-2 text-3xl cursor-pointer bg-black rounded-full'
                onClick={()=>{setImageToSend(null)}}
            />
            <img
                src={selectedImage}
                className='h-full object-cover'
            />
        </div>
    )
}

export default ImageInputContainer
