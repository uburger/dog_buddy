(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const WEATHER_API_KEY = "";

// export default WEATHER_API_KEY; 

module.exports = WEATHER_API_KEY;
},{}],2:[function(require,module,exports){
// import WEATHER_API_KEY from "./apiKey.mjs"; 

const WEATHER_API_KEY = require('./apiKey.js');

// require('dotenv').config()
// dotenv.config()
// console.log(process.env.WEATHER_API_KEY)
// var API_KEY = process.env.WEATHER_API_KEY; 


var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')

// Grabbing the p tags from the DOM
var city = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');


//q = city. Incrementing the input value with the user data
// Then creating promises - 1) create a user response to tell them it's working
// 2) part 1 - print the api json data - console.log(data). part 2 - grab the json data from api call
// 3) Create error message if api call does not work 
button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid='+WEATHER_API_KEY)
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name']; //key value pairs from Json data 
        var tempValue = data['main']['temp']; 
        var descValue = data['weather'][0]['description']; //data was inside an array
       
        city.innerHTML =nameValue;
        temp.innerHTML =tempValue;
        desc.innerHTML =descValue;
    })
.catch(err => alert("Wrong city name, please try again"))
})


},{"./apiKey.js":1}]},{},[2]);
