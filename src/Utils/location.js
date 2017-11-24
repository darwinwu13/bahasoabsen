export const inBahaso = (callback) => {
    if('geolocation' in navigator) {
        navigator.geolocation.watchPosition(
            pos => {
                const coor = {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                }

                const dist = distance(coor, bahasoCoord)

                if(dist <= 500)
                    callback(true)
                else
                    callback(false)
            },
            error => {
                console.log(error)
            },
            {
                enableHighAccuracy: true,
                timeout: 1000,
                maximumAge: 0
            }
        )
    } else {
        callback(false)
    }
}

const bahasoCoord = {
    lat: -6.1700137,
    lon: 106.8171998
}

const outsideBahaso = {
    lat: 10,
    lon: 10
}

const distance = (from, to) => {
    const toLat = Math.PI * to.lat/180
    const fromLat = Math.PI * from.lat/180
    const theta = to.lon - from.lon
    const radtheta = Math.PI * theta/180
    const dist = Math.sin(toLat) * Math.sin(fromLat) + Math.cos(toLat) * Math.cos(fromLat) * Math.cos(radtheta)
    return Math.acos(dist) * 60 * 1.1515 * 1.609344 * 1000 * 180/Math.PI
}
