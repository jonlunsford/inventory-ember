import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if(this.get('input.isNew')) {
      this.set('input.meta.min', 1);
      this.set('input.meta.max', 100);
      this.set('input.value', 50);
    }
  },

  actions: {
    setMin(event) {
      this.set('input.meta.min', event.target.value);
    },

    setMax(event) {
      this.set('input.meta.max', event.target.value);
    },

    setInputValue(event) {
      this.set('input.value', event.target.value);
    }
  }
});
