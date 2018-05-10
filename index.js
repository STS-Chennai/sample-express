require("appdynamics").profile({
  controllerHostName: "cream2018050705021815.saas.appdynamics.com",
  controllerPort: 80,
  accountName: "cream2018050705021815",
  accountAccessKey: "m7s0242btgyi",
  applicationName: "Datavault",
  tierName: "API",
  nodeName: "process"
});

process.env.APP_ENV = "live";
let Server = require("./server");
const server = new Server();
server.start();
