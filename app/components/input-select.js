import Ember from 'ember';

const { $ } = Ember;

export default Ember.Component.extend({
  classNames: ['input-field'],
  attributeBindings: ['multiple'],
  multiple: null,
  optgroups: [
    { label: "Standard Fields", options: [
      { label: 'Single Line Text', value: 'text' },
      { label: 'Paragraph Text', value: 'textarea' },
      { label: 'Multiple Choice', value: 'radiogroup' },
      { label: 'Number', value: 'number' },
      { label: 'Checkboxes', value: 'checkboxgroup' },
      { label: 'Drop Down Menu', value: 'select' },

    ]},

    { label: "Fancy Fields", options: [
      { label: 'Switch', value: 'switch' },
      { label: 'Date', value: 'date' },
      { label: 'Time', value: 'time' },
      { label: 'File Input', value: 'file' },
      { label: 'Range', value: 'range' }
    ]}
  ],

  UUID: Ember.computed( function() {
    return Ember.guidFor(this) + "-input-select";
  }),

  didInsertElement() {
    $(this.element).find('select').material_select();
  },

});
