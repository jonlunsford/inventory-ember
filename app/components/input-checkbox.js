import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'mb1',
  tagName: 'p',

  UUID: Ember.computed(function() {
    return Ember.guidFor(this) + "-input-radio";
  }),

});
