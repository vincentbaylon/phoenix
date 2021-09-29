import { useState } from 'react'

import CreateExercise from './CreateWorkout'
import CreateWorkout from './CreateWorkout'
import CreateRoutine from './CreateRoutine'

import { Box, Card, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function Routine({ user }) {
	const [showRoutine, setShowRoutine] = useState(false)
	const [showWorkout, setShowWorkout] = useState(false)
	const [showExercise, setShowExercise] = useState(false)
	const [showRoutinePage, setShowRoutinePage] = useState(true)
	const [routine, setRoutine] = useState({})

	const handleRoutine = () => {
		setShowRoutine(true)
		setShowRoutinePage(false)
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
			<Box
				sx={{
					m: 5,
					mt: 10,
					width: '50%',
				}}
			>
				{showRoutinePage ? (
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
				) : null}

				{showRoutine ? (
					<CreateRoutine
						user={user}
						setShowWorkout={setShowWorkout}
						setShowRoutine={setShowRoutine}
						setRoutine={setRoutine}
					/>
				) : null}
				{showWorkout ? <CreateWorkout /> : null}
				{showExercise ? <CreateExercise /> : null}
			</Box>
		</Box>
	)
}

export default Routine
