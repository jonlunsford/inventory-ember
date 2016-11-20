import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  owner: DS.belongsTo('user'),
  categories: DS.hasMany('category', { async: true })
});
