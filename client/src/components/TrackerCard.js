import { useState } from 'react'
import {
	Typography,
	TextField,
	Button,
	Box,
	Grid,
	Divider,
} from '@mui/material'

import SetCard from './SetCard'

function TrackerCard({ props }) {
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
		return <SetCard key={i + 1} set={i + 1} props={props} />
	})

	return (
		<>
			<Grid
				container
				// justifyContent='center'
				alignItems='center'
				direction='column'
				spacing={2}
				sx={{ mb: 2 }}
			>
				<Grid item>
					<Typography variant='h6' align='left'>
						{props.name}
					</Typography>
				</Grid>
				<Grid item>{displayCards}</Grid>
				{/* <Grid item>
				<SetCard set={2} />
			</Grid>
			<Grid item>
				<SetCard set={3} />
			</Grid> */}
				<Grid item>
					<TextField placeholder='Notes' multiline rows={1} rowsmax={4} />
				</Grid>
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
