import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Box, Grid } from '@mui/material'

function Login({ setLoggedIn }) {
	const history = useHistory()
	const [user, setUser] = useState({})
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	})

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

	return (
		<Grid
			container
			spacing={2}
			justifyContent='center'
			direction='column'
			alignItems='center'
			sx={{ height: '100vh' }}
		>
			<Grid item sx={{ mb: 3 }}>
				<Typography variant='h2'>Phoenix Fitness</Typography>
			</Grid>
			<Grid item>
				<TextField
					name='username'
					value={formData.username}
					label='Username'
					onChange={handleChange}
				/>
			</Grid>
			<Grid item>
				<TextField
					type='password'
					name='password'
					value={formData.password}
					label='Password'
					onChange={handleChange}
				/>
			</Grid>
			<Grid item>
				<Button variant='contained' onClick={handleLogin}>
					Log In
				</Button>
			</Grid>
			<Grid item>
				<Button onClick={handleSignUp}>Sign Up</Button>
			</Grid>
		</Grid>
	)
}

export default Login
