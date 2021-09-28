import { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'

function Progress() {
	const [image, setImage] = useState('')

	useEffect(() => {
		const url =
			"https://quickchart.io/chart?c={type:'line',data:{labels:['Jan','Feb','Mar','Apr'], datasets:[{label:'Weight',data:[50,60,180,150], fill:false, borderColor:'orange'}]}}"

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
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				height: '100vw',
				width: '100vw',
			}}
		>
			<Grid
				container
				display='flex'
				justifyContent='center'
				sx={{ m: 5, mt: 10 }}
			>
				<Grid
					item
					xs={12}
					md={12}
					lg={12}
					sx={{
						height: '450px',
						width: '100%',
					}}
					style={{
						textAlign: 'center',
						backgroundImage: `url(${image})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						// backgroundPosition: 'center',
					}}
				>
					{/* <img
							src={image}
							alt='Progress chart'
							style={{ objectFit: 'contain' }}
						/> */}
				</Grid>
			</Grid>
		</Box>
	)
}

export default Progress
