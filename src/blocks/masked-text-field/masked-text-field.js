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

        if(this.previous.length <= event.target.value.length) { // увеличение
        
          let validChar = /[^\d-\/\.]/;
          if(validChar.test(event.target.value)) {  // проверка на недопустимые символы
            event.target.value = this.previous;
            this.errAlert();
            break;
          }
  
          let lengthNewStr = event.target.value.length - this.previous.length;
          let newStr = event.target.value.substr(this.previous.length, lengthNewStr);
          console.log('Пользователь ввёл: ' + newStr);
          
          if(event.target.value.length > 10) {    // проверка на максимальное количество символов (скорее всего избыточно)
            event.target.value = this.previous;
            this.errAlert();
            break;
          }

          if(Array.from(event.target.value.matchAll(/\.|\/|-/g)).length > 2) {  // проверка на количество разделителей
            event.target.value = this.previous;
            this.errAlert();
            break;
          }

          if(Array.from(event.target.value.matchAll(/\d/g)).length > 8) {       // проверка на количество символов
            event.target.value = this.previous;
            this.errAlert();
            break;
          }

          console.log(event.target.value.split(/\.|\/|-/));

          let splitDate = event.target.value.split(/\.|\/|-/);
          let day = splitDate[0];
          let month = splitDate[1];
          let year = splitDate[2];

          if(day.length > 2) {    
            event.target.value = this.previous;
            this.errAlert();
            break;
          }

          if(month.length > 2) {    
            event.target.value = this.previous;
            this.errAlert();
            break;
          }

          if(year.length > 4) {    
            event.target.value = this.previous;
            this.errAlert();
            break;
          }

        }
        else if(this.previous.length > event.target.value.length) { // уменьшение

        }

        this.previous = event.target.value;
        break;
    }
  }

  errAlert() {
    let elem = this.domElement.querySelector('.masked-text-field__input');
    elem.style.borderColor = 'red';
    setTimeout(() => {
      elem.style.borderColor = '';
    }, 1000);
  }
  
}

export {MaskedTextField}