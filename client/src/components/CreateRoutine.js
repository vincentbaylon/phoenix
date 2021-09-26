import { useState } from 'react'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { InputLabel } from '@mui/material'
import Stack from '@mui/material/Stack'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'

function CreateRoutine() {
	const [formData, setFormData] = useState({
		name: '',
		bodypart: '',
		type: '',
	})
	const [value, setValue] = useState(new Date('2014-08-18T21:11:54'))

	const handleChange = (newValue) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
			<Box
				sx={{
					mt: 10,
					m: 10,
					width: '100%',
				}}
			>
				<Typography fontWeight='bold'>Create A Routine</Typography>

				<TextField
					name='name'
					label='Routine Name'
					fullWidth
					variant='standard'
					sx={{ mb: 3 }}
				/>

				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Stack>
						<DateTimePicker
							label='Date&Time picker'
							value={value}
							onChange={handleChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</Stack>
				</LocalizationProvider>

				<Typography fontWeight='bold' sx={{ mt: 2 }}>
					Add Exercises
				</Typography>
				<Stack spacing={2}>
					<TextField
						name='name'
						label='Exercise Name'
						fullWidth
						variant='standard'
					/>

					<FormControl fullWidth variant='standard'>
						<InputLabel id='bodypartLabel'>Bodypart</InputLabel>
						<Select
							labelId='bodypartLabel'
							id='bodypartSelect'
							value={formData.bodypart}
							label='Bodypart'
							name='bodypart'
							onChange={handleChange}
						>
							<MenuItem value={'Chest'}>Chest</MenuItem>
							<MenuItem value={'Back'}>Back</MenuItem>
							<MenuItem value={'Legs'}>Legs</MenuItem>
							<MenuItem value={'Shoulders'}>Shoulders</MenuItem>
							<MenuItem value={'Arms'}>Arms</MenuItem>
							<MenuItem value={'Olympic'}>Olympic</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth variant='standard'>
						<InputLabel id='typeLabel'>Type</InputLabel>
						<Select
							labelId='typeLabel'
							id='typeSelect'
							value={formData.type}
							label='Type'
							name='type'
							onChange={handleChange}
						>
							<MenuItem value={'Dumbbell'}>Dumbbell</MenuItem>
							<MenuItem value={'Barbell'}>Barbell</MenuItem>
							<MenuItem value={'Machine'}>Machine</MenuItem>
							<MenuItem value={'Bodyweight'}>Bodyweight</MenuItem>
							<MenuItem value={'Cardio'}>Cardio</MenuItem>
							<MenuItem value={'Duration'}>Duration</MenuItem>
						</Select>
					</FormControl>
					<Button>Add Exercise</Button>
				</Stack>
			</Box>
		</Box>
	)
}

export default CreateRoutine
