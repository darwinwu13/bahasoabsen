import React from 'react'
import * as firebase from 'firebase'

import merdeka from '../Images/merdeka.png'
import asiangames from '../Images/asiangames.svg'
import {getTheme} from '../Utils/theme'

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
        const theme = getTheme()

        return (
            <div className={style.container}>
                {theme === 'notheme' && <div>
                    <div className={style.bahaso}>bahaso</div>
                    <div className={style.absen}>ABSEN</div>
                    <div><button className={style.btn} onClick={this.login}>Sign in with Google</button></div>
                </div>}
                {theme === 'asiangames' && <div>
                    <img className={style.asiangames} src={asiangames} alt="Asian Games" />
                    <div><button className={style.btn} onClick={this.login}>Sign in with Google</button></div>
                </div>}
                {theme === 'merdeka' && <div>
                    <img className={style.merdeka} src={merdeka} alt="Bahaso Absen" />
                    <div><button className={style.btn + ' ' + style.merdeka} onClick={this.login}>Sign in with Google</button></div>
                </div>}
            </div>
        )
    }
}

export default Login
