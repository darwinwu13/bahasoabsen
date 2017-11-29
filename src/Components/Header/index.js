import React from 'react'
import {Link} from 'react-router-dom'

import style from './style.css'
import kepo from '../../Images/kepo.svg'

const Header = ({name, photo}) => (
    <header className={style.header}>
        <div className={style.main}>
            <div className={style.photo}>
                <img className={style.image} src={photo} alt="Profile Picture"/>
            </div>
            <div className={style.greeting}>Welcome,</div>
            <div className={style.name}>{name}</div>
        </div>
        <div>
            <Link to="/history"><img src={kepo}/></Link>
        </div>
    </header>
)

export default Header
