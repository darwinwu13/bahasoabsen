export const getTheme = () => {
    const date = new Date()
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    
    if(year === 2018)
        if(month === 8 && day <= 2)
            return 'asiangames'
        else if(month === 7 && day >= 18)
            return 'asiangames'
        else if(month === 7 && day >= 15)
            return 'merdeka'

    return 'notheme'
}
