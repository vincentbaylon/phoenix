import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { TextField } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

function CreateRoutine({ setRoutine, user }) {
	const history = useHistory()
	const [name, setName] = useState('')
	const [workoutDays, setWorkoutDays] = useState([])
	const matches = useMediaQuery('(max-width:900px)')

	function capitalizeName(name) {
		return name.replace(/\b(\w)/g, (s) => s.toUpperCase())
	}

	const handleChange = (e) => {
		let capitalName = capitalizeName(e.target.value)
		setName(capitalName)
	}

	const handleDays = (e) => {
		const {
			target: { value },
		} = e
		setWorkoutDays(typeof value === 'string' ? value.split(',') : value)
	}

	const handleBack = () => {
		history.push('/routine')
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
				setRoutine(parsedRoutineBody)
				history.push('create_workout')
			}
		}
	}

	return (
		<Box sx={{ mt: 10, p: 2, width: matches ? '100vw' : '50vw' }}>
			<Typography fontWeight='bold' variant='h5'>
				<Button onClick={handleBack}>
					<ArrowBackIosNewIcon />
				</Button>
				Create A Routine
			</Typography>

			<TextField
				name='name'
				label='Routine Name'
				fullWidth
				variant='standard'
				value={name}
				onChange={handleChange}
				inputProps={{ style: { textTransform: 'capitalize' } }}
			/>
			<Button variant='contained' onClick={handleRoutine} sx={{ mt: 2 }}>
				Create Routine
			</Button>
		</Box>
	)
}

export default CreateRoutine
