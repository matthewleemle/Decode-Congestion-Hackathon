const maps = require("./googleAPI");


async function returnRoute(req,res){

  var from = req.body.from;
  var destination = req.body.destination;

  var json = await maps.getTransitData(from,destination);

  res.status(200).send(json);




}

module.exports = {
  returnRoute
}
