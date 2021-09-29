import { Box, Typography, Divider, Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

import Quotes from './Quotes'
import Progress from './Progress'
import DialogForm from './DialogForm'

function Home({ user, handleLogout }) {
	const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)]

	const handleDelete = () => {
		fetch(`/users/${user.id}`, {
			method: 'DELETE',
		}).then(handleLogout)
	}

	return (
		<Box sx={{ m: 5, mt: 10, textAlign: 'center' }}>
			<Typography variant='h5' sx={{ mb: 5 }}>
				{randomQuote}
			</Typography>
			<Divider />
			<Typography>Action Items</Typography>
			<Divider />
			<Progress user={user} />
			<Button variant='contained' color='secondary' onClick={handleDelete}>
				Delete Account
			</Button>
		</Box>
	)
}

export default Home
