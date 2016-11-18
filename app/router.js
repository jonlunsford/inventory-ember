import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('auth', function() {
    this.route('login');
    this.route('register');
  });
  this.route('app', function() {
    this.route('index');

    this.route('room', {
      path: 'room/:room_id'
    }, function() {});

    this.route('company', {
      path: 'company/:company_id'
    }, function() {});
  });

});

export default Router;
