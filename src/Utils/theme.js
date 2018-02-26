export const isValentine = () => {
    const date = new Date()
    const month = date.getMonth()
    const day = date.getDate()

    if(month === 1 && day === 14)
        return true

    return false
}