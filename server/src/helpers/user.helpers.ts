export const generateUsername = () => {
	const adjectives = [
		'Cool',
		'Fast',
		'Brave',
		'Happy',
		'Lucky',
		'Smart',
		'Strong',
		'Wild',
	]
	const animals = [
		'Tiger',
		'Eagle',
		'Shark',
		'Panther',
		'Wolf',
		'Dragon',
		'Falcon',
		'Lion',
	]

	const randomAdjective =
		adjectives[Math.floor(Math.random() * adjectives.length)]
	const randomAnimal = animals[Math.floor(Math.random() * animals.length)]

	const randomNumber = Math.floor(10000 + Math.random() * 90000)

	return `${randomAdjective}${randomAnimal}_${randomNumber}`
}
export const isUsernameChangeAllowed = (lastTimeUpdatedUsername: string) => {
	if (!lastTimeUpdatedUsername) return true
	const date = new Date(lastTimeUpdatedUsername)

	const fourteenDaysAgo = new Date()
	fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

	return date < fourteenDaysAgo
}
