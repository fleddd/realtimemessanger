import { create } from 'zustand'

type Store = {
	src: string
	isModalOpen: boolean
	setSrc: (src: string) => void
	setIsModalOpen: (value: boolean) => void
}

export const usePlayerStore = create<Store>()(set => ({
	src: '',
	isModalOpen: false,
	setSrc: (src: string) => set({ src: src }),
	setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
}))
