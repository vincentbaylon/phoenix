import { Box, Typography, Divider, Button, useMediaQuery } from '@mui/material'
import { useHistory } from 'react-router-dom'
import FadeIn from 'react-fade-in'
import Quotes from './Quotes'
import Progress from './Progress'
import Account from './Account'
import DialogForm from './DialogForm'
import background from '../assets/background.jpeg'

function Home({ user, handleLogout, setUser }) {
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
				mt: 12,
				textAlign: 'center',
				width: matches ? '95%' : '50%',
				margin: 'auto',
			}}
		>
			<FadeIn>
				<Typography color='black' variant='h5' sx={{ m: 2, mb: 3 }}>
					{randomQuote}
				</Typography>
				{/* <Divider />
				<Typography>Action Items</Typography> */}
				<Divider />
				<Account user={user} setUser={setUser} />
				<Progress user={user} />
				{/* <Button variant='contained' color='secondary' onClick={handleDelete}>
					Delete Account
				</Button> */}
			</FadeIn>
		</Box>
	)
}

export default Home
