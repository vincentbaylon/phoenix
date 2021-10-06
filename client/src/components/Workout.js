import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'
import WorkoutCards from './WorkoutCards'
import TrackerCard from './TrackerCard'
import { Box, Typography, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useMediaQuery } from '@mui/material'
import FadeIn from 'react-fade-in'

function Workout({ user }) {
	const [routine, setRoutine] = useState({})
	const [workout, setWorkout] = useState([])
	const [date, setDate] = useState(new Date())
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		fetch(`/users/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.routines.length > 0) {
					const current = data.user_routines.find((r) => r.current === true)
					console.log('CURRENT', current)
					if (current) {
						fetch(`/routines/${current.id}`)
							.then((res) => res.json())
							.then((data) => {
								console.log(data)
								setRoutine(data)
								setWorkout(data.workouts[0].workout_exercises)
							})
					} else {
						alert('No routine set as "Current"')
					}
				} else {
					alert('Create a routine')
				}
			})
	}, [])

	useEffect(() => {
		let formattedDate = format(date, 'EEEE')
		console.log(formattedDate)
		console.log(workout)
	}, [])

	const displayCards = workout.map((w) => {
		return <TrackerCard key={w.id} props={w} />
	})

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100vw',
			}}
		>
			{console.log(matches)}
			<Box
				sx={{
					m: 2,
					mt: 10,
					width: matches ? '100%' : '50%',
				}}
			>
				{/* <Typography variant='h4'>{routine?.name}</Typography> */}
				<Typography variant='h5' sx={{ mb: 2 }}>
					{routine.workouts ? routine.workouts[0].name : 'Workout'}
				</Typography>
				<Divider sx={{ mb: 2 }} />
				{displayCards}
			</Box>
		</Box>
	)
}

export default Workout
