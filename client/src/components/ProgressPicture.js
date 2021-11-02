import { useState, useEffect } from 'react'
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material'

function ProgressPicture({ checkIns, label }) {
	const [selected, setSelected] = useState('')

	// if (label === 'Current') {
	// 	checkIns[-1] ? setSelected(checkIns[-1]) : null
	// }
	// if (label === 'Previous') {
	// 	checkIns[-2] ? setSelected(checkIns[-2]) : null
	// }

	const handleChange = (e) => {
		setSelected(e.target.value)
	}

	const displayCheckIns = checkIns.map((c) => {
		return <MenuItem value={c}>{c.date}</MenuItem>
	})

	return (
		<Box
			sx={{
				minWidth: 120,
			}}
		>
			<FormControl fullWidth>
				<InputLabel id='checkInLabel'>{label}</InputLabel>
				<Select
					labelId='checkInLabel'
					id='checkIn'
					value={selected}
					label={label}
					onChange={handleChange}
				>
					{displayCheckIns}
				</Select>
				<img
					src={selected?.image_url}
					style={{ objectFit: 'cover', width: '100%' }}
				/>
			</FormControl>
		</Box>
	)
}

export default ProgressPicture
