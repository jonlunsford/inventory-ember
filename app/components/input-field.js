import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['input-field'],
  type: 'text',

  UUID: Ember.computed( function() {
    return Ember.guidFor(this) + "-input-text";
  }),

  _errorMessages: computed('errors.[]', function() {
    return (this.get('errors') || []).join(', ');
  }),

  actions: {
    setValue(event) {
      this.set('value', event.target.value);
    }
  }

});
