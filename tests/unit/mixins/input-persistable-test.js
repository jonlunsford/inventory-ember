import Ember from 'ember';
import InputPersistableMixin from 'inventory/mixins/input-persistable';
import { module, test } from 'qunit';

module('Unit | Mixin | input persistable');

// Replace this with your real tests.
test('it works', function(assert) {
  let InputPersistableObject = Ember.Object.extend(InputPersistableMixin);
  let subject = InputPersistableObject.create();
  assert.ok(subject);
});
