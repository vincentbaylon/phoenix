import { Card, Typography, Button } from '@mui/material'

function AddCards({ props, handleDeleteExercise }) {
	const handleDelete = () => {
		if (window.confirm('Are you sure?')) {
			fetch(`/exercises/${props.id}`, {
				method: 'DELETE',
			}).then(handleDeleteExercise(props.id))
		} else {
		}
	}

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
				<Button onClick={handleDelete}>Delete</Button>
			</Card>
		</>
	)
}

export default AddCards
