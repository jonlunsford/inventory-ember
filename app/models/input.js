import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  label: DS.attr('string'),
  value: DS.attr('string'),
  disabled: DS.attr('boolean', { defaultValue: false }),
  meta: DS.attr(),
  inputType: DS.attr('string'),
  product: DS.belongsTo('product'),
  category: DS.belongsTo('category'),
  address: DS.belongsTo('address', { async: true })
});
