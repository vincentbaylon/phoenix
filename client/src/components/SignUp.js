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
import { Grid } from '@mui/material'
import { Stack } from '@mui/material'

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

	const handleSubmit = async (e) => {
		e.preventDefault()

		const res = await fetch('/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})

		const parsedBody = await res.json()
		parsedBody.error ? alert(parsedBody.error) : setUser(parsedBody)
		history.push('/home')
	}

	const handleLogin = () => {
		history.push('/')
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			<Box
				sx={{
					m: 5,
					mt: 10,
				}}
			>
				<Stack spacing={3}>
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

					<FormControl sx={{ m: 1 }} variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password'>
							Password
						</InputLabel>
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
					<Button onClick={handleLogin}>Log In</Button>
				</Stack>
			</Box>
		</Box>
	)
}

export default SignUp
