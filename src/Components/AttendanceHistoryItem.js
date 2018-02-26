import React from 'react'

import tableStyle from '../Styles/table.css'
import {getStringDate, getStringClock, getDuration} from '../Utils/time'

class AttendanceHistoryItem extends React.Component {
    state = {
        isOpen: false
    }

    rowClicked = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {index, data} = this.props
        const isOnLeave = !!data.clockInNote
        let duration = '-'

        if(data.clockOut) {
            duration = getDuration(data.clockIn, data.clockOut)
        } else {
            if(data.key.length > 8 || data.key === getStringDate()) {
                duration = getDuration(data.clockIn, getStringClock())
            }
        }

        const row = [
            <tr key={index} className={isOnLeave ? tableStyle.onLeave : index % 2 === 0 ? tableStyle.even : ''} onClick={isOnLeave ? this.rowClicked : () => {}}>
                <td className={tableStyle.padding}>&nbsp;</td>
                <td>{data.desc}</td>
                <td className={tableStyle.center}>{data.clockIn || '-'}</td>
                <td className={tableStyle.center}>{data.clockOut || '-'}</td>
                <td className={tableStyle.duration}>{duration}</td>
                <td className={tableStyle.padding}>&nbsp;</td>
            </tr>
        ]

        if(this.state.isOpen)
            row.push(
                <tr key={index+30} className={tableStyle.detail}>
                    <td className={tableStyle.padding}>&nbsp;</td>
                    <td colSpan={4}>
                        <b>{data.clockIn}<br/></b>
                        {data.clockInNote}
                        {data.clockOut && <b><br/><br/>{data.clockOut}</b>}
                    </td>
                    <td className={tableStyle.padding}>&nbsp;</td>
                </tr>
            )

        return row
    }
}

export default AttendanceHistoryItem
