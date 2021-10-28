import * as React from 'react'
import { useState } from 'react'
import { app } from '../firebase/firebase'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { breadcrumbsClasses, Input } from '@mui/material'
import { Stack, FormControl } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export default function FormDialog({ user, refetchChart }) {
	const allInputs = { imgUrl: '' }
	const [open, setOpen] = React.useState(false)
	const [weight, setWeight] = React.useState('')
	const [date, setDate] = React.useState(new Date())
	const [imageAsFile, setImageAsFile] = useState('')
	const [imageAsUrl, setImageAsUrl] = useState(allInputs)

	const handleImageAsFile = (e) => {
		if (e.target.files[0]) {
			const image = e.target.files[0]
			setImageAsFile((imageAsFile) => image)
		}
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setOpen(false)

		const storage = getStorage()
		const storageRef = ref(storage, `images/${uuidv4()}${imageAsFile.name}`)
		const uploadTask = uploadBytesResumable(storageRef, imageAsFile)
		let imageUrl

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				switch (snapshot.state) {
					case 'paused':
						break
					case 'running':
						break
				}
			},
			(error) => {
				switch (error.code) {
					case 'storage/unauthorized':
						break
					case 'storage/canceled':
						break
					case 'storage/unknown':
						break
				}
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageAsUrl((imageAsUrl) => downloadURL)
					imageUrl = downloadURL
					console.log(downloadURL)

					let formattedDate = format(date, 'M/d')

					const body = {
						user_id: user.id,
						weight: weight,
						date: formattedDate,
						image_url: imageUrl,
					}

					fetch('/user_progresses', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					})
						.then((res) => res.json())
						.then((data) => {
							if (data.error) {
								alert(data.error)
							} else {
								refetchChart()
							}
						})
				})
			}
		)
	}

	const handleChange = (e) => {
		setWeight(e.target.value)
	}

	return (
		<div>
			<Button variant='outlined' onClick={handleClickOpen}>
				Add Progress Check-In
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Check-In</DialogTitle>
				<DialogContent>
					<Stack spacing={2}>
						<DialogContentText fontWeight='bold'>
							Enter your current weight:
						</DialogContentText>
						<TextField
							autoFocus
							margin='dense'
							id='weight'
							label='Current Weight'
							type='number'
							variant='standard'
							value={weight}
							onChange={handleChange}
						/>
						<DialogContentText fontWeight='bold'>
							Add progress picture:
						</DialogContentText>
						<FormControl>
							<input
								capture='environment'
								type='file'
								onChange={handleImageAsFile}
								accept='image/*'
							/>
						</FormControl>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
