import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  classNames: "side-nav",
  session: inject.service(),
  store: inject.service(),

  user: Ember.computed(function() {
    return this.get('session.currentUser');
  }),

  didInsertElement() {
    Ember.$(this.element).find('.collapsible').collapsible();
  }
});
