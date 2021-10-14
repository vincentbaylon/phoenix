import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CreateExercise from './CreateWorkout'
import CreateWorkout from './CreateWorkout'
import CreateRoutine from './CreateRoutine'
import Cards from './Cards'
import RoutineCards from './RoutineCards'
import FadeIn from 'react-fade-in'

import {
	Box,
	Card,
	Typography,
	Divider,
	Grid,
	useMediaQuery,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function Routine({ user, setRoutine, routine }) {
	const history = useHistory()
	const [showRoutine, setShowRoutine] = useState(false)
	const [showWorkout, setShowWorkout] = useState(false)
	const [showExercise, setShowExercise] = useState(false)
	const [showRoutinePage, setShowRoutinePage] = useState(true)
	const [routineArr, setRoutineArr] = useState([])
	const [currentRoutine, setCurrentRoutine] = useState({})
	const [workouts, setWorkouts] = useState([])
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		async function fetchRoutine() {
			const res = await fetch(`/users/${user.id}`)
			const parsedBody = await res.json()
			if (parsedBody.error) {
				alert(parsedBody.error)
			} else {
				setRoutineArr(parsedBody.routines)
				const findCurrent = parsedBody.user_routines.find(
					(r) => r.current === true
				)
				if (findCurrent) {
					setCurrentRoutine(findCurrent)
				}
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

	const handleClick = (props) => {
		setRoutine(props)
		history.push('/edit_routine')
	}

	const displayRoutines = routineArr.map((r) => {
		return (
			<Grid item>
				<RoutineCards
					key={r.id}
					props={r}
					handleClick={handleClick}
					current={currentRoutine.id === r.id ? true : false}
				/>
			</Grid>
		)
	})

	return (
		<Box sx={{ m: 2, mt: 10 }}>
			<FadeIn>
				<Grid container justifyContent='center'>
					<Grid item>
						{showRoutinePage ? (
							<>
								<Typography variant='h6' fontWeight='bold'>
									Set A Routine As "Current"
								</Typography>
								<Grid container direction='row'>
									<Grid item>
										<Card
											onClick={handleRoutine}
											sx={{
												width: '125px',
												height: '150px',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												flexDirection: 'column',
												m: 1,
												p: 1,
											}}
										>
											<AddIcon fontSize='large' />
											<Typography align='center'>Create A Routine</Typography>
										</Card>
									</Grid>
									{displayRoutines}
								</Grid>
							</>
						) : null}
					</Grid>
					<Grid item>
						{showRoutine ? (
							<CreateRoutine
								user={user}
								setShowWorkout={setShowWorkout}
								setShowRoutine={setShowRoutine}
								setRoutine={setRoutine}
							/>
						) : null}
					</Grid>
					<Grid item>
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
							<CreateExercise
								routine={routine}
								user={user}
								workouts={workouts}
							/>
						) : null}
					</Grid>
					<Divider />
				</Grid>
			</FadeIn>
		</Box>
	)
}

export default Routine
