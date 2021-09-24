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

	const handleLogin = () => {
		fetch('/login', {
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

			<Button onClick={handleLogin}>Login</Button>
		</>
	)
}

export default Login
