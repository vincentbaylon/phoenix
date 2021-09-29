import { Card, Box, Typography } from '@mui/material'

function WorkoutCards({ props }) {
	return (
		<>
			{console.log(props)}
			<Card
				sx={{
					width: '150px',
					height: '150px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					m: 1,
				}}
			>
				<Typography variant='h6'>{props.name}</Typography>
				{/* <Typography variant='p'>{props.day}</Typography> */}
			</Card>
		</>
	)
}

export default WorkoutCards
