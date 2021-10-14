import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
	TextField,
	Stack,
	FormControl,
	InputLabel,
	FilledInput,
	InputAdornment,
	IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Box, Grid } from '@mui/material'
import logo from '../assets/logo.png'
import FadeIn from 'react-fade-in'

function Login({ setLoggedIn, setUser }) {
	const history = useHistory()
	const [showPassword, setShowPassword] = useState(false)
	// const [user, setUser] = useState({})
	const [formData, setFormData] = useState({
		username: '',
		password: '',
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

	const handleLogin = async () => {
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

	const handleSignUp = () => {
		history.push('/signup')
	}

	const textStyle = {
		backgroundColor: 'white',
		borderColor: '1px solid white',
		color: 'black',
		borderRadius: '2px',
		width: '300px',
	}

	const buttonStyle = {
		width: '300px',
		color: 'black',
		background: '#F5D242',
	}

	return (
		<Box sx={{ height: '100vh', width: '100vw' }}>
			<Grid
				container
				justifyContent='center'
				direction='row'
				alignItems='center'
				sx={{
					maxHeight: '100vh',
					height: '100%',
					backgroundColor: '#0a121d',
				}}
			>
				<Grid
					item
					xs={12}
					sm={6}
					md={6}
					lg={4}
					sx={{ mb: 3 }}
					style={{ textAlign: 'center' }}
				>
					<FadeIn>
						<img src={logo} style={{ height: '100%', width: '100%' }} />
					</FadeIn>
				</Grid>

				<Grid
					item
					xs={12}
					sm={6}
					md={6}
					lg={4}
					sx={{ mb: 3 }}
					style={{ textAlign: 'center' }}
				>
					<FadeIn>
						<Stack
							direction='column'
							justifyContent='center'
							alignItems='center'
							spacing={2}
						>
							<TextField
								name='username'
								value={formData.username}
								label='Username'
								onChange={handleChange}
								style={textStyle}
								variant='filled'
							/>
							{/* <TextField
								type='password'
								name='password'
								value={formData.password}
								label='Password'
								style={textStyle}
								variant='filled'
								onChange={handleChange}
							/> */}

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
								onClick={handleLogin}
								style={buttonStyle}
							>
								Log In
							</Button>
							<Box
								sx={{
									display: 'flex',
									direction: 'row',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Typography color='white'>Don't have an account?</Typography>
								<Button onClick={handleSignUp} sx={{ color: '#4266F5' }}>
									Sign Up
								</Button>
							</Box>
						</Stack>
					</FadeIn>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Login
