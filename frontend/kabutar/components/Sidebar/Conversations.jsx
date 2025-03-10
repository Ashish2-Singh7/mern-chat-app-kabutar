import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((element, idx) => (
        <Conversation
          key={element._id}
          conversation={element}
          // random emoji functionality just to make app kind of fun 🫠
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length-1}
        />
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}

    </div>
  )
}

export default Conversations
