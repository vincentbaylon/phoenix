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
import { FilledInput } from '@mui/material'
import { Stack } from '@mui/material'
import background from '../assets/quote-bg2.jpeg'
import FadeIn from 'react-fade-in'

function SignUp({ setUser, setLoggedIn }) {
	const history = useHistory()
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		password: '',
		username: '',
		email: '',
	})

	function capitalizeName(name) {
		return name.replace(/\b(\w)/g, (s) => s.toUpperCase())
	}

	const handleShowPassword = (e) => {
		setShowPassword((showPassword) => !showPassword)
	}

	const handleName = (e) => {
		const name = e.target.name
		let value = capitalizeName(e.target.value)

		setFormData({ ...formData, [name]: value })
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
		if (parsedBody.error) {
			alert(parsedBody.error)
		} else {
			const res = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const parsedBody = await res.json()
			if (parsedBody.error) {
				alert(parsedBody.error)
			} else {
				setUser(parsedBody)
				setLoggedIn(true)
				history.push('/home')
			}
		}
	}

	const handleLogin = () => {
		history.push('/')
	}

	const textStyle = {
		backgroundColor: 'white',
		borderColor: '1px solid white',
		color: 'black',
		borderRadius: '2px',
		width: '300px',
	}

	const buttonStyle = {
		color: 'white',
		background: '#4266F5',
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
				backgroundImage: `url(${background})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundColor: '#0a121d',
			}}
		>
			<Box
				sx={{
					m: 5,
					mt: 10,
				}}
			>
				<FadeIn>
					<Stack spacing={3}>
						<Typography variant='h5' color='white'>
							Create Your Account
						</Typography>
						<TextField
							type='text'
							name='name'
							value={formData.name}
							label='Name'
							onChange={handleName}
							style={textStyle}
							variant='filled'
						/>
						<TextField
							type='email'
							name='email'
							value={formData.email}
							label='Email'
							onChange={handleChange}
							style={textStyle}
							variant='filled'
						/>
						<TextField
							type='text'
							name='username'
							value={formData.username}
							label='Username'
							onChange={handleChange}
							style={textStyle}
							variant='filled'
						/>

						<FormControl sx={{ m: 1 }} variant='filled'>
							<InputLabel htmlFor='outlined-adornment-password'>
								Password
							</InputLabel>
							<FilledInput
								id='outlined-adornment-password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={formData.password}
								label='Password'
								placeholder='(Min 6 characters)'
								onChange={handleChange}
								style={textStyle}
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

						<Button
							variant='contained'
							onClick={handleSubmit}
							style={buttonStyle}
						>
							Sign Up
						</Button>
						<Box
							sx={{
								display: 'flex',
								direction: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography color='white'>Already have an account?</Typography>
							<Button onClick={handleLogin} sx={{ color: '#F5D242' }}>
								Log In
							</Button>
						</Box>
					</Stack>
				</FadeIn>
			</Box>
		</Box>
	)
}

export default SignUp
