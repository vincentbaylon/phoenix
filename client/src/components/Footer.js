import { Typography } from '@mui/material'

const footerStyle = {
	marginTop: '1rem',
	padding: '1rem',
	position: 'fixed',
	bottom: 0,
	left: 0,
	width: '100%',
}

function Footer() {
	return (
		<div style={footerStyle}>
			<Typography>Created by Vince Baylon © 2021</Typography>
		</div>
	)
}

export default Footer
