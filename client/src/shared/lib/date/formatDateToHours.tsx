export const formatDateToHours = (oldDate: string) => {
	return new Date(oldDate).toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})
}
