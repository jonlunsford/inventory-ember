import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['input-field'],

  UUID: Ember.computed( function() {
    return Ember.guidFor(this) + "-input-textarea";
  }),

  _errorMessages: computed('errors.[]', function() {
    return (this.get('errors') || []).join(', ');
  }),

  didInsertElement() {
    let that = this;
    Ember.run.later(function() {
      Ember.$(that.element).find('textarea').trigger('autoresize');
    }, 500);
  },

  actions: {
    setValue(event) {
      this.set('value', event.target.value);
    }
  }

});
