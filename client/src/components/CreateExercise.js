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
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDatePicker from '@mui/lab/MobileDatePicker'

function CreateExercise() {
	const [formData, setFormData] = useState({
		name: '',
		bodypart: '',
		type: '',
	})

	const handleChange = () => {}

	return (
		<>
			<Typography fontWeight='bold' sx={{ mt: 2 }}>
				Add Exercises To Workout
			</Typography>
			<Stack spacing={2}>
				<TextField
					name='name'
					label='Exercise Name'
					fullWidth
					variant='standard'
				/>

				<FormControl fullWidth variant='standard'>
					<InputLabel id='bodypartLabel'>Bodypart</InputLabel>
					<Select
						labelId='bodypartLabel'
						id='bodypartSelect'
						value={formData.bodypart}
						label='Bodypart'
						name='bodypart'
						onChange={handleChange}
					>
						<MenuItem value={'Chest'}>Chest</MenuItem>
						<MenuItem value={'Back'}>Back</MenuItem>
						<MenuItem value={'Legs'}>Legs</MenuItem>
						<MenuItem value={'Shoulders'}>Shoulders</MenuItem>
						<MenuItem value={'Arms'}>Arms</MenuItem>
						<MenuItem value={'Olympic'}>Olympic</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth variant='standard'>
					<InputLabel id='typeLabel'>Type</InputLabel>
					<Select
						labelId='typeLabel'
						id='typeSelect'
						value={formData.type}
						label='Type'
						name='type'
						onChange={handleChange}
					>
						<MenuItem value={'Dumbbell'}>Dumbbell</MenuItem>
						<MenuItem value={'Barbell'}>Barbell</MenuItem>
						<MenuItem value={'Machine'}>Machine</MenuItem>
						<MenuItem value={'Bodyweight'}>Bodyweight</MenuItem>
						<MenuItem value={'Cardio'}>Cardio</MenuItem>
						<MenuItem value={'Duration'}>Duration</MenuItem>
					</Select>
				</FormControl>
				<Button variant='outlined'>Add Exercise</Button>
			</Stack>
		</>
	)
}

export default CreateExercise
