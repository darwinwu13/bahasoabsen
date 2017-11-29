import React from 'react'
import * as firebase from 'firebase'

import {getStringDate} from '../Utils/time'
import style from '../Styles/history.css'

class AttendanceHistoryForm extends React.Component {
    db = firebase.database()
    state = {
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
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const {user, date, month, year} = this.state

        if(user === 'all')
            this.props.onSubmit(user, `${year}${month}${date}`)
        else
            this.props.onSubmit(user, `${year}${month}`)
    }

    renderUsers = () => {
        const users = this.props.users
        const items = [<option key={'all'} value={'all'}>Semua</option>]

        for(const key in users) {
            const user = users[key]
            const name = user.alias

            items.push(
                <option key={key} value={key}>{name}</option>
            )
        }

        return items
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className={style.inputContainer}>
                    <select className={style.input} name="user" value={this.state.user} onChange={this.onChange}>{this.renderUsers()}</select>
                </div>
                <div className={style.inputContainer}>
                    {this.state.user === 'all' && <select className={`${style.input} ${style.small}`} name="date" value={this.state.date} onChange={this.onChange}>
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
                    </select>}
                    <select className={style.input} name="month" value={this.state.month} onChange={this.onChange}>
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
                    <select className={`${style.input} ${style.small}`} name="year" value={this.state.year} onChange={this.onChange}>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                    </select>
                </div>
                <div className={style.inputContainer}>
                    <button className={style.button}>kepo-in</button>
                </div>
            </form>
        )
    }
}

export default AttendanceHistoryForm
