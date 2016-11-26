import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-dropdown-composer', 'Integration | Component | input dropdown composer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{input-dropdown-composer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#input-dropdown-composer}}
      template block text
    {{/input-dropdown-composer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
