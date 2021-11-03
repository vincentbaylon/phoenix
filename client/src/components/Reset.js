import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
	Box,
	useMediaQuery,
	FormControl,
	InputLabel,
	FilledInput,
	Button,
	IconButton,
	InputAdornment,
	Grid,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function Reset() {
	const matches = useMediaQuery('(max-width:900px)')
	const history = useHistory()
	const [showPassword, setShowPassword] = useState(false)
	const [password, setPassword] = useState('')
	const [token, setToken] = useState('')

	useEffect(() => {
		const url = window.location.href
		// const hash = url.substring(url.indexOf('/') + 1)
		let result = url.split('?')
		result = result[1].split('=')
		setToken(result[1])
	}, [])

	const handleShowPassword = (e) => {
		setShowPassword((showPassword) => !showPassword)
	}

	const handleChange = (e) => {
		setPassword(e.target.value)
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

	const handleSubmit = () => {
		fetch('/password/reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: token,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					alert(data.error)
				} else {
					history.push('/')
				}
			})
	}

	return (
		<Box sx={{ m: 2, mt: 10, width: matches ? '95%' : '50%', margin: 'auto' }}>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				spacing={2}
			>
				<Grid item>
					<FormControl sx={{ m: 1 }} variant='filled'>
						<InputLabel htmlFor='outlined-adornment-password'>
							New Password
						</InputLabel>
						<FilledInput
							id='outlined-adornment-password'
							type={showPassword ? 'text' : 'password'}
							name='password'
							value={password}
							label='Password'
							placeholder='(Min 6 characters)'
							onChange={handleChange}
							style={textStyle}
							autoComplete='off'
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
				</Grid>
				<Grid item>
					<Button
						variant='contained'
						onClick={handleSubmit}
						style={buttonStyle}
					>
						Update Password
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Reset
