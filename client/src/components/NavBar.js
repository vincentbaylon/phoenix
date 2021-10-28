import { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AppBar, Box } from '@mui/material'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Typography } from '@mui/material'
import Drawer from './Drawer'
import { useMediaQuery } from '@mui/material'

function NavBar({ handleLogout, loggedIn, user }) {
	const history = useHistory()
	const [value, setValue] = useState(0)
	const matches = useMediaQuery('(max-width:900px)')
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const tabStyle = {
		color: 'white',
	}

	const handleLogo = () => {
		history.push('/home')
	}

	if (matches) {
		return (
			<>
				<AppBar
					variant='fullWidth'
					sx={{
						padding:
							'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
						backgroundColor: 'black',
					}}
				>
					<Tabs
						centered
						value={value}
						onChange={handleChange}
						indicatorColor='secondary'
						textColor='secondary'
					>
						<Box
							onClick={handleLogo}
							style={{ cursor: 'pointer', flex: 1, margin: '10px' }}
						>
							<Typography variant='h4'>Phoenix</Typography>
						</Box>
						<Drawer handleLogout={handleLogout} />
					</Tabs>
				</AppBar>
			</>
		)
	}

	return (
		<>
			<AppBar
				variant='fullWidth'
				sx={{
					padding:
						'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
					backgroundColor: 'black',
				}}
			>
				<Tabs
					centered
					value={value}
					onChange={handleChange}
					indicatorColor='secondary'
					textColor='secondary'
				>
					<Box
						onClick={handleLogo}
						style={{ cursor: 'pointer', flex: 1, margin: '10px' }}
					>
						<Typography variant='h4'>Phoenix Fitness</Typography>
					</Box>

					<Tab component={NavLink} to='/home' label='Home' style={tabStyle} />
					<Tab
						component={NavLink}
						to='/routine'
						label='Routine'
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
