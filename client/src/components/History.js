import { useEffect, useState } from 'react'
import {
	Box,
	Typography,
	Grid,
	Stack,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material'
import HistoryCard from './HistoryCard'
import { useMediaQuery } from '@mui/material'
import FadeIn from 'react-fade-in'

function History({ user }) {
	const [trackers, setTrackers] = useState([])
	const [historyDate, setHistoryDate] = useState('')
	const [selected, setSelected] = useState({})
	const [histories, setHistories] = useState([])
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		fetch(`/users/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.histories.length > 0) {
					setHistories(data.histories)
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

	const handleSelect = (e) => {
		const workout = e.target.value
		setTrackers(workout.show_trackers)
		setSelected(e.target.value)
	}

	const menuItems = histories.map((d) => {
		return (
			<MenuItem key={d.id} value={d}>
				{d.workout_name.name} - {d.date}
			</MenuItem>
		)
	})

	return (
		<Box
			sx={{
				m: 2,
				mt: 10,
				width: matches ? '95%' : '50%',
				margin: 'auto',
			}}
		>
			<FadeIn>
				<Grid
					container
					direction='column'
					justifyContent='center'
					alignItems='center'
					sx={{ width: '100%' }}
				>
					<Grid item>
						<Typography variant='h6' align='left' sx={{ mb: 2 }}>
							History
						</Typography>
					</Grid>
					<Grid item sx={{ width: '95%' }}>
						<FormControl fullWidth variant='standard' sx={{ mb: 1 }}>
							<InputLabel id='previousWorkout'>
								Select Workout History
							</InputLabel>
							<Select
								labelId='previousWorkout'
								id='previousWorkout'
								value={selected.date}
								label='Previous Workout'
								name='previousWorkout'
								onChange={handleSelect}
							>
								{menuItems}
							</Select>
						</FormControl>
						{displayTrackers}
					</Grid>
				</Grid>
			</FadeIn>
		</Box>
	)
}

export default History
