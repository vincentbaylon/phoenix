import WorkoutCards from './WorkoutCards'
import TrackerCard from './TrackerCard'
import { Box, Typography, Divider, Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import { useMediaQuery } from '@mui/material'
import FadeIn from 'react-fade-in'

function Workout({ user, historyWorkout, setHistoryWorkout }) {
	const history = useHistory()
	const [routine, setRoutine] = useState({})
	const [workout, setWorkout] = useState([])
	const [workoutName, setWorkoutName] = useState('')
	const [workoutInProgress, setWorkoutInProgress] = useState(false)
	const [workoutDays, setWorkoutDays] = useState([])
	const [date, setDate] = useState(new Date())
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		fetch(`/users/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.histories.length > 0) {
					const currentWorkout = data.histories.find(
						(h) => h.in_progress === true
					)
					if (currentWorkout) {
						console.log(currentWorkout)
						setHistoryWorkout(currentWorkout)
						setWorkoutInProgress(true)

						fetch(`/workouts/${currentWorkout.workout_id}`)
							.then((res) => res.json())
							.then((data) => {
								setWorkoutName(data.name)
								setWorkout(data.workout_exercises)
							})
					} else {
						if (data.routines.length > 0) {
							const current = data.user_routines.find((r) => r.current === true)
							if (current) {
								fetch(`/routines/${current.id}`)
									.then((res) => res.json())
									.then((data) => {
										setRoutine(data)
										setWorkoutDays(data.routine_workouts)
									})
							} else {
								alert('No routine set as "Current"')
							}
						} else {
							alert('Create a routine')
						}
					}
				} else {
					if (data.routines.length > 0) {
						const current = data.user_routines.find((r) => r.current === true)
						if (current) {
							fetch(`/routines/${current.id}`)
								.then((res) => res.json())
								.then((data) => {
									setRoutine(data)
									setWorkoutDays(data.routine_workouts)
								})
						} else {
							alert('No routine set as "Current"')
						}
					} else {
						alert('Create a routine')
					}
				}
			})
	}, [])

	const handleSelect = (prop) => {
		setWorkout(prop.workout_exercises)
		let formattedDate = format(date, 'EEE, MMM dd')

		const body = {
			user_id: user.id,
			routine_id: routine.id,
			workout_id: prop.id,
			date: formattedDate,
			in_progress: true,
		}

		fetch('/histories', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					alert(data.error)
				} else {
					setHistoryWorkout(data)
					setWorkoutInProgress(true)
				}
			})
	}

	const displayCards = workout.map((w) => {
		return <TrackerCard key={w.id} props={w} historyWorkout={historyWorkout} />
	})

	const displayWorkouts = routine?.workouts?.map((w) => {
		return <WorkoutCards key={w.id} props={w} handleSelect={handleSelect} />
	})

	const buttonStyle = {
		background: '#F5D242',
		color: 'black',
	}

	const cancelButton = {
		background: 'red',
		color: 'black',
	}

	const handleEnd = () => {
		fetch(`/histories/${historyWorkout.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				in_progress: false,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				alert('Great work! Rest up and fuel your body for recovery.')
				history.push('/home')
			})
	}

	const handleCancel = () => {
		fetch(`/histories/${historyWorkout.id}`, {
			method: 'DELETE',
		}).then(history.push('/home'))
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100vw',
			}}
		>
			<Box
				sx={{
					m: 2,
					mt: 10,
					width: matches ? '100%' : '50%',
				}}
			>
				{workoutInProgress ? (
					<FadeIn>
						<Typography variant='h5' sx={{ mb: 2 }}>
							{workoutName !== '' ? workoutName : 'Workout'}
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
							<Button
								variant='contained'
								style={cancelButton}
								onClick={handleCancel}
							>
								Cancel Workout
							</Button>
						</Box>
						<Divider sx={{ mb: 2 }} />
						{displayCards}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<Button
								variant='contained'
								style={buttonStyle}
								onClick={handleEnd}
							>
								Finish Workout
							</Button>
						</Box>
					</FadeIn>
				) : (
					<FadeIn>
						<Typography variant='h5' fontWeight='bold'>
							Select A Workout
						</Typography>
						<Grid container>{displayWorkouts}</Grid>
					</FadeIn>
				)}
			</Box>
		</Box>
	)
}

export default Workout
