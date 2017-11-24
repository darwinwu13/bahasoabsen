import React from 'react'

import AbsenHistoryItem from './AttendanceHistoryItem'

import tableStyle from '../Styles/table.css'

export default ({data, type}) => {
    let index = 1
    const histories = []
    for(const key in data) {
        histories.push(
            <AbsenHistoryItem
                key={key}
                index={index++}
                data={data[key]}
            />
        )
    }

    return (
        <section className={tableStyle.history}>
            <div className={tableStyle.table}>
                <table className={tableStyle.table}>
                    <thead className={tableStyle.thead}>
                    <tr>
                        <td className={tableStyle.padding}>&nbsp;</td>
                        <td>{type === 'date' ? 'TANGGAL' : 'NAMA'}</td>
                        <td className={tableStyle.center}>MASUK</td>
                        <td className={tableStyle.center}>PULANG</td>
                        <td className={tableStyle.center}>CEMILAN</td>
                        <td className={tableStyle.padding}>&nbsp;</td>
                    </tr>
                    </thead>
                    <tbody className={tableStyle.tbody}>
                    {histories}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
