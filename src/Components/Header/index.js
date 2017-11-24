import React from 'react'

import style from './style.css'

const Header = ({name, photo}) => (
    <header className={style.header}>
        <div className={style.photo}>
            <img className={style.image} src={photo} alt="Profile Picture"/>
        </div>
        <div className={style.greeting}>Welcome,</div>
        <div className={style.name}>{name}</div>
    </header>
)

export default Header
