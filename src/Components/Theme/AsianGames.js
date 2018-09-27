import React from 'react'

import style from './asiangames.css'

import asiangames from '../../Images/asiangames.svg'
import bahaso from '../../Images/bahaso.svg'

const AsianGames = props => (
    <div className={style.container}>
        <a className={style.panel} target="_blank" href="https://www.asiangames2018.id/schedule-results">
            <div className={style.panelLeft}>
                <img className={style.bahaso} src={bahaso} alt="Bahaso" />
                <span className={style.text}>MENDUKUNG</span>
                <img className={style.asiangames} src={asiangames} alt="Asian Games 2018" />
            </div>
            <div className={style.panelRight}>
                <span className={style.button}>LIHAT JADWAL</span>
            </div>
        </a>
    </div>
)

export default AsianGames
