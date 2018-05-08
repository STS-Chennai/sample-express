require('newrelic');
process.env.APP_ENV = "live";
let Server = require('./server');
const server = new Server();
server.start();
