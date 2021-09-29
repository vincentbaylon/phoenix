import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
	Typography,
	TextField,
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Divider,
	Box,
} from '@mui/material'

import Cards from './Cards'

function CreateExercise({
	routine,
	user,
	workouts,
	setWorkouts,
	setShowWorkout,
	setShowExercise,
	handleWorkoutDone,
}) {
	const [day, setDay] = useState('')
	const [name, setName] = useState('')
	const history = useHistory()

	useEffect(() => {})

	const handleDay = (e) => {
		setDay(e.target.value)
	}

	const handleChange = (e) => {
		setName(e.target.value)
	}

	const handleDone = () => {
		history.push('/create_exercise')
	}

	const handleAddWorkout = async (e) => {
		e.preventDefault()
		const body = {
			name: name,
		}
		const res = await fetch('/workouts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		const parsedBody = await res.json()
		if (parsedBody.error) {
			alert(parsedBody.error)
		} else {
			const userWorkoutBody = {
				routine_id: routine.id,
				workout_id: parsedBody.id,
				day: day,
			}
			const res = await fetch('/routine_workouts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userWorkoutBody),
			})

			const parsedUserWorkoutBody = await res.json()
			if (parsedUserWorkoutBody.error) {
				alert(parsedUserWorkoutBody.error)
			} else {
				console.log(parsedUserWorkoutBody)
				let updateArr = [...workouts, parsedUserWorkoutBody]
				setWorkouts(updateArr)
				setName('')
				setDay('')
				// handleWorkoutDone()
				console.log(workouts)
			}
		}
	}

	const displayWorkouts = workouts.map((w) => {
		return <Cards key={w.id} props={w} />
	})

	return (
		<>
			<Typography fontWeight='bold' sx={{ mt: 3, mb: 2 }}>
				Create Workouts For "{routine.name}"
			</Typography>
			<Stack spacing={2}>
				<TextField
					name='name'
					label='Workout Name'
					fullWidth
					variant='standard'
					value={name}
					onChange={handleChange}
				/>

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
						value={day}
						label='Workout Days'
						name='workoutDays'
						onChange={handleDay}
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
			</Stack>
			<Button
				variant='contained'
				onClick={handleAddWorkout}
				sx={{ mt: 2, mb: 2 }}
			>
				Add Workout
			</Button>
			<Divider />
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				{workouts.length > 0 ? displayWorkouts : null}
			</Box>
			<Button
				variant='contained'
				color='secondary'
				onClick={handleDone}
				sx={{ mb: 2 }}
			>
				Done Adding Workouts
			</Button>
		</>
	)
}

export default CreateExercise
