import { Card, Box, Typography } from '@mui/material'

function RoutineCards({ props }) {
	return (
		<>
			<Card
				sx={{
					width: '150px',
					height: '200px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					m: 1,
				}}
			>
				<Typography variant='h6'>{props.name}</Typography>
				<Typography variant='p'>{props.day}</Typography>
			</Card>
		</>
	)
}

export default RoutineCards
