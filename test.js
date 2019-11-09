const fetch = require("node-fetch");


var route;

var origin = "49.28,-123.1171";
var destination = "49.166,-123.136";

var json = getTransitJSON(origin,destination)
  .then(json=>console.log(json));


async function getBikingJSON(origin, destination){

  let response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=bicycling&key=AIzaSyCWle8TgNqMNLNqj3mdeXmkU7ej0xfZAyA`);
  let data = await response.json();

  var json = {
     "duration" : data.routes[0].legs[0].duration.text,
     "distance" : data.routes[0].legs[0].distance.text,
   };


  return json;

}

async function getTransitJSON(origin, destination){

  let response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&key=AIzaSyCWle8TgNqMNLNqj3mdeXmkU7ej0xfZAyA`);
  let data = await response.json();

  var transitData = {
     "duration" : data.routes[0].legs[0].duration.text,
     "distance" : data.routes[0].legs[0].distance.text,
   };


  var stepArr = []

  for (var i=0, l = data.routes[0].legs[0].steps.length;i<l;i++){
   stepArr.push ({"instruction" : data.routes[0].legs[0].steps[i].html_instructions});
  }


  transitData.steps = stepArr;


  return transitData;

}
async function getcoordinatesJSON(origin){

  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${origin}&key=YOUR_API_KEY`);
  let data = await response.json();

  var json = {
     "latitude" : data.results[0].geometry.location.lat,
     "longitude" : data.results[0].geometry.location.lng
   };


  return json;

}
