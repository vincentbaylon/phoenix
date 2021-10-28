import { Card, Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

function HistoryCard({ props }) {
	return (
		<>
			<Card
				sx={{
					width: '350px',
					height: '75px',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					flexDirection: 'row',
					m: 1,
					p: 2,
				}}
			>
				<Box>
					<Typography variant='h6'>{props.name}</Typography>
					<Typography variant='p'>Reps - {props.reps} | </Typography>
					<Typography variant='p'>Weight - {props.weight}</Typography>
				</Box>
			</Card>
		</>
	)
}

export default HistoryCard
