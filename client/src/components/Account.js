import { Typography, Grid } from '@mui/material'

import Form from './Form'

function Account({ user, setUser, handleLogout }) {
	return (
		<Grid direction='column' alignItems='flex-start' container sx={{ m: 2 }}>
			<Grid item>
				<Typography variant='h4'>{user.username}</Typography>
			</Grid>
			<Grid item>
				<Form user={user} setUser={setUser} handleLogout={handleLogout} />
			</Grid>
		</Grid>
	)
}

export default Account
