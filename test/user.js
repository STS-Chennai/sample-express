process.env.APP_ENV = "test";

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let DevServer = require('../server');
let should = chai.should();
let expect = chai.expect;
let random = Math.floor((Math.random() * 10000) + 1);
/*setup environment and start server*/
const startDev = new DevServer();
startDev.start();
const server = startDev.app;

let appID = process.env.APP_ID;
let userID;
let sessionToken;

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {

  /*
  * Insert New User to the system
  */
  describe('/POST users', () => {
    it('it should create new user with username and password field', (done) => {
      let user = {
        username: "chaiuser",
        password: "123456",
        firstname: "test user"
      }
      chai.request(server)
        .post('/parse/users')
        .set('X-Parse-Application-Id', appID)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('objectId');
          res.body.should.have.property('sessionToken');
          userID = res.body.objectId;
          done();
        });
    });
  });

  /*
  * Test the /GET route with get all users
  */
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/parse/users')
        .set('X-Parse-Application-Id', appID)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          res.body.results.should.be.a('array');
          expect(res.body.results.length).to.be.at.least(1);
          done();
        });
    });
  });

  /*
  * Get session token
  */
  describe('/Login user', () => {
    it('it should authenticate user and return session token', (done) => {
      let loginData = {
        username: "chaiuser",
        password: "123456"
      }
      chai.request(server)
        .post('/parse/login')
        .set('X-Parse-Application-Id', appID)
        .send(loginData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('sessionToken');
          sessionToken = res.body.sessionToken;
          done();
        });
    });
  });

  /*
  * get User
  */
  describe('/Single user crud', () => {

    it('it should GET data for given user ID from users', (done) => {
      chai.request(server)
        .get(`/parse/users/${userID}`)
        .set('X-Parse-Application-Id', appID)
        .set('X-Parse-Session-Token', sessionToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('objectId');
          expect(res.body).to.contain.any.keys(['username', 'firstName']);
          expect(res.body.objectId).to.eql(userID);
          done();
        });
    });

    /*
    * update user
    */
    it('it should update user data for given user ID', (done) => {
      let userData = {
        firstname: "test",
        lastname: "user",
        phone:9876543210,
        gender:"male"
      };

      chai.request(server)
        .put(`/parse/users/${userID}`)
        .set('X-Parse-Application-Id', appID)
        .set('X-Parse-Session-Token', sessionToken)
        .send(userData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('updatedAt');
          done();
        });
    });

    /*
    * Delete User
    */
    it('it should delete user for given user ID', (done) => {
      chai.request(server)
        .delete(`/parse/users/${userID}`)
        .set('X-Parse-Application-Id', appID)
        .set('X-Parse-Session-Token', sessionToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

  });

});
