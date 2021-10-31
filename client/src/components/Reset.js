import { useEffect } from 'react'
import { Box } from '@mui/material'

function Reset({ props }) {
	return (
		<Box sx={{ mt: 10 }}>
			{console.log(props)}
			<h1>RESET PASSWORD</h1>
		</Box>
	)
}

export default Reset
