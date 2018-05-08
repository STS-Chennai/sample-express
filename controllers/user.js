const Parse = require("parse/node");
const User = require("../models/user");
let BaseResponse = require('../models/baseresponse');

module.exports = class UserController extends Parse.User {

  static create(req, res, done) {
    let user = new Parse.User();

    req.body.username = User.getUserName(req.body);
    req.body.password = User.getPassword(req.body);
    req.body.sos_number = UserController.sosNumberFilter(req.body.sos_number, req.body.sos_name);
    if (req.body.type === "DRIVER")
      req.body.status = "INACTIVE";

    if (req.body.avatar === "") {
      delete req.body.avatar;
    } else if (req.body.avatar) {
      req.body.avatar = JSON.parse(req.body.avatar);
    }

    for (let key of User.fieldList()) {
      if (req.body.hasOwnProperty(key)) {
        let value = req.body[key];
        user.set(key, value);
      }
    }

    user.signUp(null, done(req, res));
  }

  static update(req, res, done) {

    let user_id = req.body.user_id;
    let query = new Parse.Query('User');
    query.equalTo("objectId", user_id);
    Parse.masterKey = process.env.MASTER_KEY;
    query.first({useMasterKey: true})
      .then(function (user) {
        let fieldlist = User.fieldList();

        req.body.sos_number = UserController.sosNumberFilter(req.body.sos_number, req.body.sos_name);
        if (req.body.driver_status !== "INACTIVE")
          req.body.status = "ACTIVE";

        if (req.body.avatar === "")
          delete req.body.avatar;

        if (req.body.avatar === "") {
          delete req.body.avatar;
        } else if (req.body.avatar) {
          req.body.avatar = JSON.parse(req.body.avatar);
        }

        for (let key of fieldlist) {
          if (req.body.hasOwnProperty(key)) {
            let value = req.body[key];
            user.set(key, value);
          }
        }
        Parse.masterKey = process.env.MASTER_KEY;
        user.save({}, {useMasterKey: true});
        done(req, res);
      })
  }

  static listUpdate(req, res, done) {
    let userId = req.body.user_id;
    let query = new Parse.Query('User');
    Parse.masterKey = process.env.MASTER_KEY;
    query.equalTo("objectId", userId);
    query.first({useMasterKey: true})
      .then(function (user) {
        let fieldlist = User.fieldList();

        let status = user.get('status');

        req.body.status = (status === "ACTIVE") ? "INACTIVE" : "ACTIVE";

        for (let key of fieldlist) {
          if (req.body.hasOwnProperty(key)) {
            let value = req.body[key];
            user.set(key, value);
          }
        }
        user.save({}, done(req, res));
      })
  }
  static sosNumberFilter(sos, sosName) {
    for(let i=0; i < sos.length; i++) {
      let sos_number = "";
      let sos_name = sosName ? sosName[i] : "" ;
      if(sos[i]) {
        sos_number = {"number": sos[i], "name": sos_name}
      }
      sos[i] = sos_number
    }
    return sos = sos.filter(x => x != "");
  }

};