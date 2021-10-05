import { Box, Typography, Divider, Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

import Quotes from './Quotes'
import Progress from './Progress'
import DialogForm from './DialogForm'
import background from '../assets/quote-bg2.jpeg'
import FadeIn from 'react-fade-in'

function Home({ user, handleLogout }) {
	const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)]

	const handleDelete = () => {
		fetch(`/users/${user.id}`, {
			method: 'DELETE',
		}).then(handleLogout)
	}

	return (
		<FadeIn>
			<Box sx={{ m: 2, mt: 10, textAlign: 'center' }}>
				<Typography color='black' variant='h5' sx={{ mb: 3 }}>
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
		</FadeIn>
	)
}

export default Home
