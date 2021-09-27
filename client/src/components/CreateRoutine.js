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
		console.log(e.target.value)
		const {
			target: { value },
		} = e
		setWorkoutDays(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		)
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
			<Box
				sx={{
					m: 5,
					mt: 10,
					width: '100%',
				}}
			>
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

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<MobileDatePicker
							label='Select Start Date'
							inputFormat='MM/dd/yyyy'
							value={value}
							onChange={handleChange}
							renderInput={(params) => <TextField {...params} />}
						/>
						<MobileDatePicker
							label='Select End Date'
							inputFormat='MM/dd/yyyy'
							value={value}
							onChange={handleChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>

					<Button variant='outlined'>Create Routine</Button>
				</Stack>

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
			</Box>
		</Box>
	)
}

export default CreateRoutine
