const showDateEl = document.getElementById('show-date')
const authorEl = document.getElementById('author')
const cryptoEl = document.getElementById('crypto')
const weatherEl = document.getElementById('weather')

setInterval(() => {
    const today = new Date().toLocaleTimeString([], { timeStyle: 'short' })
    showDateEl.innerHTML = `${today}`
}, 1000);

const imgURL = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=dark-smooth'
const defaultImageUrl = "https://images.unsplash.com/photo-1544452963-52b43bbe2b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0ODE3MTd8&ixlib=rb-4.0.3&q=80&w=1080";
const coinURL = 'https://api.coingecko.com/api/v3/coins/'
try {
    const res = await fetch(imgURL)
    const data = await res.json()
    const imgUrl = data.urls.full
    const author = data.user.name
    document.body.style.backgroundImage = `url("${imgUrl}")`
    authorEl.innerHTML = `By: ${author}`

} catch (error) {
    document.body.style.backgroundImage = `url("./wallpaper.jpeg")`
    // document.body.style.backgroundImage = `url(${defaultImageUrl})`
    // authorEl.innerHTML = `By: Mahdi Soheili`

}

try {
    const response = await fetch(`${coinURL}/bitcoin`)
    if (!response.ok) {
        throw Error('Not getting any crypto coin data')
    }
    const coinData = await response.json()
    const coinName = coinData.name
    const coinImg = coinData.image.small
    const currentPrice = coinData.market_data.current_price.mxn;
    const highPrice = coinData.market_data.high_24h.mxn;
    const lowPrice = coinData.market_data.low_24h.mxn;
    let html = `
                <div class="crypto-container" id="crypto">
                    <div class="crypto-name" id="crypto-name">
                        <img src="${coinImg} alt="${coinName} coin"/>
                        <p>${coinName}</p>
                    </div>
                    <div class="crypto-info-container" id="crypto-info">
                        <div class="crypto-info">
                            <i class="fa-solid fa-coins golden"></i>
                            <span>$${currentPrice}</span>
                        </div>
                        <div class="crypto-info">
                            <i class="fa-solid fa-up-long up"></i>
                            <span>$${highPrice}</span>
                        </div>
                        <div class="crypto-info">
                            <i class="fa-solid fa-down-long down"></i> 
                            <span>$${lowPrice}</span>
                        </div>
                    </div>
                </div>
            `
    cryptoEl.innerHTML = html

} catch (error) {
    console.error(error)
}


async function success(pos) {
    const crd = pos.coords;
    const latitude = crd.latitude;
    const longitude = crd.longitude;

    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units='metric'`)
        if (!res.ok) {
            throw Error('Error fetching weather data');
        }
        const data = await res.json()
        const iconId = data.weather[0].icon;
        const icon = `https://openweathermap.org/img/wn/${iconId}@2x.png`
        const locationName = data.name
        const temperatureCel = Math.floor(data.main.temp - 273.15)

        let html = `
                    <div class="weather-icon-group">
                        <img class="weather-icon" src="${icon}" alt="${data.weather[0].description} in ${locationName}"/>
                        <p class="weather-temperature">${temperatureCel}°c</p>
                    </div>
                    <p class="weather-location">${locationName}</p>
                `
        weatherEl.innerHTML = html

    } catch (error) {
        console.error(error);
    }

}

function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);