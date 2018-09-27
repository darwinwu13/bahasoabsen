import React from 'react'

import Quote from '../Quote'
import Today from '../Today'

import {getStringClock} from '../../Utils/time'
import {quotes} from '../../Utils/quotes'

import style from './style.css'

class AttendanceForm extends React.Component {
    state = {
        quote: null,
        note: ''
    }

    onClick = () => {
        const isWorking = this.getWorkingStatus()
        const type = isWorking ? 'clockOut' : 'clockIn'
        const time = getStringClock()

        this.props.absen(type, time, this.state.note).then(() => {
            const quote = quotes[Math.floor((Math.random() * quotes.length))]
            this.setState({
                note: '',
                quote
            })

            clearTimeout(this.to)
            this.to = setTimeout(() => {
                this.setState({quote: null})
            }, 7000)
        })
    }

    onChange = e => {
        this.setState({
            note: e.target.value
        })
    }

    renderQuote = () => {
        const {quote} = this.state
        if (!quote) return
        return <Quote quote={quote}/>
    }

    renderNote = () => {
        const {present} = this.props
        const {quote, note} = this.state
        const isWorking = this.getWorkingStatus()

        if (quote) return
        if (present) return
        if (isWorking) return

        return <div>
            <textarea
                className={style.textarea}
                rows="4"
                placeholder="Isi keterangan izin/sakit..."
                value={note}
                onChange={this.onChange}>
            </textarea>
        </div>
    }

    getWorkingStatus = () => {
        const {workTime} = this.props

        if(!workTime) return false
        return !!workTime.clockIn
    }

    render() {
        const {quote} = this.state
        const {present, workTime} = this.props
        const isWorking = this.getWorkingStatus()

        return (
            <section>
                <div className={style.container} style={quote ? {height: '550px'} : (!present && !isWorking) ? {height: '505px'} : {}}>
                    <Today workTime={workTime}/>
                    {this.renderQuote()}
                    {this.renderNote()}
                </div>
                <div className={style.btnContainer}>
                    <button className={style.btn} onClick={this.onClick} disabled={!workTime || (!present && !isWorking && !this.state.note)}>
                    {isWorking ? 'pulang' : present ? 'masuk' : 'i z i n'}
                    </button>
                </div>
            </section>
        )
    }
}

export default AttendanceForm
