import { useEffect, useState } from 'react'
import { Grid, useMediaQuery, Typography } from '@mui/material'
import DialogForm from './DialogForm'
import ProgressPicture from './ProgressPicture'

function Progress({ user }) {
	const [image, setImage] = useState('')
	const [checkIns, setCheckIns] = useState([])

	useEffect(() => {
		async function fetchRoutine() {
			const res = await fetch(`/users/${user.id}`)
			const parsedBody = await res.json()
			if (parsedBody.error) {
				alert(parsedBody.error)
			} else {
				let checkInArr = parsedBody.user_progresses
				let labelsArr = []
				let checkInsArr = []

				let sliceArr = checkInArr.slice(1).slice(-20)
				setCheckIns(sliceArr)

				sliceArr.forEach((p) => {
					labelsArr = [...labelsArr, p.date]
					checkInsArr = [...checkInsArr, p.weight]
				})
				const mapLabels = labelsArr.map((l) => {
					return `"${l}"`
				})

				const url = `https://quickchart.io/chart?c={type:'line',data:{labels:[${mapLabels}], datasets:[{label:'Weight',data:[${checkInsArr}], fill:false, borderColor:'orange'}]}}`

				fetch(url)
					.then((res) => res.blob())
					.then((imageBlob) => {
						const imageObjectUrl = URL.createObjectURL(imageBlob)
						setImage(imageObjectUrl)
					})
			}
		}
		fetchRoutine()
	}, [user])

	const refetchChart = async () => {
		const res = await fetch(`/users/${user.id}`)
		const parsedBody = await res.json()
		if (parsedBody.error) {
			alert(parsedBody.error)
		} else {
			let checkInArr = parsedBody.user_progresses
			let labelsArr = []
			let checkInsArr = []

			let sliceArr = checkInArr.slice(1).slice(-20)
			setCheckIns(sliceArr)

			sliceArr.forEach((p) => {
				labelsArr = [...labelsArr, p.date]
				checkInsArr = [...checkInsArr, p.weight]
			})
			const mapLabels = labelsArr.map((l) => {
				return `"${l}"`
			})

			const url = `https://quickchart.io/chart?c={type:'line',data:{labels:[${mapLabels}], datasets:[{label:'Weight',data:[${checkInsArr}], fill:false, borderColor:'orange'}]}}`

			fetch(url)
				.then((res) => res.blob())
				.then((imageBlob) => {
					const imageObjectUrl = URL.createObjectURL(imageBlob)
					setImage(imageObjectUrl)
				})
		}
	}

	return (
		<Grid
			container
			alignItems='center'
			justifyContent='center'
			sx={{ mt: 2, padding: 'env(safe-area-inset-bottom)' }}
		>
			<Grid
				item
				sx={{
					height: '100%',
					width: '100%',
				}}
				style={{
					textAlign: 'center',
				}}
			>
				{image ? (
					<img
						src={image}
						alt='Progress chart'
						style={{
							objectFit: 'contain',
							height: '100%',
							width: '100%',
						}}
					/>
				) : null}
			</Grid>
			<Grid item xs={12} sx={{ mb: 2 }}>
				<DialogForm user={user} refetchChart={refetchChart} />
			</Grid>
			<Grid item xs={12} sx={{ mb: 2 }}>
				<Typography align='left' fontWeight='bold'>
					Progress Pictures
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<ProgressPicture checkIns={checkIns} label='Previous' />
			</Grid>
			<Grid item xs={6}>
				<ProgressPicture checkIns={checkIns} label='Current' />
			</Grid>
		</Grid>
	)
}

export default Progress
