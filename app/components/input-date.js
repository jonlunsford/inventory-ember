import Ember from 'ember';

export default Ember.Component.extend({
  UUID: Ember.computed( function() {
    return Ember.guidFor(this) + "-input-text";
  }),

  didInsertElement() {
    Ember.$(this.element).find('input[type="date"]').pickadate();
  }
});
