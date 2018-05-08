let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let AuthenticationController = require("../controllers/authentication");
let HomeController = require('../controllers/HomeController');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.route('/')
  .get(new HomeController().index)

module.exports = router;
