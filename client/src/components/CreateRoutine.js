import { useState } from 'react'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { TextField } from '@mui/material'
import { useMediaQuery } from '@mui/material'

function CreateRoutine({ setShowWorkout, setShowRoutine, setRoutine, user }) {
	const [name, setName] = useState('')
	const [workoutDays, setWorkoutDays] = useState([])
	const matches = useMediaQuery('(max-width:900px)')

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
		<Box sx={{ p: 2, width: matches ? '100vw' : '50vw' }}>
			<Typography fontWeight='bold'>Create A Routine</Typography>

			<TextField
				name='name'
				label='Routine Name'
				fullWidth
				variant='standard'
				value={name}
				onChange={handleChange}
			/>
			<Button variant='contained' onClick={handleRoutine} sx={{ mt: 2 }}>
				Create Routine
			</Button>
		</Box>
	)
}

export default CreateRoutine
