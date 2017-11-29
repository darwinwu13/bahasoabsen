import React from 'react'

import style from './style.css'

const Footer = () => (
    <footer className={style.footer}>Bahaso Absen &copy; {(new Date()).getFullYear()}</footer>
)

export default Footer
