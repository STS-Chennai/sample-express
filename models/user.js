const Parse = require("parse/node");
Parse.initialize(process.env.APP_ID);
Parse.serverURL = process.env.SERVER_URL;
Parse.masterKey = process.env.MASTER_KEY;

module.exports = class User extends Parse.User {
  static fieldList() {
    return [
      'username',
      'first_name',
      'last_name',
      'email',
      'password',
      'phone_number',
      'avatar',
      'gender',
      'dob',
      'status',
      'type',
      'is_mobile_verified',
      'sos_number'
    ]
  }

  constructor() {
    super('User');
  }

  static getUserName(user) {
    return user.phone_number + '_' + user.type;
  }

  static getPassword(user) {
    return user.phone_number;
  }

}