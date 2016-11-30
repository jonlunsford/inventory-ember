import Ember from 'ember';
import ENV from 'inventory/config/environment';
import fetch from 'ember-network/fetch';

const { Route, inject, $ } = Ember;

export default Route.extend({
  classNames: ["app"],
  flashMessages: inject.service(),
  session: inject.service(),

  beforeModel() {
    if(!this.get('session').get('isAuthenticated')) {
      this.transitionTo('auth.login');
    }
  },

  afterModel() {
    return fetch(`${ENV.DS.host}/${ENV.DS.namespace}/user/current`, {
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${this.get('session').get('session.content.authenticated.access_token')}`
      }
    }).then((raw) => {
      return raw.json().then((data) => {
        const currentUser = this.store.push(data);
        this.set('session.currentUser', currentUser);
      });
    }).catch(() => {
      this.get('flashMessages').danger('An unexpected error occurred, please try again later');
    });
  }
});
