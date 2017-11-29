import React from 'react'
import * as firebase from 'firebase'
import {Link} from 'react-router-dom'

import style from './style.css'

const Logout = () => (
    <section className={style.container}>
        <Link className={style.btn} to="/login" onClick={() => {firebase.auth().signOut()}}>LOGOUT</Link>
    </section>
)

export default Logout
