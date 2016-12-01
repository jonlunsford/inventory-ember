import Ember from 'ember';

const Inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

export function singularizeString(params/*, hash*/) {
  return Inflector.singularize(params[0]);
}

export default Ember.Helper.helper(singularizeString);
