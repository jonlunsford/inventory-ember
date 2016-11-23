import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  label: DS.attr('string'),
  value: DS.attr('string'),
  disabled: DS.attr('boolean'),
  meta: DS.attr('raw'),
  products: DS.hasMany('product')
});
