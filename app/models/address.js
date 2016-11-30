import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  city: [
    validator('presence', true),
    validator('length', {
      min: 3
    })
  ],

  state: [
    validator('presence', true)
  ],

  zip: [
    validator('presence', true),
    validator('length', {
      min: 3
    })
  ],
});

export default DS.Model.extend(Validations, {
  city: DS.attr('string'),
  state: DS.attr('string'),
  country: DS.attr('string'),
  zip: DS.attr('number'),
  lat: DS.attr('number'),
  long: DS.attr('number'),
  line1: DS.attr('string'),
  line2: DS.attr('string'),
  phone: DS.attr('string'),
  description: DS.attr('string'),
  company: DS.belongsTo('company'),
  input: DS.belongsTo('input')
});
