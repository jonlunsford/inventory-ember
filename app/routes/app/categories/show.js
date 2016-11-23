import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),

  actions: {
    createProduct() {
      let data =  {
        name: this.get('currentModel.newProductName'),
        categories: [this.get('currentModel')]
      };

      let product = this.store.createRecord('product', data);

      product.save().then(() => {
        this.get('flashMessages').success(`Created product: ${data.name}`);
        this.set('currentModel.newProductName', '');
      }).catch((err) => {
        this.store.unloadRecord(product);
        this.set('currentModel.newProductErrors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger(`Problem creating product: ${data.name}`);
      });
    },

    destroyProduct(product) {
      if(window.confirm('Are you sure?')) {
        product.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted product: ${product.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting product: ${product.get('name')}`);
        });
      }
    },

    showProduct(product) {
      let buttons = ['remove_circle'];
      let targetText = arguments[1].target.innerText;
      if(buttons.indexOf(targetText) < 0) {
        this.transitionTo('app.products.show', product);
      }
    }
  }

});
