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

function CreateRoutine({ setShowWorkout, setShowRoutine, setRoutine, user }) {
	const [name, setName] = useState('')
	const [workoutDays, setWorkoutDays] = useState([])

	const handleChange = (e) => {
		setName(e.target.value)
	}

	const handleDays = (e) => {
		const {
			target: { value },
		} = e
		setWorkoutDays(typeof value === 'string' ? value.split(',') : value)
	}

	const handleRoutine = async (e) => {
		e.preventDefault()

		const routineBody = {
			name: name,
		}
		const res = await fetch('/routines', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(routineBody),
		})

		const parsedRoutineBody = await res.json()
		if (parsedRoutineBody.error) {
			alert(parsedRoutineBody.error)
		} else {
			const userRoutineBody = {
				user_id: user.id,
				routine_id: parsedRoutineBody.id,
				days: workoutDays,
			}
			const res = await fetch('/user_routines', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userRoutineBody),
			})

			const parsedUserRoutineBody = await res.json()
			if (parsedUserRoutineBody.error) {
				alert(parsedUserRoutineBody.error)
			} else {
				setShowRoutine(false)
				setShowWorkout(true)
				setRoutine(parsedRoutineBody)
			}
		}
	}

	return (
		<Box sx={{ p: 2, width: '100vw' }}>
			<Typography fontWeight='bold'>Create A Routine</Typography>

			<TextField
				name='name'
				label='Routine Name'
				fullWidth
				variant='standard'
				value={name}
				onChange={handleChange}
			/>
			<Stack spacing={2}>
				{/* <FormControl
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
				</FormControl> */}
			</Stack>
			<Button variant='contained' onClick={handleRoutine} sx={{ mt: 2 }}>
				Create Routine
			</Button>
		</Box>
	)
}

export default CreateRoutine
