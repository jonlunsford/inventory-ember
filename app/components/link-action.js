import Ember from 'ember';

const { $ } = Ember;

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href', 'data-tooltip', 'data-delay', 'data-position', 'onclick'],
  href: 'javascript:;',

  didInsertElement() {
    if($(this.element).hasClass('tooltipped')) {
      $(this.element).tooltip({ delay: 50, position: 'top'});
    }
  },

  willDestroyElement() {
    if($(this.element).hasClass('tooltipped')) {
      $(this.element).tooltip('remove');
    }
  }

});
