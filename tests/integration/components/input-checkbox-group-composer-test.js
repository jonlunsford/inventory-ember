import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-checkbox-group-composer', 'Integration | Component | input checkbox group composer', {
  integration: true
});

test('it renders', function(assert) {
  this.set('input', { meta: {} });
  this.render(hbs`{{input-checkbox-group-composer input=input}}`);

  assert.equal(this.$().text().trim(), '');
});
