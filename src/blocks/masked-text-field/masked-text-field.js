class MaskedTextField {
  constructor(domElement) {
    this.domElement = domElement;
    this.initEventListener(this.domElement);
    console.log('init textField');
    this.previous = domElement.value;
  }

  initEventListener(domElement) {
    domElement.addEventListener('focusin', this);
    domElement.addEventListener('focusout', this);
    domElement.addEventListener('input', this);
  }


  handleEvent(event) {
    switch(event.type) {
      case 'focusin':
        if(event.target.value == event.target.getAttribute('value')) {
          event.target.value = '';
        }
        break;
      case 'focusout':
        if(event.target.value == '') {
          event.target.value = event.target.getAttribute('value');
        }
        break;
      case 'input':
        //console.log(this.previous);
        for(let i of event.target.value) {
          console.log(i);
          if(!i.match(/\d/)) {
            console.log('error');
            event.target.value = this.previous;
          }
        }


        this.previous = event.target.value;
        break;
    }
  }
  
}

export {MaskedTextField}