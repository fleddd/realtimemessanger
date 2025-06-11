import { create } from 'zustand'

type Store = {
	// newUsername: string
	// setNewUsername: (value: string) => void
	isModalOpen: boolean
	setIsModalOpen: (value: boolean) => void
}

export const useProfileStore = create<Store>()(set => ({
	// newUsername: '',
	// setNewUsername: (value: string) => set({ newUsername: value }),
	isModalOpen: false,
	setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
}))
