import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if(this.get('input.isNew')) {
      this.set('input.meta.on_label', 'On');
      this.set('input.meta.off_label', 'Off');
      this.set('input.value', false);
    }
  },

  actions: {
    setOnLabel(event) {
      this.set('input.meta.on_label', event.target.value);
    },

    setOffLabel(event) {
      this.set('input.meta.off_label', event.target.value);
    },

    setInputValue(event) {
      this.set('input.value', event.target.checked);
    }
  }
});
