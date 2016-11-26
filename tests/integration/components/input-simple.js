import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inputs/simple-key-value', 'Integration | Component | inputs/simple key value', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{inputs/simple-key-value}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#inputs/simple-key-value}}
      template block text
    {{/inputs/simple-key-value}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
