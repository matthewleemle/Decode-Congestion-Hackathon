const fetch = require("node-fetch");





async function getRouteData(park1,park2,park3,destination){

  var transitData1 = await getTransitJSON(park1, destination);
  var transitData2 = await getTransitJSON(park2, destination);
  var transitData3 = await getTransitJSON(park3, destination);

    routes = []

    routes.push({
      "driving destination": park1,
      "Transit route": transitData1
    });

    routes.push({
      "driving destination": park2,
      "Transit route": transitData2
    });

    routes.push(
    {
    "driving destination": park3,
    "Transit route": transitData3
    });

    let routeData = {
      "routes": routes
    };

  return routeData;
}


async function getTransitData(origin,destination){
  var coordStrOrigin = await getcoordinatesJSON(origin);
  var coordStrDest = await getcoordinatesJSON(destination);

  var data = await getTransitJSON(coordStrOrigin,coordStrDest);

  return data;

}



async function getTransitJSON(origin, destination){
    let response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&key=AIzaSyCWle8TgNqMNLNqj3mdeXmkU7ej0xfZAyA`);
    let data = await response.json();

    let transitData = {
        "duration" : data.routes[0].legs[0].duration.text,
        "distance" : data.routes[0].legs[0].distance.text
      };


    let stepArr = [];

    for (var i=0, l = data.routes[0].legs[0].steps.length;i<l;i++){
     stepArr.push ({"instruction" : data.routes[0].legs[0].steps[i].html_instructions});
    }

    transitData.steps = stepArr;

    return transitData;

}


async function getcoordinatesJSON(location){
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCWle8TgNqMNLNqj3mdeXmkU7ej0xfZAyA`);
  let data = await response.json();
  var latitude=data.results[0].geometry.location.lat;
  var longitude=data.results[0].geometry.location.lng;


   return (latitude + "," + longitude);

 }

 module.exports = {
   getRouteData
 }
