import { useState } from 'react'
import {
	Typography,
	TextField,
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from '@mui/material'

function CreateExercise() {
	const [workoutDays, setWorkoutDays] = useState([])

	const handleDays = () => {}

	return (
		<>
			<Typography fontWeight='bold' sx={{ mt: 3 }}>
				Create Workouts For Routine
			</Typography>

			<TextField
				name='name'
				label='Workout Name'
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
					<InputLabel id='workoutDays'>Select Day for Workout</InputLabel>
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

				<Button variant='outlined'>Create Workout</Button>
			</Stack>
		</>
	)
}

export default CreateExercise
