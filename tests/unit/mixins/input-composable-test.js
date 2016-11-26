import Ember from 'ember';
import InputComposableMixin from 'inventory/mixins/input-composable';
import { module, test } from 'qunit';

module('Unit | Mixin | input composable');

// Replace this with your real tests.
test('it works', function(assert) {
  let InputComposableObject = Ember.Object.extend(InputComposableMixin);
  let subject = InputComposableObject.create();
  assert.ok(subject);
});
