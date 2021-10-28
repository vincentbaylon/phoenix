import { useState } from 'react'
import {
	Typography,
	Button,
	Grid,
	Divider,
	Stack,
	TextField,
} from '@mui/material'

import SetCard from './SetCard'

function TrackerCard({ props, historyWorkout }) {
	const [count, setCount] = useState(1)

	const handleAdd = () => {
		setCount((count) => count + 1)
	}

	const handleRemove = () => {
		if (count === 1) {
		} else {
			setCount((count) => count - 1)
		}
	}

	const displayCards = [...Array(count)].map((_, i) => {
		return (
			<SetCard
				key={i + 1}
				set={i + 1}
				props={props}
				historyWorkout={historyWorkout}
			/>
		)
	})

	return (
		<>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				direction='column'
				spacing={2}
				sx={{ mb: 2 }}
			>
				<Grid item>
					<Typography variant='h6' align='left'>
						{props.name} - {props.weight}
					</Typography>
				</Grid>
				<Grid item>
					<Stack direction='row' spacing={4}>
						<Typography>Set</Typography>
						<Typography>Prev</Typography>
						<Typography>Reps</Typography>
						<Typography>
							{props.bodypart === 'Cardio' ? 'Time' : 'Weight'}
						</Typography>
						<Typography>Save</Typography>
					</Stack>
				</Grid>
				<Grid item>{displayCards}</Grid>
				{/* <Grid item>
					<TextField placeholder='Notes' multiline rows={1} rowsmax={4} />
				</Grid> */}
				<Grid item>
					<Button onClick={handleAdd}>Add Set</Button>
					<Button onClick={handleRemove}>Remove Set</Button>
				</Grid>
			</Grid>
			<Divider sx={{ mb: 2 }} />
		</>
	)
}

export default TrackerCard
