import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['input-field'],
  label: "Autocomplete",
  autocompleteData: {},

  UUID: Ember.computed( function() {
    return Ember.guidFor(this) + "-input-autocomplete";
  }),

  didInsertElement() {
    Ember.$(this.element).find('.autocomplete').autocomplete({
      data: this.get('autocompleteData')
    });
  }
});
