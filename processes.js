const maps = require("./googleAPI");
const fetch = require("node-fetch");



async function returnRoute(req,res){

  var from = req.body.from;
  var destination = req.body.destination;


    var origin_coords = await getcoordinatesJSON(from)
      .then(async function(){
            var dest_coords = await getcoordinatesJSON(destination)
              .then(async function(){
                var parks = await getparking(origin_coords,dest_coords)
                  .then(async function(){

                      console.log(parks);
                      var park1 = "425 Robson St, Vancouver, BC V6B 6L9";
                      var park2 = "578 Carrall St, Vancouver, BC V6B 5K2";
                      var park3 = "1022 Davie St, Vancouver, BC V6E 1M3";

                      var json = await maps.getRouteData(park1,park2,park3,destination)
                        .then(function(json){
                          console.log(json);
                          res.status(200).send(json);
                        });

                      });
              });
      });
}


async function getparking(origin,destination){
      let {PythonShell} = require('python-shell');

      let options = {
        mode: 'json'
      }

      let origin_coords = {
        "latitude": 12,
        "longitude": 19
      };

      let dest_coords = {
          "latitude": 25,
          "longitude": 29
      };

      let pyshell = new PythonShell('test.py',options);


      // sends a message to the Python script via stdin
      pyshell.send(origin_coords);
      pyshell.send(dest_coords);

      pyshell.on('message', function (message) {
          pyshell.end(callback(message));
        });
}

function callback(message){
  new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(message);
  }, 300);
  });

}





async function getcoordinatesJSON(location){
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCWle8TgNqMNLNqj3mdeXmkU7ej0xfZAyA`);
  let data = await response.json();
  var latitude=data.results[0].geometry.location.lat;
  var longitude=data.results[0].geometry.location.lng;

  var coord = {
    "latitude": latitude,
    "longitude": longitude
  }
   return coord;

 }

 async function getaddressJSON(coord){
   let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=AIzaSyCWle8TgNqMNLNqj3mdeXmkU7ej0xfZAyA`);
   let data = await response.json();
   var latitude=coord.latitude;
   var longitude=coord.longitude;
   var address=data.results[0].formatted_address;

   return address;

 }

module.exports = {
  returnRoute
}
