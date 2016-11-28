import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-date', 'Integration | Component | input date', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{input-date}}`);

  assert.equal(this.$().text().trim(), 'MondayNov282016November2016  SMTWTFS303112345678910111213141516171819202122232425262728293012345678910TodayClearClose');
});
