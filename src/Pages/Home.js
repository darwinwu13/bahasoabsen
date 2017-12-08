import React from 'react'
import * as firebase from 'firebase'

import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AttendanceForm from '../Components/AttendanceForm'
import AttendanceHistory from '../Components/AttendanceHistory'
import Logout from '../Components/Logout'
import {getStringDate, getDateWithFormat} from '../Utils/time'
import {watchPosition, clearPosition} from '../Utils/location'

import style from '../Styles/home.css'

class Home extends React.Component {
    today = getStringDate()
    db = firebase.database()
    uid = this.props.user.uid
    state = {
        workTime: null,
        present: false,
        history: {}
    }

    componentWillMount() {
        this.watchId = watchPosition(status => {
            if(status !== this.state.present) {
                this.setState({present: status})
            }
        })
    }

    componentDidMount() {
        this.db.ref(`absen/${this.today}/${this.uid}`).once('value').then(snapshot => {
            const data = snapshot.val()
            const workTime = data ? data : {}

            this.setState({workTime})
        }).catch(error => {
            console.log(error.message)
        })

        this.db.ref(`users_absen/${this.uid}`).limitToLast(30).once('value').then(snapshot => {
            const history = snapshot.val()

            if(history)
                Object.keys(history).forEach(key => {
                    history[key].desc = getDateWithFormat(key)
                })

            this.setState({history})
        }).catch(error => {
            console.log(error.message)
        })
    }

    componentWillUnmount() {
        if(this.watchId && this.watchId !== -1) clearPosition(this.watchId)
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
        history[this.today].desc = getDateWithFormat(this.today)

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
        const {workTime, history, clockReady, present} = this.state

        return (
            <div>
                <Header name={displayName} photo={photoURL}/>
                <main className={style.container}>
                    <AttendanceForm workTime={workTime} absen={this.absen} present={present}/>
                    <AttendanceHistory data={history} type={'date'}/>
                    <Logout/>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default Home
