import { Card, Typography } from '@mui/material'

function WorkoutCards({ props, handleSelect }) {
	const handleClick = () => {
		handleSelect(props)
	}

	return (
		<>
			<Card
				onClick={handleClick}
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
					{props.workout_days[0].day.join(', ')}
				</Typography>
			</Card>
		</>
	)
}

export default WorkoutCards
