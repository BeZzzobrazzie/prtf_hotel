class MaskedTextField {
  constructor(domElement) {
    this.domElement = domElement;
    this.initEventListener(this.domElement);
    this.reg = /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    this.dateObj = {
      previous: '',
      current: '',
      day: '',
      month: '',
      year: '',
      dotFirst: false,
      dotSecond: false,
      formatted: true,
    }
  }

  initEventListener(domElement) {
    domElement.addEventListener('focusin', this);
    domElement.addEventListener('focusout', this);
    domElement.addEventListener('input', this);
    domElement.addEventListener('keydown', this);
  }


  handleEvent(event) {
    switch (event.type) {
      case 'focusin':
        if (event.target.value == event.target.getAttribute('value')) {
          event.target.value = '';
        }
        break;
      case 'focusout':
        if (event.target.value == '') {
          event.target.value = event.target.getAttribute('value');
        }
        break;
      case 'input':

        
        if(!this.checkInput(event)) {
          break;
        }

        let splitDate = event.target.value.split(/\.|\/|-/);

        this.dateObj.day = splitDate[0];
        this.dateObj.month = splitDate[1];
        this.dateObj.year = splitDate[2];

        if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 1) {
          this.dateObj.dotFirst = true;
        }
        else if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 2) {
          this.dateObj.dotFirst = true;
          this.dateObj.dotSecond = true;
        }

        if (this.dateObj.previous.length <= event.target.value.length) { // увеличение

          if (this.dateObj.day != undefined && this.dateObj.day.length > 2) {
            event.target.value = this.dateObj.previous;
            this.errAlert();
            break;
          }
          else {
            this.dateObj.formatted = true;
          }
  
          if (this.dateObj.month != undefined && this.dateObj.month.length > 2) {
            event.target.value = this.dateObj.previous;
            this.errAlert();
            break;
          }
          else {
            this.dateObj.formatted = true;
          }
  
          if (this.dateObj.year != undefined && this.dateObj.year.length > 4) {
            event.target.value = this.dateObj.previous;
            this.errAlert();
            break;
          }
          else {
            this.dateObj.formatted = true;
          }

          
          if (!this.dateObj.dotFirst && this.dateObj.day.length == 2) {
            //event.target.value += '.';
            this.dateObj.dotFirst = true;
          }
          if (this.dateObj.dotFirst && this.dateObj.day.length == 1) {
            //event.target.value = '0' + event.target.value;
            this.dateObj.day += '0';
          }
          if (this.dateObj.dotFirst && this.dateObj.month != undefined && this.dateObj.month.length == 2) {
            //event.target.value += '.';
            this.dateObj.dotSecond = true;
          }

          if (this.dateObj.dotFirst && this.dateObj.dotSecond) {
            if (this.dateObj.day.length == 1) {
              //event.target.value = '0' + event.target.value;
              this.dateObj.day += '0';
            }
            if (this.dateObj.month.length == 1) {
              //event.target.value = event.target.value.slice(0, 3) + '0' + event.target.value.slice(3);
              this.dateObj.month += '0';
            }
          }
          
        }
        else if (this.dateObj.previous.length == event.target.value.length) { // изменение при том же количестве символов

        }
        else if (this.dateObj.previous.length > event.target.value.length) { // уменьшение 

        }

        this.genDateOutput(event);






        if (this.dateObj.dotFirst && this.dateObj.dotSecond) {

        }
        else if (this.dateObj.dotFirst && !this.dateObj.dotSecond) {

        }
        else if (!this.dateObj.dotFirst && !this.dateObj.dotSecond) {
          
        }



        if (this.dateObj.previous.length <= event.target.value.length) { // увеличение
          // if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 0 && this.dateObj.day.length == 2) {
          //   event.target.value += '.';
          // }
          // if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 1 && this.dateObj.day.length == 1) {
          //   event.target.value = '0' + event.target.value;
          // }
          // if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 1 && this.dateObj.month != undefined && this.dateObj.month.length == 2) {
          //   event.target.value += '.';
          // }
          
          // if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 2) {
          //   if(this.dateObj.day.length == 1) {
          //     event.target.value = '0' + event.target.value;
          //   }
          //   if(this.dateObj.month.length == 1) {
          //     event.target.value = event.target.value.slice(0, 3) + '0' + event.target.value.slice(3);
          //   }
          // }





        }
        else if (this.dateObj.previous.length == event.target.value.length) { // изменение при том же количестве символов

        }
        else if (this.dateObj.previous.length > event.target.value.length) { // уменьшение 

        }

        this.dateObj.previous = event.target.value;
        break;

      case 'keydown':
        if (
          event.code == 'ArrowLeft' || 
          event.code == 'ArrowRight' || 
          event.code == 'ArrowUp' || 
          event.code == 'ArrowDown' || 
          event.code == 'ArrowUp ctrlKey' || 
          event.code == 'ArrowDown ctrlKey' || 
          event.code == 'Home' || 
          event.code == 'End') {          
          this.getCursorPosition(this.domElement.querySelector('.masked-text-field__input'));
        }
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


  getCursorPosition(parent) {
    setTimeout(() => {
      console.log(parent.selectionStart);
    }, 1)
  }

  checkInput(event) {
    let validChar = /[^\d-\/\.]/;
    if (validChar.test(event.target.value)) {  // проверка на недопустимые символы
      event.target.value = this.dateObj.previous;
      this.errAlert();
      return false;
    }

    if (event.target.value.length > 10) {    // проверка на максимальное количество символов (скорее всего избыточно)
      event.target.value = this.dateObj.previous;
      this.errAlert();
      return false;
    }

    if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length > 2) {  // проверка на количество разделителей
      event.target.value = this.dateObj.previous;
      this.errAlert();
      return false;
    }

    if (Array.from(event.target.value.matchAll(/\d/g)).length > 8) {       // проверка на количество символов
      event.target.value = this.dateObj.previous;
      this.errAlert();
      return false;
    }
    return true;
  }
  
  genDateOutput(event) {
    let day = (this.dateObj.day != undefined) ? this.dateObj.day : '';
    let month = (this.dateObj.month != undefined) ? this.dateObj.month : '';
    let year = (this.dateObj.year != undefined) ? this.dateObj.year : '';
    let dotFirst = this.dateObj.dotFirst ? '.' : '';
    let dotSecond = this.dateObj.dotSecond ? '.' : '';

    event.target.value = day + dotFirst + month + dotSecond + year;
  }

}

export {MaskedTextField}