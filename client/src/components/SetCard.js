import { React, useState, useEffect } from 'react'
import {
	Grid,
	Typography,
	TextField,
	Checkbox,
	FormGroup,
	FormControlLabel,
	Stack,
} from '@mui/material'

function SetCard({ set, props, historyWorkout, previousWorkout }) {
	const [checked, setChecked] = useState(false)
	const [formData, setFormData] = useState({
		set: set,
		reps: '',
		weight: '',
		exercise_id: props.id,
		name: props.name,
		history_id: '',
	})
	const [prev, setPrev] = useState('N/A')

	useEffect(() => {
		if (Object.entries(previousWorkout).length !== 0) {
			const prevFilter = previousWorkout.show_trackers.filter(
				(t) => t.exercise_id === props.id
			)
			const prevSetFilter = prevFilter.filter((s) => s.set === `${set}`)

			if (prevSetFilter[0] !== undefined) {
				setPrev(prevSetFilter[0].weight)
			}
		}
	}, [previousWorkout])

	useEffect(() => {
		const exerciseFilter = historyWorkout.show_trackers.filter(
			(t) => t.exercise_id === props.id
		)
		const setFilter = exerciseFilter.filter((e) => e.set === `${set}`)

		if (setFilter[0] !== undefined) {
			setFormData({
				set: set,
				reps: setFilter[0].reps,
				weight: setFilter[0].weight,
				exercise_id: setFilter[0].id,
				name: setFilter.name,
				history_id: historyWorkout.id,
			})
			setChecked(true)
			setTracker(setFilter[0])
		}
	}, [])

	const [tracker, setTracker] = useState({})

	const handleCheck = (e) => {
		setChecked(e.target.checked)

		if (checked) {
			fetch(`/trackers/${tracker.id}`, {
				method: 'DELETE',
			})
		} else {
			fetch('/trackers', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					set: set,
					reps: formData.reps,
					weight: formData.weight,
					exercise_id: props.id,
					name: props.name,
					history_id: historyWorkout.id,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setTracker(data)
				})
		}
	}

	const handleClick = (e) => {
		e.target.select()
	}

	const handleChange = (e) => {
		const name = e.target.name
		let value = e.target.value

		setFormData({
			...formData,
			[name]: value,
		})
	}

	const textStyle = {
		width: '45px',
		textAlign: 'center',
	}

	return (
		<Grid
			container
			display='flex'
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{ ml: 2 }}
		>
			<Grid item>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='center'
					spacing={4}
				>
					<Typography>{set}</Typography>
					<Typography>{prev}</Typography>
					<TextField
						name='reps'
						type='number'
						variant='standard'
						style={textStyle}
						value={formData.reps}
						onChange={handleChange}
						onClick={handleClick}
						inputProps={{ min: 0, style: { textAlign: 'center' } }}
						disabled={checked ? 'disabled' : null}
					/>
					<TextField
						name='weight'
						type='number'
						variant='standard'
						style={textStyle}
						value={formData.weight}
						onChange={handleChange}
						onClick={handleClick}
						inputProps={{ min: 0, style: { textAlign: 'center' } }}
						disabled={checked ? 'disabled' : null}
					/>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={handleCheck}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							}
							label=''
						/>
					</FormGroup>
				</Stack>
			</Grid>
		</Grid>
	)
}

export default SetCard
