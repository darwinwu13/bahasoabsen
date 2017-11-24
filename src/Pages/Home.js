import React from 'react'
import * as firebase from 'firebase'

import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AttendanceForm from '../Components/AttendanceForm'
import AttendanceHistory from '../Components/AttendanceHistory'
import Logout from '../Components/Logout'
import {getStringDate} from '../Utils/time'

import style from '../Styles/home.css'

class Home extends React.Component {
    today = getStringDate()
    db = firebase.database()
    uid = this.props.user.uid
    state = {
        workTime: {
            clockIn: '',
            clockInNote: '',
            clockOut: '',
            clockOutNote: ''
        },
        clockReady: false,
        history: {}
    }

    componentDidMount() {
        this.db.ref(`absen/${this.today}/${this.uid}`).once('value').then(data => {
            if(data.exists()) {
                this.setState({
                    workTime: data.val()
                })
            }
        }).then(() => {
            this.setState({
                clockReady: true
            })
        })

        this.db.ref(`users_absen/${this.uid}`).limitToLast(30).once('value').then(data => {
            this.setState({
                history: data.val()
            })
        })
    }

    absen = (type, time, note) => {
        // new data
        const workTime = {...this.state.workTime, [type]: time, [type + 'Note']: note}

        // update path
        const updates = {}
        updates[`/absen/${this.today}/${this.uid}`] = workTime
        updates[`/users_absen/${this.uid}/${this.today}`] = workTime

        // append new history
        const history = {...this.state.history}
        if(!history[this.today]) history[this.today] = {}
        history[this.today] = workTime

        // update data
        return this.db.ref().update(updates).then(() => {
            this.setState({
                workTime,
                history
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    render() {
        const {user: {displayName, photoURL}} = this.props
        const {workTime, history} = this.state

        return (
            <div>
                <Header name={displayName} photo={photoURL}/>
                <main className={style.container}>
                    <AttendanceForm workTime={workTime} absen={this.absen}/>
                    <AttendanceHistory data={history}/>
                    <Logout/>
                </main>
                <Footer year={(new Date()).getFullYear()}/>
            </div>
        )
    }
}

export default Home
