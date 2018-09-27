import React from 'react'

import merdeka from '../Images/merdeka.png'
import asiangames from '../Images/asiangames.svg'
import {getTheme} from '../Utils/theme'

import style from '../Styles/login.css'

export default () => {
    const theme = getTheme()

    return (
        <div className={style.container}>
            {theme === 'notheme' && <div>
                <div className={style.bahaso}>bahaso</div>
                <div className={style.absen}>ABSEN</div>
            </div>}
            {theme === 'asiangames' && <div>
                <img className={style.asiangames} src={asiangames} alt="Asian Games" />
            </div>}
            {theme === 'merdeka' && <div>
                <img className={style.merdeka} src={merdeka} alt="Bahaso Absen" />
            </div>}
        </div>
    )
}
