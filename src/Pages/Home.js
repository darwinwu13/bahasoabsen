import React from 'react'
import * as firebase from 'firebase'

import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AttendanceForm from '../Components/AttendanceForm'
import AttendanceHistory from '../Components/AttendanceHistory'
import AttendanceHistoryForm from '../Components/AttendanceHistoryForm'
import Logout from '../Components/Logout'
import {getStringDate, getDateWithFormat} from '../Utils/time'
import {watchPosition, clearPosition} from '../Utils/location'

import style from '../Styles/home.css'

class Home extends React.Component {
    today = getStringDate()
    db = firebase.database()
    uid = this.props.user.uid
    state = {
        /* absen */
        workTime: null,
        present: false,

        /* history */
        type: 'user',
        users: {},
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

        this.db.ref('users').once('value').then(data => {
            const users = data.val()
            const today = getStringDate()

            try {
                Object.keys(users).forEach(key => {
                    const firstName = users[key].email.split('@')[0].split('.')[0]
                    users[key].alias = firstName.charAt(0).toUpperCase() + firstName.slice(1)
                })

                this.setState({users})
            } catch(exception) {
                this.setState({users: {}})
            }

            this.getAbsenByDate(today)
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

        if(this.state.type === 'user') {
            const firstName = this.props.user.email.split('@')[0].split('.')[0]
            const desc = firstName.charAt(0).toUpperCase() + firstName.slice(1)

            if(!history[this.uid]) history[this.uid] = {}
            history[this.uid] = workTime
            history[this.uid].desc = desc
        } else {
            if(!history[this.today]) history[this.today] = {}
            history[this.today] = workTime
            history[this.today].desc = getDateWithFormat(this.today)
        }

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

    getAbsenByDate = date => {
        this.db.ref(`absen/${date}`).once('value').then(data => {
            const history = data.val()
            const users = this.state.users

            try {
                Object.keys(history).forEach(key => {
                    try {
                        history[key].desc = users[key].alias
                    } catch(exception) {
                        history[key].desc = 'Unknown'
                    }
                })

                this.setState({history, type: 'user'})
            } catch(exception) {
                this.setState({history: {}, type: 'user'})
            }
        })
    }

    getAbsenByUser = (user, date) => {
        this.db.ref(`users_absen/${user}`).orderByKey().startAt(`${date}01`).endAt(`${date}31`).once('value').then(data => {
            const history = data.val()

            try {
                Object.keys(history).forEach(key => {
                    history[key].desc = getDateWithFormat(key)
                })

                this.setState({history, type: 'date'})
            } catch(exception) {
                this.setState({history: {}, type: 'date'})
            }
        })
    }

    onSubmit = (user, date) => {
        if(user === 'all') {
            this.getAbsenByDate(date)
        } else {
            this.getAbsenByUser(user, date)
        }
    }

    render() {
        const {user: {displayName, photoURL}} = this.props
        const {workTime, present, history, type} = this.state

        return (
            <div>
                <Header name={displayName} photo={photoURL}/>
                <main className={style.container}>
                    <AttendanceForm workTime={workTime} absen={this.absen} present={present}/>
                    <AttendanceHistoryForm onSubmit={this.onSubmit} users={this.state.users}/>
                    <AttendanceHistory data={history} type={type}/>
                    <Logout/>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default Home
