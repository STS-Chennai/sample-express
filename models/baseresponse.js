module.exports = class BaseResponse {
  constructor() {
    this.status = "0";
    this.code = "INTERNAL SERVER ERROR";
    this.result = undefined;
  }

  getErrorInstance(error) {
    this.status = "0";
    this.code = error;
    return this;
  }

  getInstance(code, result) {
    this.status = "1";
    this.code = code;
    this.result = result;
    return this;
  }
};
