import React from 'react'

import tableStyle from '../Styles/table.css'
import {getLateCount} from '../Utils/time'

class AttendanceHistoryItem extends React.Component {
    state = {
        isOpen: false
    }

    rowClicked = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {index, data} = this.props
        const cemilan = getLateCount(data.clockIn)
        const isOnLeave = !!data.clockInNote
        const row = [
            <tr key={index} className={isOnLeave ? tableStyle.onLeave : index % 2 === 0 ? tableStyle.even : ''} onClick={isOnLeave ? this.rowClicked : () => {}}>
                <td className={tableStyle.padding}>&nbsp;</td>
                <td>{data.desc}</td>
                <td className={tableStyle.center}><span className={cemilan > 0 ? tableStyle.late : ''}>{data.clockIn || '-'}</span></td>
                <td className={tableStyle.center}>{data.clockOut || '-'}</td>
                <td className={tableStyle.center}>{cemilan > 0 ? cemilan + ' pcs' : '-'}</td>
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
