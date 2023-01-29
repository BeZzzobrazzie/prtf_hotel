import {BaseClass} from '../../js/base/baseClass';

class InputTextField extends BaseClass {
  constructor(domElement) {
    super(domElement);

  }

  initEventListener(domElement) {
    super.initEventListener(domElement);
    domElement.addEventListener('focus', this);
    domElement.addEventListener('blur', this);
  }
  
  handleEvent(event) {
    super.handleEvent(event);
    switch(event.type) {
      case 'focus':
        if(event.target.value == event.target.getAttribute('value')) {
          event.target.value = '';
        }
        break;
      case 'blur':
        if(event.target.value == '') {
          event.target.value = event.target.getAttribute('value');
        }
        break;
    }
  }
}

export {InputTextField};
