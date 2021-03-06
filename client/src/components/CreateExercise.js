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
import ExerciseCards from './ExerciseCards'
import AddCards from './AddCards'
import { useMediaQuery } from '@mui/material'

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
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		async function fetchRoutine() {
			const res = await fetch(`/routines/${routine.id}`)
			const parsedBody = await res.json()
			if (parsedBody.error) {
				alert(parsedBody.error)
			} else {
				setWorkoutArr(parsedBody.workouts)
				setWorkoutDays(parsedBody.routine_workouts)
			}
		}
		fetchRoutine()
	}, [])

	function capitalizeName(name) {
		return name.replace(/\b(\w)/g, (s) => s.toUpperCase())
	}

	const handleChange = (e) => {
		const name = e.target.name
		let value = capitalizeName(e.target.value)

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

		if (selected.id === '') {
			alert('Select a workout')
		} else {
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

	const handleDeleteExercise = (id) => {
		const filteredExercise = addWorkouts.filter((w) => w.id !== id)
		setAddWorkouts(filteredExercise)
	}

	const displayExercises = addWorkouts.map((e) => {
		return (
			<Grid item>
				<AddCards
					key={e.id}
					props={e}
					handleDeleteExercise={handleDeleteExercise}
				/>
			</Grid>
		)
	})

	return (
		<Box
			sx={{
				m: 2,
				mt: 8,
				p: 2,
				width: matches ? '95%' : '50%',
				margin: 'auto',
			}}
		>
			<Box>
				<Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
					Select A Workout To Add Exercise
				</Typography>
				<Grid container>{workoutArr.length > 0 ? displayWorkouts : null}</Grid>
				<Typography sx={{ mb: 2 }}>
					Currently selected: {selected.name}
				</Typography>

				<Divider />
				<Typography variant='h6' fontWeight='bold' sx={{ mt: 2 }}>
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
						inputProps={{ style: { textTransform: 'capitalize' } }}
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
							<MenuItem value={'Abs'}>Abs</MenuItem>
							<MenuItem value={'Cardio'}>Cardio</MenuItem>
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
				<Typography variant='h6' fontweight='bold' sx={{ mt: 2, mb: 2 }}>
					Exercises Currently Added
				</Typography>
				<Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
					{displayExercises}
				</Grid>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<Button
						variant='contained'
						color='secondary'
						onClick={handleDone}
						sx={{ right: 0 }}
					>
						Save Routine
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default CreateExercise
