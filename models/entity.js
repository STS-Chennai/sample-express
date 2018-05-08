const Parse = require("parse/node");
const ArrayUtils = require("./utils");

Parse.initialize(process.env.APP_ID);
Parse.serverURL = process.env.SERVER_URL;

module.exports = class IEntity extends Parse.Object {

  static validation() {
    throw 'validation() Not Implemented';
  }

  set(field, value) {
    if (typeof field !== 'string') {
      for (let key in field) {
        if (field.hasOwnProperty(key)) {
          let fieldValue = field[key];
          this.set(key, fieldValue);
        }
      }
      return;
    }

    if (!this.fields.hasOwnProperty(field))
      return;

    let isValid = this.validation(field, value);
    if (typeof isValid === Error) {
      return isValid;
    }

    let fieldType = this.fields[field];
    if (fieldType.type === Number) {
      if (fieldType.decimal) {
        value = parseFloat(parseFloat(value).toFixed(fieldType.precision));
      } else {
        value = parseInt(value);
      }
    }

    super.set(field, value);
  }

  constructor(name, validation, fields) {
    super(name);
    this.validation = validation;
    this.fields = fields;
  }
}
