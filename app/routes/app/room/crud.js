import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),

  actions: {
    createRoom() {
      let data = this.get('currentModel.newRoom');
      let room = this.store.createRecord('room', { name: data.name });

      this.set('currentModel.newRoom.errors', []);

      room.save().then(() => {
        this.get('flashMessages').success(`Created room: ${data.name}`);
        this.set('currentModel.newRoom.name', '');
      }).catch((err) => {
        this.store.unloadRecord(room);
        this.set('currentModel.newRoom.errors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
      });
    },

    removeRoom(room) {
      if(window.confirm('Are you sure?')) {
        room.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted room: ${room.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting room: ${room.get('name')}`);
        });
      }
    },

    enterRoom(room) {
      let buttons = ['remove_circle'];
      let targetText = arguments[1].target.innerText;
      if(buttons.indexOf(targetText) < 0) {
        this.transitionTo('app.room.index', room);
      }
    }
  },

  model() {
    return RSVP.hash({
      rooms: this.store.findAll('room'),
      newRoom: { name: '', errors: [] }
    });
  }
});
