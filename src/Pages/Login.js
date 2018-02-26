import React from 'react'
import * as firebase from 'firebase'

import { isValentine } from '../Utils/theme'

import style from '../Styles/login.css'

class Login extends React.Component {
    login = () => {
        const provider = new firebase.auth.GoogleAuthProvider()

        if(/Android|iPhone|iPad/i.test(navigator.userAgent)) {
            firebase.auth().signInWithRedirect(provider).catch(error => {
                console.log(error.message)
            })
        } else {
            firebase.auth().signInWithPopup(provider).catch(error => {
                console.log(error.message)
            })
        }
    }

    render() {
        return (
            <div className={style.container + ' ' + (isValentine() ? (' ' + style.valentine) : '')}>
                <div>
                    <div className={style.bahaso + ' ' + (isValentine() ? (' ' + style.valentine) : '')}>bahaso</div>
                    <div className={style.absen + ' ' + (isValentine() ? (' ' + style.valentine) : '')}>ABSEN</div>
                    <div><button className={style.btn + ' ' + (isValentine() ? (' ' + style.valentine) : '')} onClick={this.login}>Sign in with Google</button></div>
                </div>
            </div>
        )
    }
}

export default Login
