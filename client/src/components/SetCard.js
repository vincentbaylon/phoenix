import { React, useState } from 'react'
import {
	Grid,
	Box,
	Typography,
	TextField,
	Checkbox,
	FormGroup,
	FormControlLabel,
} from '@mui/material'

function SetCard({ set, props }) {
	const [checked, setChecked] = useState(false)
	const [formData, setFormData] = useState({
		set: `${set}`,
		reps: '',
		weight: '',
		exercise_id: `${props.id}}`,
	})
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
				body: JSON.stringify(formData),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
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
		width: '40px',
	}

	return (
		<Grid
			container
			direction='row'
			alignItems='center'
			justifyContent='center'
			spacing={2}
		>
			<Grid item>
				<Typography>Set #{set}</Typography>
			</Grid>
			{/* <Grid item>
				<Typography variant='standard'>Prev</Typography>
			</Grid> */}
			<Grid item>
				<TextField
					name='reps'
					type='number'
					variant='standard'
					label='Reps'
					style={textStyle}
					value={formData.reps}
					onChange={handleChange}
					onClick={handleClick}
				/>
			</Grid>
			<Grid item>
				<TextField
					name='weight'
					type='number'
					variant='standard'
					label='Lbs'
					style={textStyle}
					value={formData.weight}
					onChange={handleChange}
					onClick={handleClick}
				/>
			</Grid>

			<Grid item>
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
			</Grid>
		</Grid>
	)
}

export default SetCard
