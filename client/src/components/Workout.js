import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

import WorkoutCards from './WorkoutCards'
import TrackerCard from './TrackerCard'

import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

function Workout({ user }) {
	const [routine, setRoutine] = useState({})
	const [workout, setWorkout] = useState([])

	useEffect(() => {
		fetch(`/users/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.routines.length > 0) {
					const current = data.user_routines.find((r) => r.current === true)

					fetch(`/routines/${current.id}`)
						.then((res) => res.json())
						.then((data) => {
							console.log(data)
						})
				}
			})
	}, [])

	const displayCards = workout.map((w) => {
		return <WorkoutCards key={w.id} props={w} />
	})

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
			{console.log(routine)}
			<Box
				sx={{
					m: 5,
					mt: 10,
					width: '100%',
				}}
			>
				{displayCards}
				<Typography variant='h4'>Routine Name</Typography>
				<Typography variant='h6' sx={{ mb: 2 }}>
					Workout Name
				</Typography>

				<TrackerCard />
			</Box>
		</Box>
	)
}

export default Workout
