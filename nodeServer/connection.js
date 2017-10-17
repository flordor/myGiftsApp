var mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/shipping_info');

var connection= mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log("we're connected!");
});

module.exports = connection;