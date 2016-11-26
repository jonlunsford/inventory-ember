import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-checkbox-group-composer', 'Integration | Component | input checkbox group composer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{input-checkbox-group-composer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#input-checkbox-group-composer}}
      template block text
    {{/input-checkbox-group-composer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
