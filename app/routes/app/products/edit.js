import Ember from 'ember';
import InputPersistableMixin from 'inventory/mixins/input-persistable';

export default Ember.Route.extend(InputPersistableMixin, {
  actions: {
    updateProduct() {
      let model = this.get('currentModel');
      model.save().then(this._saveInputs.bind(this)).catch(this._catch);
    },
  }
});
