import { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import HistoryCard from './HistoryCard'
import { useMediaQuery } from '@mui/material'
import FadeIn from 'react-fade-in'

function History({ user }) {
	const [trackers, setTrackers] = useState([])
	const [historyDate, setHistoryDate] = useState('')
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		fetch(`/users/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.histories.length > 0) {
					setHistoryDate(data.histories.at(-1).date)
					setTrackers(data.histories.at(-1).show_trackers)
				}
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
			<FadeIn>
				<Grid
					container
					direction='column'
					justifyContent='center'
					alignItems='center'
				>
					<Grid item>
						<Typography variant='h6' align='left'>
							{historyDate !== ''
								? `Previous workout - ${historyDate}`
								: `No previous workout`}
						</Typography>
					</Grid>
					{displayTrackers}
				</Grid>
			</FadeIn>
		</Box>
	)
}

export default History
