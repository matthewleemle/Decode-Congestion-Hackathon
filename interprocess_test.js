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
  console.log(message);
});


// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
  console.log('finished');
});
