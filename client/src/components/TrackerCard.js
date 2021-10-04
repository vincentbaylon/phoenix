import { Typography, TextField, Button, Box, Grid } from '@mui/material'

import SetCard from './SetCard'

function TrackerCard() {
	return (
		<Grid
			container
			display='flex'
			justifyContent='center'
			alignItems='center'
			direction='column'
			spacing={2}
		>
			<Grid item>
				<Typography variant='h5'>Exercise Name</Typography>
			</Grid>
			<Grid item>
				<SetCard set={1} />
			</Grid>
			<Grid item>
				<SetCard set={2} />
			</Grid>
			<Grid item>
				<SetCard set={3} />
			</Grid>
			<Grid item>
				<TextField placeholder='Notes' multiline rows={2} rowsMax={4} />
			</Grid>
		</Grid>
	)
}

export default TrackerCard
