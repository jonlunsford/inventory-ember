import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-radio-group-composer', 'Integration | Component | input radio group composer', {
  integration: true
});

test('it renders', function(assert) {
  this.set('input', { meta: {} });
  this.render(hbs`{{input-radio-group-composer input=input}}`);

  assert.equal(this.$().text().trim(), '');
});
