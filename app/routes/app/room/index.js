import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  session: inject.service(),

  actions: {
    createMessage() {
      let data = {
        owner: this.get('session.currentUser'),
        room: this.get('currentModel'),
        content: this.get('currentModel.newMessage')
      };

      let message = this.store.createRecord('message', data);

      message.save().then(() => {
        this.get('flashMessages').success(`Created message: ${data.content}`);
        this.set('currentModel.newMessage', '');
      }).catch(() => {
        this.store.unloadRecord(message);
        this.get('flashMessages').danger(`Problem creating message: ${data.content}`);
      });
    }
  }
});
