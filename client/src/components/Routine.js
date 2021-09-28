import CreateExercise from './CreateWorkout'
import CreateWorkout from './CreateWorkout'
import CreateRoutine from './CreateRoutine'

import { Box } from '@mui/material'

function Routine() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
			<Box
				sx={{
					m: 5,
					mt: 10,
					width: '100%',
				}}
			>
				<CreateRoutine />
				<CreateWorkout />
				<CreateExercise />
			</Box>
		</Box>
	)
}

export default Routine
