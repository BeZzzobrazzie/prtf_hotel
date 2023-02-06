class MaskedTextField {
  constructor(domElement) {
    this.domElement = domElement;
    this.initEventListener(this.domElement);
    console.log('init textField');
    this.previous = '';
    this.reg = /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
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

        let regexp1 = /[0-3]/;
        let regexp2 = /0[1-9]|[12]\d|3[01]/;
        let regexp4 = /(0[1-9]|[12]\d|3[01])\.[01]/;
        let regexp5 = /(0[1-9]|[12]\d|3[01])\.(0[1-9])|(1[012])/; 
        let regexp10 = /(0[1-9]|[12]\d|3[01])\.(0[1-9])|(1[012])\.(\d\d\d[1-9])|(\d\d[1-9]\d)|(\d[1-9]\d\d)|([1-9]\d\d\d)/; // нужно сделать проверку на 0000 и 0001. !!Сейчас неверно

        let formatDate = event.target.value.replace(/\./g, '');
        console.log('formatDate:' + formatDate);
        console.log('this.previous.length:' + this.previous.length);
        console.log('event.target.value.length:' + event.target.value.length);
        if(this.previous.length < event.target.value.length) { // увеличение
          if(event.target.value.length > 10) {
            event.target.value = this.previous;
          }
          else {
            switch(event.target.value.length) {
              case '0':
                break;
              case 1:
                if(!regexp1.test(event.target.value)) {
                  event.target.value = this.previous;
                }
                break;
              case 2:
                if(!regexp2.test(event.target.value)) {
                  event.target.value = this.previous;
                }
                else {
                  event.target.value += '.';
                }
                break;
              case 4:
                if(!regexp4.test(event.target.value)) {
                  event.target.value = this.previous;
                }
                break;
              case 5:
                if(!regexp5.test(event.target.value)) {
                  event.target.value = this.previous;
                }
                else {
                  event.target.value += '.';
                }
                break;
              case 10:
                if(!regexp10.test(event.target.value)) {
                  event.target.value = this.previous;
                }
                break;
            }
          }
          

          // if(event.target.value.length == 2 || event.target.value.length == 5) {
          //   event.target.value += '.';
          // }
        }
        else if(this.previous.length > event.target.value.length) { // уменьшение
          if(event.target.value.length == 2) {
            event.target.value = event.target.value.slice(0, 1);
          }
          else if(event.target.value.length == 5) {
            event.target.value = event.target.value.slice(0, 4);
          }
        }

        //console.log(event.target.value.length);
        // switch(formatDate.length) {
        //   case '0':
        //     break;
        //   case 1:
        //     if(!regexp1.test(formatDate)) {
        //       event.target.value = this.previous;
        //     }
        //     break;
        //   case 2:
        //     if(!regexp2.test(formatDate)) {
        //       event.target.value = this.previous;
        //     }
        //     else {
        //       event.target.value += '.';
        //     }
        //     break;
        // }

        //console.log(this.previous);
        // for(let i of event.target.value) {
        //   //console.log(i);
        //   if(!i.match(/\d/)) {
        //     console.log('error');
        //     event.target.value = this.previous;
        //   }
        // }

        // if(regexp.test(event.target.value)) {
        //   console.log('ok');
        // }
        // else {
        //   console.log('not ok');
        // }


        this.previous = event.target.value;
        break;
    }
  }
  
}

export {MaskedTextField}