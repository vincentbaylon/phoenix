import { Card, Box, Typography } from '@mui/material'

function AddCards({ props }) {
	return (
		<>
			<Card
				sx={{
					width: '125px',
					height: '100px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					m: 1,
				}}
			>
				<Typography variant='h6' align='center'>
					{props.name}
				</Typography>
				<Typography variant='p' align='center'>
					{props.day}
				</Typography>
			</Card>
		</>
	)
}

export default AddCards
