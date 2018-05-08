const ParseRest = require('parse-rest-nodejs').default;
const BaseController = require('./base');

module.exports = class AuthenticationController extends BaseController {
    constructor() {
        super();
    }

    authenticate(req, res, next) {
        const parseRest = new ParseRest(req);
        parseRest.get('/users/me', {}, {
            'X-Parse-Application-Id': process.env.APP_ID,
            'X-Parse-Session-Token': req.header("X-Parse-Session-Token")
        }).then((success) => {
            req.user = success;
            next();
        }, (obj, error) => {
            console.log(`authentication log ${error.message}`);
            res.send(`{ "status":0, "code":"${error.message}"}`);
        });
    };

    authenticateView(req, res, next) {
        const parseRest = new ParseRest(req);
        parseRest.get('/users/me', {}, {
            'X-Parse-Application-Id': process.env.APP_ID,
            'X-Parse-Session-Token': req.cookies["X-Parse-Session-Token"]
        }).then((success) => {
            req.user = success;
            next();
        }, (error) => {
            res.redirect('/admin');
        });
    };

    authenticateLogin(req, res, next) {
        const parseRest = new ParseRest(req);
        parseRest.get('/users/me', {}, {
            'X-Parse-Application-Id': process.env.APP_ID,
            'X-Parse-Session-Token': req.cookies["X-Parse-Session-Token"]
        }).then((success) => {
            res.redirect('/admin/dashboard');
        });
    };
};
