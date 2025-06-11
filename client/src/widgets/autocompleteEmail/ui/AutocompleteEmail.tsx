import { AutoComplete, AutoCompleteProps } from 'antd'
import { useState } from 'react'
import { AutocompleteEmailProps } from './type'

const AutocompleteEmail = ({
	disabled,
	value,
	onChange,
}: AutocompleteEmailProps) => {
	const [options, setOptions] = useState<AutoCompleteProps['options']>([])
	const handleSearch = (value: string) => {
		setOptions(() => {
			if (!value || value.includes('@')) {
				return []
			}
			return ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].map(
				domain => ({
					label: `${value}@${domain}`,
					value: `${value}@${domain}`,
				})
			)
		})
	}
	return (
		<AutoComplete
			disabled={disabled}
			value={value}
			onChange={onChange}
			onSearch={handleSearch}
			placeholder='cool@email.com'
			options={options}
		/>
	)
}

export default AutocompleteEmail
