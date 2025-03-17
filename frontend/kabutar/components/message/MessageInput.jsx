import React, { useRef, useState } from 'react'
import { BsSend } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { FaVideo } from "react-icons/fa";

import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = ({ setImageToSend, setVideoToSend }) => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const [isDropDownVis, setIsDropDownVis] = useState(false);

    const selectedImageRef = useRef();
    const selectedVideoRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    }

    const handleImgToSendChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageToSend(reader.result);
                setIsDropDownVis(false);
            };
            reader.readAsDataURL(file);
        }
    }
    const handleVideoToSendChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setVideoToSend(reader.result);
                setIsDropDownVis(false);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                />
                <div className='absolute inset-y-0 end-0 flex items-center pe-3 space-x-3'>
                    <button type='submit' className='cursor-pointer'>
                        {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                    </button>
                    <button className='cursor-pointer' onClick={() => { setIsDropDownVis(!isDropDownVis) }}>
                        {loading ? <div className='loading loading-spinner'></div> : <FaPlus />}
                    </button>
                </div>
                {isDropDownVis && <div className="dropDown absolute w-28 h-fit p-3 space-y-2 rounded-md bg-[#1d232a] bottom-12 text-center flex flex-col right-0">
                    <div
                        className='hover:bg-white/10 rounded-md transition-all ease-in duration-150 text-sm cursor-pointer w-full p-1 flex items-center space-x-1'
                        onClick={() => { selectedImageRef.current.click() }}
                    >
                        <CiImageOn
                            className='text-lg'
                        />
                        <p>Images</p>
                    </div>
                    <div
                        className='hover:bg-white/10 rounded-md transition-all ease-in duration-150 text-sm cursor-pointer w-full p-1 flex items-center space-x-2'
                        onClick={() => { selectedVideoRef.current.click() }}
                    >
                        <FaVideo
                            className='text-sm ml-1'
                        />
                        <p>Video</p>
                    </div>
                </div>}

                <input
                    type='file'
                    hidden
                    accept="image/*"
                    ref={selectedImageRef}
                    onChange={handleImgToSendChange}
                />
                <input
                    type='file'
                    hidden
                    accept="video/*"
                    ref={selectedVideoRef}
                    onChange={handleVideoToSendChange}
                />
            </div>
        </form>
    )
}

export default MessageInput;
