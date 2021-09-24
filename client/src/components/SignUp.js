import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import { IconButton } from '@mui/material'
import { InputAdornment } from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { VisibilityOff } from '@mui/icons-material'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { OutlinedInput } from '@mui/material'

function SignUp({ setUser }) {
	const history = useHistory()
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		password: '',
		username: '',
		email: '',
	})

	const handleShowPassword = (e) => {
		setShowPassword((showPassword) => !showPassword)
	}

	const handleChange = (e) => {
		const name = e.target.name
		let value = e.target.value

		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		fetch('/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error === undefined) {
					setUser(data)
					history.push('/home')
				} else {
					alert(data.error)
				}
			})
	}

	return (
		<Box
			sx={{
				display: 'flex',
				width: '50%',
				flexDirection: 'column',
				p: 1,
				m: 1,
			}}
		>
			<Typography>Create Your Account</Typography>
			<TextField
				type='text'
				name='name'
				value={formData.name}
				label='Name'
				onChange={handleChange}
			/>
			<TextField
				type='email'
				name='email'
				value={formData.email}
				label='Email'
				onChange={handleChange}
			/>
			<TextField
				type='text'
				name='username'
				value={formData.username}
				label='Username'
				onChange={handleChange}
			/>

			<FormControl sx={{ m: 1, width: '50ch' }} variant='outlined'>
				<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
				<OutlinedInput
					id='outlined-adornment-password'
					type={showPassword ? 'text' : 'password'}
					name='password'
					value={formData.password}
					label='Password'
					onChange={handleChange}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleShowPassword}
								edge='end'
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>

			<Button onClick={handleSubmit}>Sign Up</Button>
		</Box>
	)
}

export default SignUp
