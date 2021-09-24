import '../App.css'
import { useEffect, useState } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/material'
import { Container } from '@mui/material'

import CreateRoutine from './CreateRoutine'
import Home from './Home'
import Login from './Login'
import NavBar from './NavBar'
import Progress from './Progress'
import SignUp from './SignUp'
import Workout from './Workout'

function App() {
	const history = useHistory()
	const location = useLocation()
	const [user, setUser] = useState({})
	const [loggedIn, setLoggedIn] = useState(false)

	// useEffect(() => {
	// 	const url =
	// 		"https://quickchart.io/chart?c={type:'bar',data:{labels:['Q1','Q2','Q3','Q4'], datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}}"

	// 	fetch(url)
	// 		.then((res) => res.blob())
	// 		.then((imageBlob) => {
	// 			console.log(imageBlob)
	// 			const imageObjectUrl = URL.createObjectURL(imageBlob)
	// 			console.log(imageObjectUrl)
	// 			setImage(imageObjectUrl)
	// 		})
	// }, [])

	useEffect(() => {
		fetch('/me').then((response) => {
			if (response.ok) {
				response.json().then((user) => {
					setUser(user)
					if (location.pathname === '/') {
						history.push('/home')
					}
				})
			}
		})
	}, [])

	// const handleChange = (e) => {
	// 	const name = e.target.name
	// 	let value = e.target.value

	// 	setFormData({
	// 		...formData,
	// 		[name]: value,
	// 	})
	// }

	// const handleSignUp = () => {
	// 	fetch('/users', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(formData),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log('SIGNUP', data)
	// 			if (data.error === undefined) {
	// 				setUser(data)
	// 				setLoggedIn(true)
	// 			} else {
	// 				alert(data.error)
	// 			}
	// 		})
	// }

	// const handleLogin = () => {
	// 	fetch('/login', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(formData),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log('LOGIN', data)
	// 			if (data.error === undefined) {
	// 				setUser(data)
	// 				setLoggedIn(true)
	// 			} else {
	// 				alert(data.error)
	// 			}
	// 		})
	// }
	// const handleUpdate = () => {
	// 	fetch(`/users/${user.id}`, {
	// 		method: 'PATCH',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			username: formData.username,
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log('UPDATE', data)
	// 			if (data.error === undefined) {
	// 				setUser(data)
	// 			} else {
	// 				alert(data.error)
	// 			}
	// 		})
	// }

	// const handleDelete = () => {
	// 	fetch(`/users/${user.id}`, {
	// 		method: 'DELETE',
	// 	}).then(onLogout)
	// }

	const handleLogout = () => {
		fetch('/logout', {
			method: 'DELETE',
		}).then(onLogout)
	}

	const onLogout = () => {
		setUser({})
		setLoggedIn(false)
	}

	return (
		<div>
			<CssBaseline />
			<Box style={{ height: '100%' }}>
				{location.pathname == '/' || location.pathname == '/signup' ? null : (
					<NavBar handleLogout={handleLogout} />
				)}

				<Switch>
					<Route path='/signup'>
						<SignUp setUser={setUser} />
					</Route>
					<Route path='/home'>
						<Home />
					</Route>
					<Route path='/create_routine'>
						<CreateRoutine />
					</Route>
					<Route path='/progress'>
						<Progress />
					</Route>
					<Route path='/workout'>
						<Workout />
					</Route>
					<Route exact path='/'>
						<Login />
					</Route>
				</Switch>
			</Box>
		</div>
	)
}

export default App