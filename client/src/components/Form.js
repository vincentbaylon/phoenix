import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Stack } from '@mui/material'

export default function FormDialog({ user, setUser, handleLogout }) {
	const [open, setOpen] = useState(false)
	const [formData, setFormData] = useState({
		name: user.name,
		username: user.username,
		email: user.email,
		password_digest: user.password_digest,
	})

	useEffect(() => {
		setFormData({
			name: user.name,
			username: user.username,
			email: user.email,
			password_digest: user.password_digest,
		})
	}, [user])

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSubmit = () => {
		setOpen(false)

		fetch(`/users/${user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					alert(data.error)
				} else {
					setUser(data)
				}
			})
	}

	const handleChange = (e) => {
		const name = e.target.name
		let value = e.target.value

		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleDelete = () => {
		if (
			window.confirm(
				'Are you sure you want to tackle your fitness goals alone?'
			)
		) {
			fetch(`/users/${user.id}`, {
				method: 'DELETE',
			}).then(handleLogout)
		} else {
		}
	}

	return (
		<div>
			<Button onClick={handleClickOpen} size='small'>
				Edit Account
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth>
				<DialogTitle>Edit Account</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>Enter your current weight</DialogContentText> */}
					<Stack spacing={2}>
						<TextField
							// margin='dense'
							name='username'
							label='Username'
							type='text'
							variant='standard'
							value={formData.username}
							onChange={handleChange}
						/>
						<TextField
							// margin='dense'
							name='name'
							label='Name'
							type='text'
							variant='standard'
							value={formData.name}
							onChange={handleChange}
						/>
						<TextField
							// margin='dense'
							name='email'
							label='Email'
							type='text'
							variant='standard'
							value={formData.email}
							onChange={handleChange}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button color='error' onClick={handleDelete}>
						Delete Account
					</Button>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
