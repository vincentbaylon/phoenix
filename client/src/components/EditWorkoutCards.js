import { Card, Box, Typography } from '@mui/material'

function EditWorkoutCards({ props, index }) {
	const handleClick = () => {}
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
				{/* <Typography variant='p'>{props.day}</Typography> */}
			</Card>
		</>
	)
}

export default EditWorkoutCards
