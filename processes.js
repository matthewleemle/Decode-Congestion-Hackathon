const maps = require("./googleAPI");




async function returnRoute(req,res){

  //var from = req.body.from;
  //var destination = req.body.destination;

  var destination = "900 W Georgia St, Vancouver, BC V6C 2W6";
  var park1 = "425 Robson St, Vancouver, BC V6B 6L9";
  var park2 = "578 Carrall St, Vancouver, BC V6B 5K2";
  var park3 = "1022 Davie St, Vancouver, BC V6E 1M3";

  var json = await maps.getRouteData(park1,park2,park3,destination)
    .then(function(json){
      console.log(json);
      res.status(200).send(json);
    })

}

module.exports = {
  returnRoute
}
