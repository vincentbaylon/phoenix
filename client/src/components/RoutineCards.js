import { Card, Box, Typography } from '@mui/material'

function RoutineCards({ props, handleClick }) {
	const cardClick = () => {
		handleClick(props.id)
	}

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
				onClick={cardClick}
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

export default RoutineCards
