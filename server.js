var app = require('./utils.js');
var port = process.env.PORT || 8888;


app.createApp().listen(port);

console.log('Server is now listening to port ' + port);


// Small MongoDB notes: 
// show dbs -- shows the database
// use [name] -- selects the database
// show collection -- shows all tables
// db.collectionName.find -- query all things within the table
