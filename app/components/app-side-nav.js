import Ember from 'ember';

export default Ember.Component.extend({
  classNames: "side-nav",

  didInsertElement() {
    Ember.$(this.element).find('.collapsible').collapsible();
  }
});
