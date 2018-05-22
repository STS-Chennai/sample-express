let express = require("express");
let ParseServer = require("parse-server").ParseServer;
let path = require("path");
let env = require("node-env-file");
let cookieParser = require("cookie-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

/* Log Entries */
let Logger = require("r7insight_node");
let log;

class Server {
  constructor() {
    this.app = express();
    Server.setUpEnv();
    this.parseServer = new ParseServer({
      databaseURI: process.env.MONGODB_URI,
      cloud: process.env.CLOUD_CODE_MAIN || __dirname + "/cloud/main.js",
      appId: process.env.APP_ID,
      masterKey: process.env.MASTER_KEY,
      serverURL: process.env.SERVER_URL,
      liveQuery: {
        classNames: []
      },
      publicServerURL: process.env.SERVER_URL,
    });
    this.setUp();
    Server.setUpDashboard();
  }

  setUp() {

    this.app.set("views", __dirname + "/views"); // general config
    this.app.set("view engine", "pug");

    this.app.use(cookieParser());

    // Serve static assets from the /public folder
    this.app.use("/public", express.static(path.join(__dirname, "/public")));

    // Serve the Parse API on the /parse URL prefix
    let mountPath = process.env.PARSE_MOUNT;
    this.app.use(mountPath, this.parseServer);

    this.app.get("/", function (req, res) {
      res.status(200).send("Server started  !");
    });

    this.app.use(require("./routes"));

    this.app.use(
      "/api-docs",
      function(req, res, next){
        log.info("This is a logging in swagger");
        next();
      },
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  start() {
    let port = process.env.PORT;
    let httpServer = require("http").createServer(this.app);
    httpServer.listen(port, function () {
      console.log(process.env.APP_NAME + " running on port " + port + ".");
    });

    // This will enable the Live Query real-time server
    ParseServer.createLiveQueryServer(httpServer);
  }

  static setUpEnv() {
    if(process.env.APP_ENV === "live")
      env(__dirname + "/.env");

    log = new Logger({
      token: process.env.LE_TOKEN,
      region: process.env.LE_REGION
    });
  }

  static setUpDashboard() {
    if(process.env.APP_ENV === "live") {
      let dashboard = `parse-dashboard --appId ${process.env.APP_ID} --host ${process.env.DASHBOARD_HOST} --port ${process.env.DASHBOARD_PORT} --masterKey ${process.env.MASTER_KEY} --serverURL ${process.env.SERVER_URL} --appName ${process.env.SERVER_NAME}`;
      console.log("Dashboard, run command");
      console.log(dashboard);
    }
  }
}

module.exports = Server;
