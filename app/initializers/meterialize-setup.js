/*globals window:true*/
export function initialize(/* application */) {
  if(window && window.validate_field) {
    window.validate_field = function() {};
  }
}

export default {
  name: 'meterialize-setup',
  initialize
};
