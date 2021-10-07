import { Button, Typography, TextField, Grid, Box } from '@mui/material'

import Form from './Form'

function Account({ user, setUser }) {
	return (
		<Grid direction='column' alignItems='flex-start' container sx={{ m: 2 }}>
			<Grid item>
				<Typography variant='h4'>{user.username}</Typography>
			</Grid>
			<Grid item>
				<Form user={user} setUser={setUser} />
			</Grid>
		</Grid>
	)
}

export default Account
