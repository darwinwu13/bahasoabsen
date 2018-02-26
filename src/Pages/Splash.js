import React from 'react'

import { isValentine } from '../Utils/theme'

import style from '../Styles/login.css'

export default () => (
    <div className={style.container + ' ' + (isValentine() ? (' ' + style.valentine) : '')}>
        <div>
            <div className={style.bahaso + ' ' + (isValentine() ? style.valentine : '')}>bahaso</div>
            <div className={style.absen + ' ' + (isValentine() ? style.valentine : '')}>ABSEN</div>
        </div>
    </div>
)
