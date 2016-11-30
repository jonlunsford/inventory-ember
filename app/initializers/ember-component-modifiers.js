import Ember from 'ember';
const { $ } = Ember;

export function initialize() {
  Ember.LinkComponent.reopen({
    attributeBindings: ['data-toggle', 'data-tooltip', 'data-delay', 'data-position'],

    didInsertElement() {
      this._super(...arguments);

      if($(this.element).hasClass('tooltipped')) {
        $(this.element).tooltip({ delay: 50, position: 'top'});
      }
    },

    willDestroyElement() {
      this._super(...arguments);

      if($(this.element).hasClass('tooltipped')) {
        $(this.element).tooltip('remove');
      }
    }
  });
}

export default {
  name: 'ember-component-modifiers',
  initialize
};
