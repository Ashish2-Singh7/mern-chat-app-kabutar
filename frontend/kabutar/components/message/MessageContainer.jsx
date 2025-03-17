import React, { useEffect, useRef, useState } from 'react';

import Messages from './Messages';
import MessageInput from './MessageInput';

import { TiMessages } from 'react-icons/ti';
import { FaPlus } from "react-icons/fa";

import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import ImageInputContainer from './ImageInputContainer';
import useSelectedImage from '../../zustand/useSelectedImage';
import VideoInputContainer from './VideoInputContainer';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { ImageToSend, setImageToSend, chatBgImage, setChatBgImage } = useSelectedImage();
    const chatBgImageRef = useRef();
    const [VideoToSend, setVideoToSend] = useState(null);


    // RUNS ON COMPONENT DISMOUNTING TO RESET THE SELECTEDCONVERSATION STATE
    useEffect(() => {
        // cleanup function (unmounts)
        return () => {
            setSelectedConversation(null);
        };
    }, [setSelectedConversation]);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setChatBgImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <div className='h-full flex flex-col'>
                    <img
                        src={!chatBgImage ? "/chatBgImage.jpg" : chatBgImage}
                        alt=""
                        className='object-cover w-[450px] h-full absolute z-[-1] opacity-30'
                    />
                    <input
                        type='file'
                        hidden
                        accept="image/*"
                        ref={chatBgImageRef}
                        onChange={handleImgChange}
                    />
                    {/* HEADER */}
                    <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center'>
                        <div><span className='label-text'>To: </span><span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span></div>
                        <div>
                            <button className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
                                <FaPlus className='text-xs' />
                            </button>

                            <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                                popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */}>
                                <li><a onClick={() => { chatBgImageRef.current.click() }}>Add background Image</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col h-full'>
                        <Messages />
                        {ImageToSend && <ImageInputContainer selectedImage={ImageToSend} />}
                        {VideoToSend && <VideoInputContainer selectedVideo={VideoToSend} />}
                        <MessageInput setImageToSend={setImageToSend} setVideoToSend={setVideoToSend} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MessageContainer

const NoChatSelected = () => {
    const { authUser } = useAuthContext()
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {authUser.fullName} ❄️</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
}
