const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

export const getStringDate = param => {
    const date = param || new Date()
    const year = date.getFullYear()
    const month = getDigitWithZero(date.getMonth() + 1)
    const day = getDigitWithZero(date.getDate())

    return year + '' + month + '' + day
}

export const getStringClock = param => {
    const time = param || new Date()
    const hour = getDigitWithZero(time.getHours())
    const minute = getDigitWithZero(time.getMinutes())

    return hour + ':' + minute
}

export const getDateWithFormat = string => {
    const year = parseInt(string.substr(0, 4))
    const month = parseInt(string.substr(4, 2))
    const date = parseInt(string.substr(6, 2))
    const day = (new Date(year, month - 1, date)).getDay()

    return `${getDayName(day).toUpperCase()} (${getDigitWithZero(date)}/${getDigitWithZero(month)})`
}

export const getLateCount = time => {
    const hm = time.split(':')
    const hour = hm[0]
    const minute = hm[1]

    if(hm[1] === '00') {
        return hm[0] - 10
    }

    return hm[0] - 9
}

export const getDigitWithZero = number => ('0' + number).slice(-2)
export const getDayName = day => hari[day]
export const getMonthName = month => bulan[month]
