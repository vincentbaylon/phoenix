import { Box, Typography, Divider, Button, useMediaQuery } from '@mui/material'
import { useHistory } from 'react-router-dom'

import Quotes from './Quotes'
import Progress from './Progress'
import DialogForm from './DialogForm'
import background from '../assets/quote-bg2.jpeg'

function Home({ user, handleLogout }) {
	const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)]
	const matches = useMediaQuery('(max-width:900px)')

	const handleDelete = () => {
		fetch(`/users/${user.id}`, {
			method: 'DELETE',
		}).then(handleLogout)
	}

	return (
		<Box
			sx={{
				m: 2,
				mt: 10,
				textAlign: 'center',
				width: matches ? '95%' : '50%',
				margin: 'auto',
			}}
		>
			<Typography color='black' variant='h5' sx={{ m: 2, mb: 3 }}>
				{randomQuote}
			</Typography>
			<Divider />
			<Typography>Action Items</Typography>
			<Divider />
			<Button variant='contained' color='secondary' onClick={handleDelete}>
				Delete Account
			</Button>
		</Box>
	)
}

export default Home
