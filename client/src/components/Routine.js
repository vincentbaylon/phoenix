import { useState, useEffect } from 'react'

import CreateExercise from './CreateWorkout'
import CreateWorkout from './CreateWorkout'
import CreateRoutine from './CreateRoutine'
import Cards from './Cards'
import RoutineCards from './RoutineCards'

import { Box, Card, Typography, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function Routine({ user, setRoutine, routine }) {
	const [showRoutine, setShowRoutine] = useState(false)
	const [showWorkout, setShowWorkout] = useState(false)
	const [showExercise, setShowExercise] = useState(false)
	const [showRoutinePage, setShowRoutinePage] = useState(true)
	const [routineArr, setRoutineArr] = useState([])
	const [workouts, setWorkouts] = useState([])

	useEffect(() => {
		async function fetchRoutine() {
			const res = await fetch(`/users/${user.id}`)
			const parsedBody = await res.json()
			if (parsedBody.error) {
				alert(parsedBody.error)
			} else {
				console.log(parsedBody)
				setRoutineArr(parsedBody.routines)
			}
		}
		fetchRoutine()
	}, [])

	const handleRoutine = () => {
		setShowRoutine(true)
		setShowRoutinePage(false)
	}

	const handleWorkoutDone = () => {
		setShowExercise(true)
	}

	const handleClick = async (id) => {
		const res = await fetch(`/user_routines/${id}`, {
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

	const displayRoutines = routineArr.map((r) => {
		return <RoutineCards key={r.id} props={r} handleClick={handleClick} />
	})

	return (
		<Box
			sx={{
				display: 'flex',
				direction: 'row',
				justifyContent: 'center',
				width: '100vw',
			}}
		>
			<Box
				sx={{
					m: 5,
					mt: 10,
					width: '100%',
				}}
			>
				{showRoutinePage ? (
					<>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							<Card
								onClick={handleRoutine}
								sx={{
									width: '150px',
									height: '200px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
								}}
							>
								<AddIcon fontSize='large' />
								<Typography>Create A Routine</Typography>
							</Card>
							{displayRoutines}
						</Box>
						<Typography>Select A Routine</Typography>
					</>
				) : null}

				{showRoutine ? (
					<CreateRoutine
						user={user}
						setShowWorkout={setShowWorkout}
						setShowRoutine={setShowRoutine}
						setRoutine={setRoutine}
					/>
				) : null}
				{showWorkout ? (
					<CreateWorkout
						routine={routine}
						user={user}
						workouts={workouts}
						setWorkouts={setWorkouts}
						setShowWorkout={setShowWorkout}
						setShowExercise={setShowExercise}
						handleWorkoutDone={handleWorkoutDone}
					/>
				) : null}
				{showExercise ? (
					<CreateExercise routine={routine} user={user} workouts={workouts} />
				) : null}
				<Divider />
			</Box>
		</Box>
	)
}

export default Routine
