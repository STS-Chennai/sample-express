const ParseRest = require('parse-rest-nodejs').default;
const BaseController = require('./base');

module.exports = class HomeController extends BaseController {
  constructor() {
    super();
  }

  index(req, res)
  {
    res.render('index');
  }
};
