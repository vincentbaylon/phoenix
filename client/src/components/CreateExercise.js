import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Divider } from '@mui/material'
import Stack from '@mui/material/Stack'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import ExerciseCards from './ExerciseCards'
import AddCards from './AddCards'

function CreateExercise({ routine, workouts, user }) {
	const history = useHistory()
	const [formData, setFormData] = useState({
		name: '',
		bodypart: '',
		weight: '',
	})
	const [workoutArr, setWorkoutArr] = useState([])
	const [workoutDays, setWorkoutDays] = useState([])
	const [selected, setSelected] = useState({
		id: '',
		name: '',
		day: '',
	})
	const [addWorkouts, setAddWorkouts] = useState([])

	useEffect(() => {
		async function fetchRoutine() {
			const res = await fetch(`/routines/${routine.id}`)
			const parsedBody = await res.json()
			if (parsedBody.error) {
				alert(parsedBody.error)
			} else {
				console.log(parsedBody)
				setWorkoutArr(parsedBody.workouts)
				setWorkoutDays(parsedBody.routine_workouts)
			}
		}
		fetchRoutine()
	}, [])

	const handleChange = (e) => {
		const name = e.target.name
		let value = e.target.value

		setFormData({
			...formData,
			[name]: value,
		})
	}

	function handleSelect(obj) {
		setSelected(obj)

		fetchWorkout(obj)
	}

	const handleDone = () => {
		history.push('/routine')
	}

	const fetchWorkout = async (obj) => {
		const res = await fetch(`/workouts/${obj.id}`)
		const parsedBody = await res.json()
		if (parsedBody.error) {
			alert(parsedBody.error)
		} else {
			setAddWorkouts(parsedBody.exercises)
		}
	}

	const handleAdd = async (e) => {
		e.preventDefault()

		const res = await fetch('/exercises', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})

		const parsedBody = await res.json()
		if (parsedBody.error) {
			alert(parsedBody.error)
		} else {
			const body = {
				workout_id: selected.id,
				exercise_id: parsedBody.id,
			}
			const res = await fetch('/workout_exercises', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			const parsedRoutineWorkout = await res.json()
			if (parsedRoutineWorkout.error) {
				alert(parsedRoutineWorkout.error)
			} else {
				setAddWorkouts([...addWorkouts, parsedBody])
				setFormData({
					name: '',
					bodypart: '',
					weight: '',
				})
			}
		}
	}

	const displayWorkouts = workoutArr.map((w, i) => {
		return (
			<Grid item>
				<ExerciseCards
					key={w.id}
					props={w}
					day={workoutDays[i]}
					handleSelect={handleSelect}
				/>
			</Grid>
		)
	})

	const displayExercises = addWorkouts.map((e) => {
		return <AddCards key={e.id} props={e} />
	})

	return (
		<Box sx={{ m: 2, mt: 10 }}>
			<Grid container>{workoutArr.length > 0 ? displayWorkouts : null}</Grid>
			<Typography sx={{ mb: 2 }}>
				Currently selected: {selected.name} - {selected.day}
			</Typography>
			<Divider />
			<Typography fontWeight='bold' sx={{ mt: 2 }}>
				Add Exercises To Workout
			</Typography>
			<Stack spacing={2}>
				<TextField
					name='name'
					value={formData.name}
					label='Exercise Name'
					placeholder='Exercise'
					variant='standard'
					onChange={handleChange}
				/>

				<FormControl variant='standard'>
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
				<FormControl variant='standard'>
					<InputLabel id='weightLabel'>Weight</InputLabel>
					<Select
						labelId='weightLabel'
						id='weightSelect'
						value={formData.weight}
						label='Weight'
						name='weight'
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
			</Stack>
			<Button variant='contained' onClick={handleAdd} sx={{ mt: 2, mb: 3 }}>
				Add Exercise
			</Button>
			<Divider />
			<Typography sx={{ mt: 2, mb: 2 }}>Exercises currently added:</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				{displayExercises}
			</Box>
			<Button variant='contained' color='secondary' onClick={handleDone}>
				Done Adding Exercises
			</Button>
		</Box>
	)
}

export default CreateExercise
