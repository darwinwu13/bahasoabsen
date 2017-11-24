import React from 'react'
import * as firebase from 'firebase'

import style from './style.css'

const Logout = () => (
    <section className={style.container}>
        <button className={style.btn} onClick={() => {firebase.auth().signOut()}}>LOGOUT</button>
    </section>
)

export default Logout
