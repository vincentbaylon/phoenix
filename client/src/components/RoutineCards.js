import { Card, Typography } from '@mui/material'

function RoutineCards({ props, handleClick, current }) {
	const cardClick = () => {
		handleClick(props)
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
				{current ? <Typography variant='p'>(Current)</Typography> : null}
			</Card>
		</>
	)
}

export default RoutineCards
