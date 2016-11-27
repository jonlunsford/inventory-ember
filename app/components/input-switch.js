import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'mb1',
  onLabel: 'On',
  offLabel: 'Off',
  checked: Ember.computed('value', function() {
    return this.get('value');
  })
});
