import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar } from '@mui/material'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'

function NavBar({ handleLogout }) {
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<>
			<AppBar variant='fullWidth' sx={{ backgroundColor: 'black' }}>
				<Tabs
					centered
					value={value}
					onChange={handleChange}
					indicatorColor='textPrimary'
					textColor='textSecondary'
					sx={{ right: 0 }}
				>
					<Tab component={NavLink} to='/home' label='Home' />
					<Tab component={NavLink} to='/progress' label='Progress' />
					<Tab component={NavLink} to='/create_routine' label='Routine' />
					<Tab component={NavLink} to='/workout' label='Workout' />
					<Tab
						component={NavLink}
						to='/'
						label='Logout'
						onClick={handleLogout}
					/>
				</Tabs>
			</AppBar>
		</>
	)
}

export default NavBar
