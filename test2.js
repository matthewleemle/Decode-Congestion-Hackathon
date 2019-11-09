var origin = "49.26,-123.246";
var destination = "49.166,-123.136";



var json = getTransitJSON(origin,destination)
  .then(json=>console.log(json));


async function getTransitJSON(origin, destination){

    let response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&key=AIzaSyCWle8TgNqMNLNqj3mdeXmkU7ej0xfZAyA`);
    let data = await response.json();


    transitData = {};
    let routes =  [];

    for (var j=0, l = data.routes.length;j<l;j++){

      let routeData = {
          "duration" : data.routes[0].legs[0].duration.text,
          "distance" : data.routes[0].legs[0].distance.text,
        };

        let stepArr = [];

        for (var i=0, l = data.routes[0].legs[0].steps.length;i<l;i++){
         stepArr.push ({"instruction" : data.routes[0].legs[0].steps[i].html_instructions});
        }

        routeData.steps = stepArr;
        routes.push(routeData);
    }

    transitData = {
      "routes": routes
    };


    return transitData;

  }
