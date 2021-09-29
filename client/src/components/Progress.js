import { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'

function Progress() {
	const [image, setImage] = useState('')
	const [labels, setLabels] = useState(['Today', 'Tomorrow', 'Previous'])
	const [data, setData] = useState([150, 160, 170])

	useEffect(() => {
		const mapLabels = labels.map((l) => {
			return `"${l}"`
		})

		const url = `https://quickchart.io/chart?c={type:'line',data:{labels:[${mapLabels}], datasets:[{label:'Weight',data:[${data}], fill:false, borderColor:'orange'}]}}`

		fetch(url)
			.then((res) => res.blob())
			.then((imageBlob) => {
				console.log(imageBlob)
				const imageObjectUrl = URL.createObjectURL(imageBlob)
				console.log(imageObjectUrl)
				setImage(imageObjectUrl)
			})
	}, [])

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
				<img
					src={image}
					alt='Progress chart'
					style={{ objectFit: 'contain', height: '100%', width: '100%' }}
				/>
			</Grid>
		</Grid>
	)
}

export default Progress
