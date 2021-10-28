import { Card, Typography, Button } from '@mui/material'

function Cards({ props, handleDeleteWorkout }) {
	const handleDelete = () => {
		if (window.confirm('Are you sure?')) {
			fetch(`/workouts/${props.id}`, {
				method: 'DELETE',
			}).then(handleDeleteWorkout(props.id))
		} else {
		}
	}

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
				<Button onClick={handleDelete}>Delete</Button>
			</Card>
		</>
	)
}

export default Cards
