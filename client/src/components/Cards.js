import { Card, Typography } from '@mui/material'

function Cards({ props }) {
	return (
		<>
			<Card
				sx={{
					width: '125px',
					height: '125px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					m: 1,
					p: 1,
				}}
			>
				<Typography variant='h6' align='center'>
					{props.workout?.name}
				</Typography>
				<Typography variant='p' align='center'>
					{props.day.join(', ')}
				</Typography>
			</Card>
		</>
	)
}

export default Cards
