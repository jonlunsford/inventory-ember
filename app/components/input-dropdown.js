import Ember from 'ember';

const { $ } = Ember;

export default Ember.Component.extend({
  classNames: 'input-field',
  options: [],

  UUID: Ember.computed(function() {
    return Ember.guidFor(this) + "-input-select";
  }),

  didInsertElement() {
    $(this.element).find('select').material_select();
  },
});
