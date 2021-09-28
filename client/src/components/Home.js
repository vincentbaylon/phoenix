import { Box, Typography, Divider } from '@mui/material'

import Quotes from './Quotes'
import Progress from './Progress'

function Home() {
	const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)]

	return (
		<Box sx={{ m: 5, mt: 10, textAlign: 'center' }}>
			<Typography variant='h5' sx={{ mb: 5 }}>
				{randomQuote}
			</Typography>
			<Divider />
			<Typography>Action Items</Typography>
			<Divider />
			<Progress />
		</Box>
	)
}

export default Home
