import { useState } from 'react'
import { Card, Box, Typography } from '@mui/material'

function ExerciseCards({ props, day, handleSelect }) {
	const [selected, setSelected] = useState(false)
	const handleClick = () => {
		const obj = {
			id: props.id,
			name: props.name,
			day: day.day,
		}
		handleSelect(obj)
	}

	return (
		<>
			{console.log('DAY', day)}
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
					p: 1,
				}}
			>
				<Typography variant='h6' align='center'>
					{props.name}
				</Typography>
				<Typography variant='p' align='center'>
					{day?.day}
				</Typography>
			</Card>
		</>
	)
}

export default ExerciseCards
