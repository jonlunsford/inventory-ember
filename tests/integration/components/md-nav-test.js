import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-nav', 'Integration | Component | md nav', {
  integration: true
});

test('it renders', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#md-nav}}
      template block text
    {{/md-nav}}
  `);

  assert.equal(this.$().text().trim().replace(/[\s\n]+/g, ''), 'menutemplateblocktexttemplateblocktext');
});
