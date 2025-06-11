import { create } from 'zustand'

type Store = {
	isSelectingMode: boolean
	setIsSelectingMode: (val: boolean) => void
	selectedChats: string[]
	selectChat: (chatId: string) => void
	clearSelectedChats: () => void
}

export const useChatsStore = create<Store>()((set, get) => ({
	isSelectingMode: false,
	setIsSelectingMode: (val: boolean) => set({ isSelectingMode: val }),
	selectedChats: [],
	selectChat: (chatId: string) =>
		set(state => {
			if (get().selectedChats.includes(chatId)) {
				return {
					selectedChats: get().selectedChats.filter(id => id !== chatId),
				}
			} else
				return {
					selectedChats: [...state.selectedChats, chatId],
				}
		}),
	clearSelectedChats: () => set({ selectedChats: [] }),
}))
