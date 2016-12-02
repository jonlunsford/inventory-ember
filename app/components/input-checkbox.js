import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'mb1',
  tagName: 'p',

  UUID: Ember.computed(function() {
    return Ember.guidFor(this) + "-input-checkbox";
  }),

  didInsertElement() {
    let $checkbox = Ember.$(this.element).find("input[type='checkbox']");

    if(this.get('checked') === 'true' || this.get('checked') === true) {
      $checkbox.attr('checked', 'checked');
    }
  },

});
