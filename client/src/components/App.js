import '../App.css'
import { useEffect, useState } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/material'
import { Container } from '@mui/material'
import { useMediaQuery } from '@mui/material'

import CreateRoutine from './CreateRoutine'
import CreateExercise from './CreateExercise'
import Home from './Home'
import Login from './Login'
import NavBar from './NavBar'
import Progress from './Progress'
import SignUp from './SignUp'
import Workout from './Workout'
import Routine from './Routine'
import History from './History'

function App() {
	const history = useHistory()
	const location = useLocation()
	const [user, setUser] = useState({})
	const [loggedIn, setLoggedIn] = useState(false)
	const [routine, setRoutine] = useState({})
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		fetch('/me').then((response) => {
			if (response.ok) {
				response.json().then((user) => {
					setUser(user)
					setLoggedIn(true)
					if (location.pathname === '/') {
						history.push('/home')
					}
				})
			}
		})
	}, [])

	const handleLogout = () => {
		fetch('/logout', {
			method: 'DELETE',
		}).then(onLogout)
	}

	const onLogout = () => {
		setUser({})
		setLoggedIn(false)
		history.push('/')
	}

	return (
		<div>
			{console.log(user)}
			<CssBaseline />
			<Box style={{ height: '100%' }}>
				{location.pathname === '/' || location.pathname === '/signup' ? null : (
					<NavBar handleLogout={handleLogout} loggedIn={loggedIn} user={user} />
				)}

				<Switch>
					<Route path='/signup'>
						<SignUp setUser={setUser} />
					</Route>
					<Route path='/home'>
						<Home user={user} handleLogout={handleLogout} />
					</Route>
					<Route path='/routine'>
						<Routine user={user} setRoutine={setRoutine} routine={routine} />
					</Route>
					<Route path='/workout'>
						<Workout user={user} />
					</Route>
					<Route path='/create_exercise'>
						<CreateExercise routine={routine} />
					</Route>
					<Route path='/history'>
						<History />
					</Route>
					<Route exact path='/'>
						<Login setLoggedIn={setLoggedIn} setUser={setUser} />
					</Route>
				</Switch>
			</Box>
		</div>
	)
}

export default App
