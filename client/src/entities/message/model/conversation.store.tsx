import { create } from 'zustand'
type Mode = 'typing' | 'editing' | 'selecting'

interface Store {
	mode: Mode
	editMessage: {
		message: string | undefined
		id: string | undefined
	}
	newSeenMessagesId: string[]
	// addNewSeenMessageId: (messageId: string) => void
	// clearSeenMessages: () => void
	setEditMessage: (message: string | undefined, id: string | undefined) => void
	setMode: (value: Mode) => void
	isDeleteModalOpen: boolean
	setIsDeleteModalOpen: (value: boolean) => void
	isModalOpen: boolean
	setIsModalOpen: (value: boolean) => void
	uploadedMedia: string[]
	uploadedGif: string[]
	selectedMessages: string[]
	selectMessage: (messageId: string) => void
	// clearSelectedMessages: () => void
	setUploadedGif: (gif: string[]) => void
	setUploadedMedia: (media: string[]) => void
}

export const useConversationStore = create<Store>((set, get) => ({
	mode: 'typing',
	editMessage: {
		message: undefined,
		id: undefined,
	},
	newSeenMessagesId: [],
	// addNewSeenMessageId: (messageId: string) =>
	// 	set(state => {
	// 		if (get().newSeenMessagesId.includes(messageId)) return
	// 		return { newSeenMessagesId: [...state.newSeenMessagesId, messageId] }
	// 	}),
	// 	set(state => {
	// 		if (get().newSeenMessagesId.includes(messageId)) {
	// 			return {
	// 				selectedMessages: get().selectedMessages.filter(
	// 					id => id !== messageId
	// 				),
	// 			}
	// 		} else
	// 			return {
	// 				selectedMessages: [...state.selectedMessages, messageId],
	// 			}
	// 	}),
	// clearSeenMessages: () => set({ newSeenMessagesId: [] }),
	setEditMessage: (message: string | undefined, id: string | undefined) =>
		set({
			editMessage: {
				id: id,
				message: message,
			},
		}),
	setMode: (value: Mode) => set({ mode: value }),
	isDeleteModalOpen: false,
	setIsDeleteModalOpen: (value: boolean) => set({ isDeleteModalOpen: value }),
	selectedMessages: [],
	selectMessage: (messageId: string) =>
		set(state => {
			if (get().selectedMessages.includes(messageId)) {
				return {
					selectedMessages: get().selectedMessages.filter(
						id => id !== messageId
					),
				}
			} else
				return {
					selectedMessages: [...state.selectedMessages, messageId],
				}
		}),
	// clearSelectedMessages: () => set({ selectedMessages: [] }),
	isModalOpen: false,
	setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
	uploadedGif: [],
	uploadedMedia: [],
	setUploadedMedia: (media: string[]) => set({ uploadedMedia: media }),
	setUploadedGif: (gif: string[]) => set({ uploadedGif: gif }),
}))
