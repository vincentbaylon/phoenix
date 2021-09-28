import { useState } from 'react'

import CreateExercise from './CreateWorkout'
import CreateWorkout from './CreateWorkout'
import CreateRoutine from './CreateRoutine'

import { Box } from '@mui/material'

function Routine() {
	const [routine, setRoutine] = useState(false)
	const [workout, setWorkout] = useState(false)
	const [exercise, setExercise] = useState(false)

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
			<Box
				sx={{
					m: 5,
					mt: 10,
					width: '100%',
				}}
			>
				{routine ? <CreateRoutine /> : null}
				{workout ? <CreateWorkout /> : null}
				{exercise ? <CreateExercise /> : null}
			</Box>
		</Box>
	)
}

export default Routine
