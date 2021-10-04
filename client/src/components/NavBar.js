import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar } from '@mui/material'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Typography } from '@mui/material'
import Drawer from './Drawer'
import { useMediaQuery } from '@mui/material'

function NavBar({ handleLogout, loggedIn, user }) {
	const [value, setValue] = useState(0)
	const matches = useMediaQuery('(max-width:900px)')
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const tabStyle = {
		color: 'white',
	}

	if (matches) {
		return (
			<>
				{console.log(matches)}
				<AppBar variant='fullWidth' sx={{ backgroundColor: 'black' }}>
					<Tabs
						centered
						value={value}
						onChange={handleChange}
						indicatorColor='secondary'
						textColor='secondary'
					>
						<Typography variant='h4' style={{ flex: 1, margin: '10px' }}>
							Phoenix
						</Typography>
						<Tab
							component={NavLink}
							to='/home'
							label={loggedIn ? user.username : 'Home'}
							style={tabStyle}
						/>
						<Drawer />
					</Tabs>
				</AppBar>
			</>
		)
	}

	return (
		<>
			{console.log(matches)}
			<AppBar variant='fullWidth' sx={{ backgroundColor: 'black' }}>
				<Tabs
					centered
					value={value}
					onChange={handleChange}
					indicatorColor='secondary'
					textColor='secondary'
				>
					<Typography variant='h4' style={{ flex: 1, margin: '10px' }}>
						Phoenix Fitness
					</Typography>
					<Tab
						component={NavLink}
						to='/home'
						label={loggedIn ? user.username : 'Home'}
						style={tabStyle}
					/>
					<Tab
						component={NavLink}
						to='/workout'
						label='Start Workout'
						style={tabStyle}
					/>
					<Tab
						component={NavLink}
						to='/history'
						label='History'
						style={tabStyle}
					/>
					<Tab
						component={NavLink}
						to='/routine'
						label='Routine'
						style={tabStyle}
					/>

					<Tab
						component={NavLink}
						to='/'
						label={loggedIn ? 'Logout' : 'Login'}
						onClick={loggedIn ? handleLogout : null}
						style={tabStyle}
					/>
				</Tabs>
			</AppBar>
		</>
	)
}

export default NavBar
