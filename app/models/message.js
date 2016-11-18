import DS from 'ember-data';

export default DS.Model.extend({
  insertedAt: DS.attr('String'),
  content: DS.attr('string'),
  owner: DS.belongsTo('user'),
  room: DS.belongsTo('room')
});
