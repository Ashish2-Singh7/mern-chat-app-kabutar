import { create } from 'zustand';

const useSelectedImage = create((set) => ({
    chatBgImage: null,
    setChatBgImage: (image) => set({ chatBgImage: image }),
    ImageToSend: null,
    setImageToSend: (image) => set({ ImageToSend: image }),
    resetImages: () => set({ ImageToSend: null, chatBgImage: null })
}));

export default useSelectedImage;