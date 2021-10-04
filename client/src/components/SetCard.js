import { React, useState } from 'react'
import { Grid, Box, Typography, TextField, Checkbox } from '@mui/material'

function SetCard({ set }) {
	const [checked, setChecked] = useState(false)
	const [formData, setFormData] = useState({
		set: '',
		reps: '',
		weight: '',
	})

	const handleCheck = (e) => {
		setChecked(e.target.checked)
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
		width: '50px',
	}

	return (
		<Grid container alignItems='center' spacing={2} sx={{ m: 1 }}>
			<Grid item>
				<Typography>Set #{set}</Typography>
			</Grid>
			<Grid item>
				<Typography variant='standard'>Prev</Typography>
			</Grid>
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
				<Checkbox
					checked={checked}
					onChange={handleCheck}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</Grid>
		</Grid>
	)
}

export default SetCard
