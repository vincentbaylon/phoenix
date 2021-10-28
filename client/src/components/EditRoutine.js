import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FadeIn from 'react-fade-in'
import EditWorkoutCards from './EditWorkoutCards'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
	Box,
	Grid,
	Typography,
	TextField,
	Button,
	Divider,
} from '@mui/material'

function EditRoutine({ setRoutine, routine, user }) {
	const history = useHistory()
	const [routineName, setRoutineName] = useState('')

	useEffect(() => {
		if (Object.keys(routine).length === 0) {
			history.push('/routine')
		}
	}, [])

	const displayWorkouts = routine?.routine_workouts?.map((w, i) => {
		return (
			<Grid item>
				<EditWorkoutCards key={w.id} props={w} index={i} />
			</Grid>
		)
	})
	// const displayExercises = routine?.routine_exercises?.map((eArr) => {
	// 	return eArr.map((e) => {
	// 		return (
	// 			<Grid item>
	// 				<EditWorkoutCards key={e.id} props={e} />
	// 			</Grid>
	// 		)
	// 	})
	// })

	const handleRoutineName = () => {
		fetch(`/routines/${routine.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: routineName,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setRoutine(data)
				setRoutineName('')
			})
	}

	const handleChange = (e) => {
		setRoutineName(e.target.value)
	}

	const handleCurrent = async () => {
		fetch(`/user_routines/current/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				fetch(`/user_routines/${routine.id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						current: true,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.error) {
							alert(data.error)
						} else {
							alert('Current routine set. Have a great workout!')
						}
					})
			})
	}

	const handleAddWorkout = () => {
		history.push('/create_workout')
	}

	const handleDelete = async () => {
		if (
			window.confirm('Are you sure? You will lose all your routine history.')
		) {
			fetch(`/routines/${routine.id}`, {
				method: 'DELETE',
			}).then(history.goBack)
		} else {
		}
	}

	const handleBack = () => {
		history.goBack()
	}

	if (!routine) {
		history.push('/routine')
	}

	return (
		<FadeIn>
			<Box sx={{ m: 2, mt: 10 }}>
				<Typography variant='h5' sx={{ mb: 3 }}>
					<Button onClick={handleBack}>
						<ArrowBackIosNewIcon />
					</Button>
					Edit Routine
				</Typography>
				<Typography
					variant='h5'
					fontWeight='bold'
					sx={{ mb: 1, textTransform: 'capitalize' }}
				>
					{routine.name}
				</Typography>
				<TextField
					label='Edit Name'
					value={routineName}
					onChange={handleChange}
					variant='standard'
				/>
				<Button
					variant='outlined'
					size='small'
					onClick={handleRoutineName}
					sx={{ m: 1, mt: 2 }}
				>
					Save
				</Button>
				<Button
					onClick={handleCurrent}
					variant='contained'
					size='small'
					sx={{ m: 1, mt: 2 }}
				>
					Set As Current
				</Button>
				<Button
					onClick={handleDelete}
					variant='contained'
					size='small'
					sx={{ m: 1, mt: 2, background: 'red', color: 'black' }}
				>
					Delete Routine
				</Button>
				<Divider sx={{ mt: 2, mb: 2 }} />
				<Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
					Edit Workouts
				</Typography>
				<Button
					onClick={handleAddWorkout}
					variant='contained'
					size='small'
					sx={{ m: 1, mb: 2 }}
				>
					Add Workout
				</Button>
				<Grid container>{displayWorkouts}</Grid>
				{/* <Divider sx={{ mt: 2, mb: 2 }} />
				<Typography variant='h6' fontWeight='bold'>
					Exercises
				</Typography>
				<Grid container>{displayExercises}</Grid> */}
			</Box>
		</FadeIn>
	)
}

export default EditRoutine
