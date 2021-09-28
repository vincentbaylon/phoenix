import { useState } from 'react'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { InputLabel } from '@mui/material'
import Stack from '@mui/material/Stack'

function CreateRoutine() {
	const [formData, setFormData] = useState({
		name: '',
		bodypart: '',
		type: '',
	})
	const [value, setValue] = useState(null)
	const [workoutDays, setWorkoutDays] = useState([])

	const handleChange = (newValue) => {
		setValue(newValue)
	}

	const handleDays = (e) => {
		const {
			target: { value },
		} = e
		setWorkoutDays(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		)
	}

	return (
		<>
			<Typography fontWeight='bold'>Create A Routine</Typography>

			<TextField
				name='name'
				label='Routine Name'
				fullWidth
				variant='standard'
			/>
			<Stack spacing={2}>
				<FormControl
					fullWidth
					variant='standard'
					sx={{ mb: 1 }}
					style={{
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'pre',
					}}
				>
					<InputLabel id='workoutDays'>Select Workout Days</InputLabel>
					<Select
						labelId='workoutDays'
						id='workoutDays'
						value={workoutDays}
						label='Workout Days'
						name='workoutDays'
						multiple
						onChange={handleDays}
					>
						<MenuItem value={'Monday'}>Monday</MenuItem>
						<MenuItem value={'Tuesday'}>Tuesday</MenuItem>
						<MenuItem value={'Wednesday'}>Wednesday</MenuItem>
						<MenuItem value={'Thursday'}>Thursday</MenuItem>
						<MenuItem value={'Friday'}>Friday</MenuItem>
						<MenuItem value={'Saturday'}>Saturday</MenuItem>
						<MenuItem value={'Sunday'}>Sunday</MenuItem>
					</Select>
				</FormControl>

				<Button variant='outlined'>Create Routine</Button>
			</Stack>
		</>
	)
}

export default CreateRoutine
