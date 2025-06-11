export const formatToSmartDate = (oldDate: string): string => {
	const date = new Date(oldDate)
	const today = new Date()

	// Check if the date is today
	const isToday =
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()

	if (isToday) {
		// Return time in 24-hour format (e.g., 14:17)
		return date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})
	} else {
		// Return date in DD/MM/YYYY format
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		})
	}
}
