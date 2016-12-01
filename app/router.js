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

    this.route('companies', function() {
      this.route('index');
      this.route('new');
      this.route('show', { path: ':company_id' });
      this.route('edit', { path: ':company_id/edit' });
    });

    this.route('categories', function() {
      this.route('index');
      this.route('new');
      this.route('show', { path: ':category_id' });
      this.route('edit', { path: ':category_id/edit' });
      this.route('template', { path: ':category_id/template' });
    });

    this.route('products', function() {
      this.route('index');
      this.route('show', { path: ':product_id' });
    });
  });
});

export default Router;
