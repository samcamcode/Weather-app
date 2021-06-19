

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const fetchWeather = (address) => {
    fetch(`http://localhost:3000/weather?address=${address}`)
    .then((unparsedData) => {
        unparsedData.json()
        .then((parsedData) => {
            if (parsedData.error) {
                messageOne.textContent = parsedData.error;
            }else {
                messageOne.textContent = parsedData.location;
                messageTwo.textContent = parsedData.forecast;
            }
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    e.preventDefault();
    const location = search.value;
    fetchWeather(location);
})