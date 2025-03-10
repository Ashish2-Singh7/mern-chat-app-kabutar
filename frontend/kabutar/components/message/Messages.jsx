import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 50);
  }, [messages]);
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading && [...Array(3)].map((_idx) => <MessageSkeleton key={_idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
      {!loading && messages.length > 0 && messages.map((ele) => (
        <div
          key={ele._id}
          ref={lastMessageRef}
        >
          <Message message={ele} />
        </div>
      ))}
      {/* <Message /> */}
    </div>
  )
}

export default Messages
