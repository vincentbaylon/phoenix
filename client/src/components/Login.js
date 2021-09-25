import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'

function Login() {
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
			history.push('/home')
		}
	}

	const handleSignUp = () => {
		history.push('/signup')
	}

	return (
		<>
			<TextField
				name='username'
				value={formData.username}
				label='Username'
				onChange={handleChange}
			/>
			<TextField
				name='password'
				value={formData.password}
				label='Password'
				onChange={handleChange}
			/>

			<Button onClick={handleLogin}>Log In</Button>
			<Button onClick={handleSignUp}>Sign Up</Button>
		</>
	)
}

export default Login
