// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCB77sa_Oo1FrxFKc-7XNf8NQs370nvkuI',
	authDomain: 'phoenix-79a85.firebaseapp.com',
	projectId: 'phoenix-79a85',
	storageBucket: 'phoenix-79a85.appspot.com',
	messagingSenderId: '841768534636',
	appId: '1:841768534636:web:9eebc78a44de4ff2058e49',
	measurementId: 'G-4V9BB8LW6N',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default { app }
