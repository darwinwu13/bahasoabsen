import React from 'react'

import style from './style.css'

const Quote = ({quote: {text, author}}) => (
    <div className={style.container}>
        <div className={style.quote}>{`"${text}"`}</div>
        <div className={style.author}>{`- ${author}`}</div>
    </div>
)

export default  Quote
