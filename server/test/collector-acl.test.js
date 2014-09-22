var loopback = require('loopback');
var lt = require('loopback-testing');
var app = require('../server.js');
var assert = require('assert');
var USER = {email:'test@test.test', password: '123456'};
var CURRENT_USER = {email: 'current@test.test', password: 'test'};

describe('access control', function () {

  lt.beforeEach.withApp(app);

  describe('/Users', function () {

    lt.beforeEach.givenModel('User', USER, 'randomUser');

    lt.it.shouldBeDeniedWhenCalledAnonymously('GET', '/api/Users');
    lt.it.shouldBeDeniedWhenCalledUnauthenticated('GET', '/api/Users');
    lt.it.shouldBeDeniedWhenCalledByUser(CURRENT_USER, 'GET', '/api/Users');
    
    lt.it.shouldBeDeniedWhenCalledAnonymously('GET', urlForUser);
    lt.it.shouldBeDeniedWhenCalledUnauthenticated('GET', urlForUser);
    lt.it.shouldBeDeniedWhenCalledByUser(CURRENT_USER,'GET', urlForUser);

    lt.it.shouldBeAllowedWhenCalledAnonymously('POST', '/api/Users');
    lt.it.shouldBeAllowedWhenCalledUnauthenticated('POST', '/api/Users');
    lt.it.shouldBeAllowedWhenCalledByUser(CURRENT_USER, 'POST', '/api/Users');

    lt.describe.whenCalledRemotely('DELETE', '/api/Users', function() {
      lt.it.shouldNotBeFound();
    });

    lt.it.shouldBeDeniedWhenCalledAnonymously('PUT', urlForUser);
    lt.it.shouldBeDeniedWhenCalledUnauthenticated('PUT', urlForUser);
    lt.it.shouldBeDeniedWhenCalledByUser(CURRENT_USER, 'PUT', urlForUser);

    lt.it.shouldBeDeniedWhenCalledAnonymously('PUT', urlForUser);
    lt.it.shouldBeDeniedWhenCalledUnauthenticated('PUT', urlForUser);
    lt.it.shouldBeDeniedWhenCalledByUser(CURRENT_USER, 'PUT', urlForUser);

    lt.describe.whenLoggedInAsUser(CURRENT_USER, function() {
      beforeEach(function() {
        this.url = '/api/Users/' + this.User.id + '?ok';
      });
      lt.describe.whenCalledRemotely('DELETE', '/api/Users/:id', function() {
        lt.it.shouldBeAllowed();
      });
      lt.describe.whenCalledRemotely('GET', '/api/Users/:id', function() {
        lt.it.shouldBeAllowed();
      });
      lt.describe.whenCalledRemotely('PUT', '/api/Users/:id', function() {
        lt.it.shouldBeAllowed();
      });
    });

    lt.it.shouldBeDeniedWhenCalledAnonymously('DELETE', urlForUser);
    lt.it.shouldBeDeniedWhenCalledUnauthenticated('DELETE', urlForUser);
    lt.it.shouldBeDeniedWhenCalledByUser(CURRENT_USER, 'DELETE', urlForUser);
    
    function urlForUser() {
      return '/api/Users/' + this.randomUser.id;
    }
  });
});
