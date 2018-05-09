require("appdynamics").profile({
  controllerHostName: 'cream2018050705021815.saas.appdynamics.com',
  controllerPort: 80,

  // If SSL, be sure to enable the next line
  controllerSslEnabled: false,
  accountName: 'cream2018050705021815',
  accountAccessKey: 'm7s0242btgyi',
  applicationName: 'Datavault',
  tierName: 'api',
  nodeName: 'process' // The controller will automatically append the node name with a unique number
});

process.env.APP_ENV = "live";
let Server = require('./server');
const server = new Server();
server.start();
