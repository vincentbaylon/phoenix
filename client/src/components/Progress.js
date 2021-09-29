import { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import DialogForm from './DialogForm'

function Progress({ user }) {
	const [image, setImage] = useState('')
	const [labels, setLabels] = useState([''])
	const [checkIns, setCheckIns] = useState([0])

	useEffect(() => {
		fetch(`/users/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				let checkInArr = data?.user_progresses
				checkInArr?.forEach((p) => {
					setLabels([...labels, p.date])
					setCheckIns([...checkIns, p.weight])
				})

				const mapLabels = labels.map((l) => {
					return `"${l}"`
				})

				const url = `https://quickchart.io/chart?c={type:'line',data:{labels:[${labels}], datasets:[{label:'Weight',data:[${checkIns}], fill:false, borderColor:'orange'}]}}`

				fetch(url)
					.then((res) => res.blob())
					.then((imageBlob) => {
						const imageObjectUrl = URL.createObjectURL(imageBlob)
						setImage(imageObjectUrl)
					})
			})
	}, [])

	function refetchChart() {
		fetch(`/users/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				let checkInArr = data.user_progresses
				checkInArr.forEach((p) => {
					setLabels([...labels, p.date])
					setCheckIns([...checkIns, p.weight])
				})

				console.log(labels)
				console.log(checkIns)
				const mapLabels = labels.map((l) => {
					return `"${l}"`
				})

				const url = `https://quickchart.io/chart?c={type:'line',data:{labels:[${labels}], datasets:[{label:'Weight',data:[${checkIns}], fill:false, borderColor:'orange'}]}}`

				fetch(url)
					.then((res) => res.blob())
					.then((imageBlob) => {
						const imageObjectUrl = URL.createObjectURL(imageBlob)
						setImage(imageObjectUrl)
					})
			})
	}

	return (
		<Grid container alignItems='center' justifyContent='center' sx={{ mt: 2 }}>
			<Grid
				item
				xs={12}
				md={10}
				lg={5}
				sx={{
					height: '100%',
					width: '100%',
				}}
				style={{
					textAlign: 'center',
					// backgroundImage: `url(${image})`,
					// backgroundRepeat: 'no-repeat',
					// backgroundSize: 'contain',
					// backgroundPosition: 'center',
				}}
			>
				{image ? (
					<img
						src={image}
						alt='Progress chart'
						style={{ objectFit: 'contain', height: '100%', width: '100%' }}
					/>
				) : null}
			</Grid>
			<DialogForm user={user} refetchChart={refetchChart} />
		</Grid>
	)
}

export default Progress
