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

function SetCard({ set, props, historyWorkout }) {
	const [checked, setChecked] = useState(false)
	const [formData, setFormData] = useState({
		set: set,
		reps: '',
		weight: '',
		exercise_id: props.id,
		name: props.name,
		history_id: '',
	})

	useEffect(() => {}, [historyWorkout])

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
					<Typography>185</Typography>
					<TextField
						name='reps'
						type='number'
						variant='standard'
						style={textStyle}
						value={formData.reps}
						onChange={handleChange}
						onClick={handleClick}
						inputProps={{ min: 0, style: { textAlign: 'center' } }}
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
