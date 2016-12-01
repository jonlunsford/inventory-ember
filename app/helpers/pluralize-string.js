import Ember from 'ember';

const Inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

export function pluralizeString(params/*, hash*/) {
  return Inflector.pluralize(params[0]);
}

export default Ember.Helper.helper(pluralizeString);
