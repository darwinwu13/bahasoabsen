import React from 'react'

import {getDigitWithZero, getDayName, getMonthName, getStringClock, getDuration} from '../../Utils/time'
import {getTheme} from '../../Utils/theme'
import style from './style.css'

class Today extends React.Component {
    state = {
        now: Date.now()
    }

    componentWillMount() {
        this.timeCounter = setInterval(() => {
            this.setState({now: Date.now()})
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.timeCounter)
    }

    getAttendanceStatus() {
        const {workTime} = this.props

        if(!workTime || !workTime.clockIn) return style.absen

        return `${style.absen} ${workTime.clockInNote ? style.onLeave : ''}`
    }

    render() {
        const theme = getTheme()
        const now = new Date(this.state.now)
        const {workTime} = this.props
        const day = getDayName(now.getDay())
        const month = getMonthName(now.getMonth())
        const date = `${getDigitWithZero(now.getDate())} ${month} ${now.getFullYear()}`
        const time = `${getDigitWithZero(now.getHours())}:${getDigitWithZero(now.getMinutes())}`
        const second = getDigitWithZero(now.getSeconds())
        let duration = ''

        if(workTime) {
            if(workTime.clockOut) {
                duration = getDuration(workTime.clockIn, workTime.clockOut)
            } else if(workTime.clockIn) {
                duration = getDuration(workTime.clockIn, getStringClock())
            }
        }

        return (
            <div>
                <div className={style.date}>
                    <div>{ day }</div>
                    <div>{ date }</div>
                </div>
                <div className={style.time + ' ' + style[theme]}>
                    {time}
                    <span className={style.second}>{second}</span>
                </div>
                <div style={{fontWeight: '700'}}>
                    {!duration || duration === '-' ? '-' : `( ${duration} )`}
                </div>
                <div className={this.getAttendanceStatus()}>
                    <div className={style.absenDetail}>
                        MASUK<br/>
                        <span className={style.absenTime}>{workTime && workTime.clockIn || '-'}</span>
                    </div>
                    <div className={style.absenDetail}>
                        KELUAR<br/>
                        <span className={style.absenTime}>{workTime && workTime.clockOut || '-'}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Today
