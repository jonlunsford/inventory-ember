import Ember from 'ember';

export default Ember.Mixin.create({
  _saveInputs(model) {
    model.get('inputs').forEach(this._saveInput.bind(this));
  },

  _saveInput(input) {
    if(input.get('address.content')) {
      this._saveWithAddress(input);
    } else {
      this._save(input);
    }
  },

  _saveWithAddress(input) {
    input.get('address.content').save().then((address) => {
      input.set('address', address);
      input.save();
    }).catch(this._catch);
  },

  _save(input) {
    input.save().then(() => {
      this.get('flashMessages').success('Changes Saved');
    }).catch(this._catch);
  },

  _catch(err) {
    console.warn("problem saveing: ", err);
    this.get('flashMessages').danger('Problem Saving');
  }
});
