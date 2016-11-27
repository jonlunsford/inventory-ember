import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setInputValue(event) {
      this.set('input.value', event.target.value);
    }
  }
});
