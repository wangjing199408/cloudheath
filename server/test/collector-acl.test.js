var loopback = require('loopback');
var lt = require('loopback-testing');
var app = require('../server.js');
var assert = require('assert');
var USER = {email:'test@test.test', password: '123456'};
var CURRENT_USER = {email: 'current@test.test', password: 'test'};
var COLLECTOR = {username: '18601153200', password: '123456'};
var CHEMIST = {username: '13357828347', password: '123456'};

describe('access control', function () {

  lt.beforeEach.withApp(app);

  describe('/patient', function () {

    lt.describe.whenLoggedInExistUser(COLLECTOR, function() {
      lt.describe.whenCalledRemotely('GET', '/api/patients', function() {
        lt.it.shouldBeAllowed();
      });
    });
    
    lt.describe.whenLoggedInExistUser(CHEMIST, function() {
      lt.describe.whenCalledRemotely('GET', '/api/patients', function() {
        lt.it.shouldBeAllowed();
      });
    });
  });
});
