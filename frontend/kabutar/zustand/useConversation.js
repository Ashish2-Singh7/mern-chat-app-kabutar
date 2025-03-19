import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    conversation: null,
    setConversation: (conversation) => set({conversation}),
    messages: [],
    setMessages: (messages)=>set({messages}),
}));

export default useConversation;