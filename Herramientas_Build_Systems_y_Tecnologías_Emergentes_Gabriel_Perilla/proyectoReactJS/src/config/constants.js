import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC5lIRGwqwCOvwrz3Sm-seBGj3EP0fCWNk",
  authDomain: "proyectoangular-948be.firebaseapp.com",
  databaseURL: "https://proyectoangular-948be.firebaseio.com",
  projectId: "proyectoangular-948be",
  storageBucket: "proyectoangular-948be.appspot.com",
  messagingSenderId: "751970517142"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const refprod = firebase.database().ref('productos')
export const refcar = firebase.database().ref('itemcar')
export const firebaseAuth = firebase.auth