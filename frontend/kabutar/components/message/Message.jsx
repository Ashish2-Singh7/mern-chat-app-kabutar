import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const formattedTime = extractTime(message.createdAt);
    const shakeClass = message.shouldShake ? "shake" : "";
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={profilePic}
                    />
                </div>
            </div>
            {(fromMe && message.message && message.media?.mediaUrl) ? (<div className='chat chat-end mr-0'>
                {message.message && <div className={`chat-bubble max-w-[250px] text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>}
                {message.media?.mediaType === "image" && (
                    <div className="w-52 rounded bg-[#364153] border-[#2d323b] border">
                        <img src={message.media?.mediaUrl || './nullImage.png'} className='object-contain min-h-32' />
                    </div>
                )}
                {message.media?.mediaType === "video" && (
                    <div className="w-52 rounded bg-[#364153] border-[#2d323b] border">
                        <video src={message.media?.mediaUrl} className='h-full object-contain max-h-96' poster={!message.media?.mediaUrl ? './nullVideo.webp' : './defVideoCover.webp'} controls={message.media?.mediaUrl} />
                    </div>
                )}
            </div>)
                : (
                    <>
                        {message.message && <div className={`chat-bubble max-w-[250px] text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>}
                        {message.media?.mediaType === "image" && (
                            <div className="w-52 rounded bg-[#364153] border-[#2d323b] border">
                                <img src={message.media?.mediaUrl || './nullImage.png'} className='object-contain min-h-32' />
                            </div>
                        )}
                        {message.media?.mediaType === "video" && (
                            <div className="w-52 rounded bg-[#364153] border-[#2d323b] border">
                                <video src={message.media?.mediaUrl} className='h-full object-contain max-h-96' poster={!message.media?.mediaUrl ? './nullVideo.webp' : './defVideoCover.webp'} controls={message.media?.mediaUrl} />
                            </div>
                        )}
                    </>
                )}
            {/* {message.message && <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>} */}
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
        </div>
    )
}

export default Message;

// https://res.cloudinary.com/dndldpv3h/image/upload/v1742467799/j29d8uyjdy1y2izmnnen.png
