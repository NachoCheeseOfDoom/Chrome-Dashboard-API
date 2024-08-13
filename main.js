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

fetch(imgURL)
    .then(response => response.json())
    .then(data => {
        const imgUrl = data.urls.full
        const author = data.user.name
        document.body.style.backgroundImage = `url("${imgUrl}")`
        authorEl.innerHTML = `By: ${author}`
    })
    .catch(error => {
        // document.body.style.backgroundImage = `url("./wallpaper.jpeg")`
        document.body.style.backgroundImage = `url(${defaultImageUrl})`
        authorEl.innerHTML = `By: Mahdi Soheili`
    })


fetch(`${coinURL}/bitcoin`)
    .then(response => response.json())
    .then(data => {
        const coinName = data.name
        const coinImg = data.image.small
        const currentPrice = data.market_data.current_price.mxn;
        const highPrice = data.market_data.high_24h.mxn;
        const lowPrice = data.market_data.low_24h.mxn;
        html = `
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
    })
    .catch(err => console.error(err));

function success(pos) {
    const crd = pos.coords;
    const latitude = crd.latitude;
    const longitude = crd.longitude;

    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units='metric'`)
        .then(res => {
            if (!res.ok) {
                throw Error('Error fetching weather data');
            }
            return res.json()
        })
        .then(data => {
            const iconId = data.weather[0].icon;
            const icon = `https://openweathermap.org/img/wn/${iconId}@2x.png`
            const locationName = data.name
            const temperatureCel = Math.floor(data.main.temp - 273.15)
            console.log(data)

            let html = `
                <div class="weather-icon-group">
                    <img class="weather-icon" src="${icon}" alt="${data.weather[0].description} in ${locationName}"/>
                    <p class="weather-temperature">${temperatureCel}°c</p>
                </div>
                <p class="weather-location">${locationName}</p>
            `
            weatherEl.innerHTML = html
        })
        .catch(err => console.error(err));
}

function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);