import { Card, Box, Typography } from '@mui/material'

function Cards({ props }) {
	return (
		<>
			<Card
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
				<Typography variant='h6'>{props.workout?.name}</Typography>
				<Typography variant='p'>{props.day}</Typography>
			</Card>
		</>
	)
}

export default Cards