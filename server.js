var app = require('./utils.js');
var port = process.env.PORT || 8888;

app.createApp().listen(port);

console.log('Server is now listening to port ' + port);

