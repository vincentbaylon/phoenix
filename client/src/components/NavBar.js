import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar } from '@mui/material'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Typography } from '@mui/material'

function NavBar({ handleLogout }) {
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const tabStyle = {
		color: 'white',
	}

	return (
		<>
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
					<Tab component={NavLink} to='/home' label='Home' style={tabStyle} />
					<Tab
						component={NavLink}
						to='/workout'
						label='Start Workout'
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
						label='Logout'
						onClick={handleLogout}
						style={tabStyle}
					/>
				</Tabs>
			</AppBar>
		</>
	)
}

export default NavBar
