import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { useHistory } from 'react-router-dom'

export default function SwipeableTemporaryDrawer({ handleLogout }) {
	const history = useHistory()
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const handleClick = (e) => {
		if (e.target.innerText === 'Start Workout') {
			history.push('/workout')
		} else if (e.target.innerText === 'Logout') {
			handleLogout()
		} else {
			let value = e.target.innerText
			history.push(`/${value.toLowerCase()}`)
		}
	}

	const list = (anchor) => (
		<Box
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{['Home', 'Routine', 'Start Workout', 'History', 'Progress'].map(
					(text) => (
						<ListItem button key={text} onClick={handleClick}>
							<ListItemText primary={text} />
						</ListItem>
					)
				)}
			</List>
			<Divider />
			<List>
				{['Account', 'Logout'].map((text) => (
					<ListItem button key={text} onClick={handleClick}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<Box display='flex'>
			<Button onClick={toggleDrawer('right', true)} sx={{ color: 'white' }}>
				<MenuIcon />
			</Button>
			<SwipeableDrawer
				anchor={'right'}
				open={state['right']}
				onClose={toggleDrawer('right', false)}
				onOpen={toggleDrawer('right', true)}
			>
				{list('right')}
			</SwipeableDrawer>
		</Box>
	)
}
