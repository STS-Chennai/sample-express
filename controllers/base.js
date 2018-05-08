const BaseResponse = require("../models/baseresponse");
module.exports = class BaseController {
  constructor() {
  }

  sendPromise(promise, res) {
    let response = new BaseResponse();
    promise.then(function (result) {
      if (result === undefined) {
        response.getErrorInstance(`Item Not Found!`);
      } else if (Array.isArray(result) && result.length === 0) {
        response.getErrorInstance(`No Items Found!`);
      }
      else {
        response.getInstance("success", result);
      }
      res.send(response);
    }, function (error) {
      response.getErrorInstance(error);
      if (error.message !== undefined)
        response.code = error.message;
      res.send(response);
    });
  }

  static saveAndSendPromise(objTosave, res) {
    let response = new BaseResponse();
    objTosave.save(null, {
      success: (obj) => {
        response.getInstance("success", obj);
        res.send(response);
      },
      error: (obj, error) => {
        response.getErrorInstance(error);
        res.send(response);
      }
    });
  }
};