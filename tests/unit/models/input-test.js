import { moduleForModel, test } from 'ember-qunit';

moduleForModel('input', 'Unit | Model | input', {
  // Specify the other units that are required for this test.
  needs: ['model:product']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});