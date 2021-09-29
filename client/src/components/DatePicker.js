import * as React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'
import DateTimePicker from '@mui/lab/DateTimePicker'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import { Box } from '@mui/material'

export default function MaterialUIPickers() {
	const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'))

	const handleChange = (newValue) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ mt: 2 }}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack spacing={5}>
					<DateTimePicker
						label='Date&Time picker'
						value={value}
						onChange={handleChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</Stack>
			</LocalizationProvider>
		</Box>
	)
}
