import Ember from 'ember';

const { isEmpty, observer } = Ember;

export default Ember.Mixin.create({
  classNames: ['row input-composer'],
  editMode: true,
  previewMode: true,

  UUID: Ember.computed( function() {
    return Ember.guidFor(this) + "-input-composer";
  }),

  inputLabelChaned: observer('input.label', function() {
    this.set('input.name', event.target.value.underscore());
  }),

  init() {
    this._super(...arguments);

    if(!isEmpty(this.get('input.label')) || !isEmpty(this.get('input.value'))) {
      this.set('editMode', false);
    }
  },

  didInsertElement() {
    Ember.$(this.element).find('.js-more-menu').dropdown();
  },

  actions: {
    previewInput() {
      this.set('editMode', false);
      this.set('previewMode', true);
    },

    editInput() {
      this.set('editMode', true);
      this.set('previewMode', true);
    }
  }
});
