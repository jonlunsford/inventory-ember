import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  company: DS.belongsTo('company', { async: true }),
  products: DS.hasMany('products', { async: true }),
  inputs: DS.hasMany('input', { async: true })
});
