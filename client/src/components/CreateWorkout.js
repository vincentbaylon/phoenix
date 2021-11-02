import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
	Grid,
	useMediaQuery,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import Cards from './Cards'

function CreateWorkout({ routine, user }) {
	const [day, setDay] = useState([])
	const [name, setName] = useState('')
	const location = useLocation()
	const [workouts, setWorkouts] = useState([])
	const history = useHistory()
	const matches = useMediaQuery('(max-width:900px)')
	const daysArr = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	]

	function capitalizeName(name) {
		return name.replace(/\b(\w)/g, (s) => s.toUpperCase())
	}

	const handleDay = (e) => {
		setDay(e.target.value)
	}

	const handleChange = (e) => {
		let capitalName = capitalizeName(e.target.value)
		setName(capitalName)
	}

	const handleDone = () => {
		history.push('/create_exercise')
	}

	const handleBack = () => {
		history.goBack()
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
				let updateArr = [...workouts, parsedUserWorkoutBody]
				setWorkouts(updateArr)
				setName('')
				setDay([])
				// handleWorkoutDone()
			}
		}
	}

	const handleDeleteWorkout = (id) => {
		const filteredWorkouts = workouts.filter((w) => w.id !== id)
		setWorkouts(filteredWorkouts)
	}

	const displayWorkouts = workouts.map((w) => {
		return (
			<Grid item>
				<Cards key={w.id} props={w} handleDeleteWorkout={handleDeleteWorkout} />
			</Grid>
		)
	})

	const menuItems = daysArr.map((d) => {
		return (
			<MenuItem key={d} value={d}>
				{d}
			</MenuItem>
		)
	})

	return (
		<Box
			sx={{
				m: 2,
				p: 2,
				mt: location.pathname === '/routine' ? 0 : 10,
				width: matches ? '95%' : '50%',
				margin: 'auto',
			}}
		>
			<Typography variant='h6' fontWeight='bold'>
				<Button onClick={handleBack}>
					<ArrowBackIosNewIcon />
				</Button>
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
					inputProps={{ style: { textTransform: 'capitalize' } }}
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
					<InputLabel id='workoutDays'>Select Day/s for Workout</InputLabel>
					<Select
						labelId='workoutDays'
						id='workoutDays'
						value={day}
						label='Workout Days'
						name='workoutDays'
						onChange={handleDay}
						multiple
					>
						{menuItems}
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
			<Divider sx={{ mb: 2 }} />
			<Grid container>{workouts.length > 0 ? displayWorkouts : null}</Grid>
			<Button
				variant='contained'
				color='secondary'
				onClick={handleDone}
				sx={{ mb: 2 }}
			>
				Done Adding Workouts
			</Button>
		</Box>
	)
}

export default CreateWorkout
