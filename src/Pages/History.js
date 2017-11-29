import React from 'react'
import * as firebase from 'firebase'
import {Link} from 'react-router-dom'

import AttendanceHistory from '../Components/AttendanceHistory'
import AttendanceHistoryForm from '../Components/AttendanceHistoryForm'
import Footer from '../Components/Footer'
import {getStringDate, getDateWithFormat} from '../Utils/time'
import back from '../Images/back.svg'
import style from '../Styles/history.css'

class History extends React.Component {
    db = firebase.database()
    state = {
        type: 'user',
        users: {},
        history: {}
    }

    componentDidMount() {
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
        return (
            <div>
                <header className={style.header}>
                    <Link to="/home"><img className={style.back} src={back}/></Link>
                    KEPO MODE
                </header>
                <main className={style.container}>
                    <AttendanceHistoryForm onSubmit={this.onSubmit} users={this.state.users}/>
                    <AttendanceHistory data={this.state.history} type={this.state.type}/>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default History
