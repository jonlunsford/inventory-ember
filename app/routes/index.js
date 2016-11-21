import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  session: inject.service(),

  beforeModel() {
    console.log(this.get('session').get('isAuthenticated'));
    if(this.get('session').get('isAuthenticated')) {
      //this.transitionTo('app.users.companies', { user_id: userId });
    }
  }
});
