let express = require('express');
let ParseServer = require('parse-server').ParseServer;
let path = require('path');
let env = require('node-env-file');
let cookieParser = require('cookie-parser');
//let config = require('./config.json');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

class Server {
  constructor() {
    this.app = express();
    Server.setUpEnv();
    this.parseServer = new ParseServer({
      databaseURI: process.env.MONGODB_URI,
      cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
      appId: process.env.APP_ID,
      masterKey: process.env.MASTER_KEY,
      serverURL: process.env.SERVER_URL,
      liveQuery: {
          classNames: []
      },
      publicServerURL: process.env.PUBLICSERVERURL,
      push: {
        android: {
          senderId: process.env.SENDER_ID,
          apiKey: process.env.FCM_API_KEY
        }
      }
    });
    this.setUp();
    Server.setUpDashboard();
  }

  setUp() {

    this.app.set('views', __dirname + '/views'); // general config
    this.app.set('view engine', 'pug');

    this.app.use(cookieParser());

    // Serve static assets from the /public folder
    this.app.use('/public', express.static(path.join(__dirname, '/public')));

    // Serve the Parse API on the /parse URL prefix
    let mountPath = process.env.PARSE_MOUNT;
    this.app.use(mountPath, this.parseServer);

    this.app.get('/', function (req, res) {
      res.status(200).send('Server started successfully!');
    });

    this.app.use(require('./routes'));

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.use('/case-list', function(req, res){
      res.send({"status":1, "message":"end point created successfully"})
    });

  }

  start() {
    let port = process.env.PORT;
    let httpServer = require('http').createServer(this.app);
    httpServer.listen(port, function () {
      console.log(process.env.SERVER_NAME + ' running on port ' + port + '.');
    });

    // This will enable the Live Query real-time server
    ParseServer.createLiveQueryServer(httpServer);
  }

  static setUpEnv() {
    env(__dirname + '/.env');
  }

  static setUpDashboard() {
    let dashboard = `parse-dashboard --appId ${process.env.APP_ID} --host ${process.env.DASHBOARD_HOST} --port ${process.env.DASHBOARD_PORT} --masterKey ${process.env.MASTER_KEY} --serverURL ${process.env.SERVER_URL} --appName ${process.env.SERVER_NAME}`;
    console.log("Dashboard, run command");
    console.log(dashboard);
  }
}

const server = new Server();
server.start();
