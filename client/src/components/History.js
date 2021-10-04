import { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import HistoryCard from './HistoryCard'
import { useMediaQuery } from '@mui/material'

function History() {
	const [trackers, setTrackers] = useState([])
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		fetch('/trackers')
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setTrackers(data)
			})
	}, [])

	const displayTrackers = trackers.map((h) => {
		return (
			<Grid item>
				<HistoryCard key={h.id} props={h} />
			</Grid>
		)
	})

	return (
		<Box
			sx={{
				mt: 10,
				width: '100vw',
			}}
		>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
			>
				<Grid item>
					<Typography align='left'>Previous workout</Typography>
				</Grid>
				{displayTrackers}
			</Grid>
		</Box>
	)
}

export default History
