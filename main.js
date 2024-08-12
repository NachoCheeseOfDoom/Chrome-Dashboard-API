const showDateEl = document.getElementById('show-date')
const authorEl = document.getElementById('author')
const cryptoEl = document.getElementById('crypto-name')

const today = new Date()
showDateEl.innerHTML = `${today.getHours()}:${today.getMinutes()}`

const imgURL = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=forest'
const defaultImageUrl = "https://images.unsplash.com/photo-1544452963-52b43bbe2b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0ODE3MTd8&ixlib=rb-4.0.3&q=80&w=1080";
const coinURL = 'https://api.coingecko.com/api/v3/coins/'

fetch(imgURL)
    .then(response => response.json())
    .then(data => {
        // console.log(data.urls.regular)
        const imgUrl = data.urls.regular
        const author = data.user.name
        document.body.style.backgroundImage = `url("${imgUrl}")`
        // console.log('data: ', data.user.name)
        authorEl.innerHTML = `By: ${author}`
    })
    .catch(error => {
        console.log('No image found')
        // document.body.style.backgroundImage = `url("./wallpaper.jpeg")`
        document.body.style.backgroundImage = `url(${defaultImageUrl})`
        authorEl.innerHTML = `By: Mahdi Soheili`
    })


fetch(`${coinURL}/bitcoin`)
    .then(response => response.json())
    .then(data => {
        const coinName = data.name
        const coinImg = data.image.small
        html = `
        <img src="${coinImg} alt="${coinName} coin"/>
        <p>${coinName}</p>
        `
        console.log(data)
        cryptoEl.innerHTML = html
    })
    .catch(err => console.error(err));
