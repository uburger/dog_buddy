// const { name } = require("ejs"); 

//weather app api
var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')

// Grabbing the h and p tags from the DOM
var city = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');


//q = city. Incrementing the input value with the user data
// Then creating promises - 1) create a user response to tell them it's working
// 2) part 1 - print the api json data - console.log(data). part 2 - grab the json data from api call
// 3) Create error message if api call does not work 
button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=bdb754e7a2357a9c9a27bb7f367b3cd3')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name']; //key value pairsfrom Json data
        var tempValue = data['main']['temp']; 
        var descValue = data['weather'][0]['description']; //data was inside an array
        
        city.innerHTML =nameValue;
        temp.innerHTML =tempValue;
        desc.innerHTML =descValue;
    })
.catch(err => alert("Wrong city name, please try again"))
})
