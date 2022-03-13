const jayson = require('jayson');
const {toggleMining} = require('./mine');
const {PORT} = require('./config');

const node = jayson.server({
    toggleMining: function(_, callback) {
        callback(null, 'success!');
        toggleMining();
    }
});

node.http().listen(PORT);