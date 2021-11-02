import '../App.css'
import { useEffect, useState } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import FadeIn from 'react-fade-in'

import CreateRoutine from './CreateRoutine'
import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'
import Home from './Home'
import Login from './Login'
import NavBar from './NavBar'
import Progress from './Progress'
import SignUp from './SignUp'
import Workout from './Workout'
import Routine from './Routine'
import History from './History'
import EditRoutine from './EditRoutine'
import Contact from './Contact'
import Reset from './Reset'

function App() {
	const history = useHistory()
	const location = useLocation()
	const [user, setUser] = useState({})
	const [loggedIn, setLoggedIn] = useState(false)
	const [routine, setRoutine] = useState({})
	const matches = useMediaQuery('(max-width:900px)')
	const [historyWorkout, setHistoryWorkout] = useState({})

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

	const divStyle = {
		width: '100%',
		height: '90vw',
	}

	return (
		<div style={divStyle}>
			<CssBaseline />
			<Box style={{ height: '100%' }}>
				{location.pathname === '/' || location.pathname === '/signup' ? null : (
					<NavBar handleLogout={handleLogout} loggedIn={loggedIn} user={user} />
				)}
				<Switch>
					<Route path='/signup'>
						<SignUp setUser={setUser} setLoggedIn={setLoggedIn} />
					</Route>
					<Route path='/home'>
						<Home user={user} setUser={setUser} handleLogout={handleLogout} />
					</Route>
					<Route path='/routine'>
						<Routine
							user={user}
							setRoutine={setRoutine}
							routine={routine}
							handleLogout={handleLogout}
						/>
					</Route>
					<Route path='/workout'>
						<Workout
							user={user}
							historyWorkout={historyWorkout}
							setHistoryWorkout={setHistoryWorkout}
						/>
					</Route>
					<Route path='/create_exercise'>
						<CreateExercise routine={routine} />
					</Route>
					<Route path='/create_routine'>
						<CreateRoutine
							routine={routine}
							user={user}
							setRoutine={setRoutine}
						/>
					</Route>
					<Route path='/create_workout'>
						<CreateWorkout routine={routine} />
					</Route>
					<Route path='/history'>
						<History user={user} />
					</Route>
					<Route path='/progress'>
						<Progress user={user} />
					</Route>
					<Route path='/edit_routine'>
						<EditRoutine
							setRoutine={setRoutine}
							routine={routine}
							user={user}
						/>
					</Route>
					<Route path='/contact'>
						<Contact />
					</Route>
					<Route path='/password/reset/:token'>
						<Reset />
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
