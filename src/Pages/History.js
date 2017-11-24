import React from 'react'
import * as firebase from 'firebase'

import AttendanceHistory from '../Components/AttendanceHistory'
import {getStringDate, getDateWithFormat} from '../Utils/time'

class History extends React.Component {
    db = firebase.database()
    state = {
        users: {},
        history: {},
        year: '',
        month: '',
        date: '',
        user: 'all'
    }

    componentDidMount() {
        const today = getStringDate()
        this.setState({
            year: today.substr(0, 4),
            month: today.substr(4, 2),
            date: today.substr(6, 2)
        })

        this.db.ref('users').once('value').then(data => {
            this.setState({
                users: data.val()
            })

            this.getAbsenByDate()
        })
    }

    getAbsenByDate = () => {
        const {year, month, date} = this.state

        this.db.ref(`absen/${year + month + date}`).once('value').then(data => {
            const history = data.val()

            try {
                Object.keys(history).forEach(key => {
                    try {
                        history[key].desc = this.state.users[key].email.split('@')[0].split('.')[0]
                    } catch(exception) {
                        history[key].desc = 'Unknown'
                    }
                })

                this.setState({history})
            } catch(exception) {
                this.setState({history: {}})
            }
        })
    }

    getAbsenByUser = () => {
        const {user, year, month} = this.state

        this.db.ref(`users_absen/${user}`).orderByKey().startAt(`${year}${month}01`).endAt(`${year}${month}31`).once('value').then(data => {
            const history = data.val()

            try {
                Object.keys(history).forEach(key => {
                    history[key].desc = getDateWithFormat(key)
                })

                this.setState({history})
            } catch(exception) {
                this.setState({history: {}})
            }
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        if(this.state.user === 'all') {
            this.getAbsenByDate()
        } else {
            this.getAbsenByUser()
        }
    }


    renderUsers = () => {
        const users = this.state.users
        const items = [<option key={'all'} value={'all'}>semua</option>]

        for(const key in users) {
            const user = users[key]
            const name = user.email.split('@')[0].split('.')[0]

            items.push(
                <option key={key} value={key}>{name}</option>
            )
        }

        return items
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <select name="user" value={this.state.user} onChange={this.onChange}>{this.renderUsers()}</select>
                    <select name="date" value={this.state.date} onChange={this.onChange}>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                    <select name="month" value={this.state.month} onChange={this.onChange}>
                        <option value="01">JANUARI</option>
                        <option value="02">FEBRUARI</option>
                        <option value="03">MARET</option>
                        <option value="04">APRIL</option>
                        <option value="05">MEI</option>
                        <option value="06">JUNI</option>
                        <option value="07">JULI</option>
                        <option value="08">AGUSTUS</option>
                        <option value="09">SEPTEMBER</option>
                        <option value="10">OKTOBER</option>
                        <option value="11">NOVEMBER</option>
                        <option value="12">DESEMBER</option>
                    </select>
                    <select name="year" value={this.state.year} onChange={this.onChange}>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                    </select>
                    <button>kepo in</button>
                </form>
                <AttendanceHistory data={this.state.history} type={this.state.user === 'all' ? 'date' : 'user'}/>
            </div>
        )
    }
}

export default History
