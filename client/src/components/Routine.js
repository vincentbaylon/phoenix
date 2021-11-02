import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import RoutineCards from './RoutineCards'
import FadeIn from 'react-fade-in'

import {
	Box,
	Card,
	Typography,
	Divider,
	Grid,
	useMediaQuery,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function Routine({ user, setRoutine }) {
	const history = useHistory()
	const [routineArr, setRoutineArr] = useState([])
	const [currentRoutine, setCurrentRoutine] = useState({})
	const matches = useMediaQuery('(max-width:900px)')

	useEffect(() => {
		async function fetchRoutine() {
			const res = await fetch(`/users/${user.id}`)
			const parsedBody = await res.json()
			if (parsedBody.error) {
				alert(parsedBody.error)
			} else {
				setRoutineArr(parsedBody.routines)
				const findCurrent = parsedBody.user_routines.find(
					(r) => r.current === true
				)
				if (findCurrent) {
					setCurrentRoutine(findCurrent)
				}
			}
		}
		fetchRoutine()
	}, [])

	const handleRoutine = () => {
		history.push('/create_routine')
	}

	const handleClick = (props) => {
		setRoutine(props)
		history.push('/edit_routine')
	}

	const displayRoutines = routineArr.map((r) => {
		return (
			<Grid item>
				<RoutineCards
					key={r.id}
					props={r}
					handleClick={handleClick}
					current={currentRoutine.id === r.id ? true : false}
				/>
			</Grid>
		)
	})

	return (
		<Box
			sx={{
				m: 2,
				mt: 10,
				width: matches ? '95%' : '50%',
				margin: 'auto',
			}}
		>
			<FadeIn>
				<Grid container>
					<Grid item>
						<Typography variant='h6' fontWeight='bold'>
							Set A Routine As "Current"
						</Typography>
						<Grid container direction='row'>
							<Grid item>
								<Card
									onClick={handleRoutine}
									sx={{
										width: '125px',
										height: '150px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										flexDirection: 'column',
										m: 1,
										p: 1,
									}}
								>
									<AddIcon fontSize='large' />
									<Typography align='center'>Create A Routine</Typography>
								</Card>
							</Grid>
							{displayRoutines}
						</Grid>
					</Grid>
					<Divider />
				</Grid>
			</FadeIn>
		</Box>
	)
}

export default Routine
