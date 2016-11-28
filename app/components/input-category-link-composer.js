import Ember from 'ember';

const { inject, $ } = Ember;

const OptionInput = Ember.Object.extend({
  label: '',
  value: '',
  selected: false
});

export default Ember.Component.extend({
  store: inject.service(),
  categoryOptions: [],
  linkedCategory: null,
  autocompleteData: {},
  autocompleteDataLoaded: false,
  categoryOptionsLoaded: false,

  init() {
    this._super(...arguments);
    this._getCategories();

    if(this.get('input.meta.category_id')) {
      this._getCategoryProducts(this.get('input.meta.category_id'));
    }
  },

  actions: {
    getCategoryProducts(event) {
      this._getCategoryProducts(event.target.value);
    },

    setInputValue(event) {
      let that = this;

      Ember.run.later(function() {
        let product = that.get('linkedCategory.products').find((prod) => {
          return prod.get('name') === event.target.value;
        });

        that.set('input.value', product.get('name'));
        that.set('input.product', product);
        that.set('input.meta.product_id', product.get('id'));
        that.set('input.meta.category_id', that.get('linkedCategory.id'));
      }, 400);
    }
  },

  _getCategories() {
    let options = this.get('store').peekAll('category').map((cat) => {
      return OptionInput.create({
        label: cat.get('name'),
        value: cat.get('id'),
        selected: false
      });
    });

    this.set('categoryOptions', options);
    this.set('categoryOptionsLoaded', true);
    this._refreshCategoryDropdown();
  },

  _getCategoryProducts(category_id) {
    let data = {};

    this.get('store').findRecord('category', category_id).then((cat) => {
      cat.get('products').then((products) => {
        products.forEach((prod) => {
          data[prod.get('name')] = null;
        });

        this.set('autocompleteData', data);
        this.set('autocompleteDataLoaded', true);
        this.set('linkedCategory', cat);
      });
    });
  },

  _refreshCategoryDropdown() {
    $(this.element).find('select').material_select();
  }
});
