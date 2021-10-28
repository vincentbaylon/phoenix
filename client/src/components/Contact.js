import { Typography, Button, Box, Grid } from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function Contact() {
	const history = useHistory()

	const handleEmail = () => {
		window.location = 'mailto:vincentbaylon@gmail.com'
	}

	const openInNewTab = (url) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
		if (newWindow) newWindow.opener = null
	}

	const handleLinkedIn = () => {
		openInNewTab('https://www.linkedin.com/in/vincentbaylon/')
	}

	const handleTwitter = () => {
		openInNewTab('https://twitter.com/vincebaylon_')
	}

	const handleInstagram = () => {
		openInNewTab('https://www.instagram.com/vincebaylon_/')
	}

	return (
		<Box sx={{ p: 2, m: 2, mt: 10 }}>
			<Typography fontWeight='bold' variant='h5'>
				Contact Me
			</Typography>
			<Typography variant='p'>
				Please let me know if you find any bugs or have any suggestions to
				improve the app.
			</Typography>
			<Grid container justifyContent='center' sx={{ mt: 5 }}>
				<Grid item>
					<Button size='large' onClick={handleEmail}>
						<EmailIcon fontSize='large' />
					</Button>
				</Grid>
				<Grid item>
					<Button size='large' onClick={handleLinkedIn}>
						<LinkedInIcon fontSize='large' />
					</Button>
				</Grid>
				<Grid item>
					<Button size='large' onClick={handleTwitter}>
						<TwitterIcon fontSize='large' />
					</Button>
				</Grid>
				<Grid item>
					<Button size='large' onClick={handleInstagram}>
						<InstagramIcon fontSize='large' />
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Contact
