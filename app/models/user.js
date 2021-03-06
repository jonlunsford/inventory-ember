import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  rooms: DS.hasMany('room'),
  messages: DS.hasMany('message'),
  companies: DS.hasMany('company', { async: true })
});
