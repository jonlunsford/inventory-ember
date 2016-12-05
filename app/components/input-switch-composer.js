import Ember from 'ember';

export default Ember.Component.extend({
  checked: false,

  init() {
    this._super(...arguments);

    if(this.get('input.isNew')) {
      this.set('input.meta.on_label', 'On');
      this.set('input.meta.off_label', 'Off');
      this.set('input.value', false);
      this.set('checked', false);
    }
  },

  didInsertElement() {
    let $checkbox = Ember.$(this.element).find("input[type='checkbox']");

    if(this.get('input.value') === 'true') {
      $checkbox.attr("checked", "checked");
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
