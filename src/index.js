import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import * as firebase from 'firebase'

import App from './App'
import './Styles/index.css'

const prodConfig = {
    apiKey: "AIzaSyCanCVOxrniZ_n3LybLsxxNwVU95g2T0pg",
    authDomain: "bahaso-absen.firebaseapp.com",
    databaseURL: "https://bahaso-absen.firebaseio.com",
    projectId: "bahaso-absen",
    storageBucket: "bahaso-absen.appspot.com",
    messagingSenderId: "456426625754"
}

const devConfig = {}

firebase.initializeApp(prodConfig)

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('container'))
