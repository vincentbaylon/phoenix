import '../App.css'
import { useEffect, useState } from 'react'

function App() {
  const [image, setImage] = useState('')

  useEffect(() => {
    const url =
      "https://quickchart.io/chart?c={type:'bar',data:{labels:['Q1','Q2','Q3','Q4'], datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}}"

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
    <div className='App'>
      <h2>Testing Quickchart API</h2>
      <br></br>
      <img src={image} />
    </div>
  )
}

export default App
