export const formatDateForConversation = (oldDate: string) => {
	const date = new Date(oldDate)
	const today = new Date()

	// Check if the date is today
	const isToday =
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()

	if (!isToday) {
		// Return time in 24-hour format (e.g., 14:17)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		})
	}
	return 'Today'
}
