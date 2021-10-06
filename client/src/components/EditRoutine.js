import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import EditWorkoutCards from './EditWorkoutCards'
import {
	Box,
	Grid,
	Typography,
	TextField,
	Button,
	Divider,
} from '@mui/material'

function EditRoutine({ setRoutine, routine }) {
	const history = useHistory()
	const [routineName, setRoutineName] = useState('')
	const displayWorkouts = routine.routine_workouts.map((w, i) => {
		return (
			<Grid item>
				<EditWorkoutCards key={w.id} props={w} index={i} />
			</Grid>
		)
	})

	const displayExercises = routine.routine_exercises.map((eArr) => {
		return eArr.map((e) => {
			return (
				<Grid item>
					<EditWorkoutCards key={e.id} props={e} />
				</Grid>
			)
		})
	})

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
		const res = await fetch(`/user_routines/${routine.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				current: true,
			}),
		})

		const parsedBody = await res.json()
		if (parsedBody.error) {
			alert(parsedBody.error)
		} else {
			alert('Current routine set')
		}
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

	if (!routine) {
		history.push('/routine')
	}

	return (
		<Box sx={{ m: 2, mt: 10 }}>
			<Typography variant='h5' sx={{ mb: 2 }}>
				Edit Routine
			</Typography>
			<Typography variant='h5' fontWeight='bold' sx={{ mb: 1 }}>
				{routine.name}
			</Typography>
			<TextField
				label='Edit Name'
				value={routineName}
				onChange={handleChange}
				variant='standard'
			/>
			<Button
				variant='contained'
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
				color='secondary'
				size='small'
				sx={{ m: 1, mt: 2 }}
			>
				Delete Routine
			</Button>
			<Divider sx={{ mt: 2, mb: 2 }} />
			<Typography variant='h6' fontWeight='bold'>
				Workouts
			</Typography>
			<Grid container>{displayWorkouts}</Grid>
			<Divider sx={{ mt: 2, mb: 2 }} />
			<Typography variant='h6' fontWeight='bold'>
				Exercises
			</Typography>
			<Grid container>{displayExercises}</Grid>
		</Box>
	)
}

export default EditRoutine
