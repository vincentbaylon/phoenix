import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

import { Box } from '@mui/material'

function Workout() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
			<Box
				sx={{
					m: 5,
					mt: 10,
					width: '100%',
				}}
			></Box>
		</Box>
	)
}

export default Workout
