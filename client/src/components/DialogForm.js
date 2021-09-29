import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { format } from 'date-fns'

export default function FormDialog({ user, refetchChart }) {
	const [open, setOpen] = React.useState(false)
	const [weight, setWeight] = React.useState(0)
	const [date, setDate] = React.useState(new Date())

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSubmit = async () => {
		setOpen(false)

		let formattedDate = format(date, 'M/d')

		console.log(weight, formattedDate)

		const body = {
			user_id: user.id,
			progress_id: user.progresses[0]?.id,
			weight: weight,
			date: formattedDate,
		}

		const res = await fetch('/user_progresses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		const parsedBody = await res.json()
		console.log(parsedBody)
		if (parsedBody.error) {
			alert(parsedBody.error)
		} else {
			refetchChart()
		}
	}

	const handleChange = (e) => {
		setWeight(e.target.value)
	}

	return (
		<div>
			<Button variant='outlined' onClick={handleClickOpen}>
				Add Progress Check-In
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Check-In</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter your current weight</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='weight'
						label='Current Weight'
						type='number'
						variant='standard'
						value={weight}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
