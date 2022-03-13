const client = require('./client');

client.request('toggleMining', [], function(err, response) {
    if(err) throw err;
    console.log(response.result); // success!
  });