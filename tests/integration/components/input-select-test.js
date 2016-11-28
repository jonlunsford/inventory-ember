import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-select', 'Integration | Component | input select', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{input-select}}`);

  assert.equal(this.$().html("").text().trim(), '');
});
