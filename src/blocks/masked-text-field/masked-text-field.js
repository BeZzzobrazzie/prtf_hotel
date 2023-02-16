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
        
        this.dateObj.current = event.target.value;

        let splitDate = this.dateObj.current.split(/\.|\/|-/);

        this.dateObj.day = splitDate[0];
        this.dateObj.month = splitDate[1];
        this.dateObj.year = splitDate[2];

        if (Array.from(this.dateObj.current.matchAll(/\.|\/|-/g)).length == 1) {
          this.dateObj.dotFirst = true;
        }
        else if (Array.from(this.dateObj.current.matchAll(/\.|\/|-/g)).length == 2) {
          this.dateObj.dotFirst = true;
          this.dateObj.dotSecond = true;
        }

        if (this.dateObj.previous.length <= this.dateObj.current.length) { // увеличение

          if (this.dateObj.day != undefined && this.dateObj.day.length > 2) {
            this.dateObj.current = this.dateObj.previous;
            this.errAlert();
            break;
          }
          else {
            this.dateObj.formatted = true;
          }
  
          if (this.dateObj.month != undefined && this.dateObj.month.length > 2) {
            this.dateObj.current = this.dateObj.previous;
            this.errAlert();
            break;
          }
          else {
            this.dateObj.formatted = true;
          }
  
          if (this.dateObj.year != undefined && this.dateObj.year.length > 4) {
            this.dateObj.current = this.dateObj.previous;
            this.errAlert();
            break;
          }
          else {
            this.dateObj.formatted = true;
          }

          
          if (!this.dateObj.dotFirst && this.dateObj.day.length == 2) {
            //this.dateObj.current += '.';
            this.dateObj.dotFirst = true;
          }
          if (this.dateObj.dotFirst && this.dateObj.day.length == 1) {
            //this.dateObj.current = '0' + this.dateObj.current;
            this.dateObj.day += '0';
          }
          if (this.dateObj.dotFirst && this.dateObj.month != undefined && this.dateObj.month.length == 2) {
            //this.dateObj.current += '.';
            this.dateObj.dotSecond = true;
          }

          if (this.dateObj.dotFirst && this.dateObj.dotSecond) {
            if (this.dateObj.day.length == 1) {
              //this.dateObj.current = '0' + this.dateObj.current;
              this.dateObj.day += '0';
            }
            if (this.dateObj.month.length == 1) {
              //this.dateObj.current = this.dateObj.current.slice(0, 3) + '0' + this.dateObj.current.slice(3);
              this.dateObj.month += '0';
            }
          }
          
        }
        else if (this.dateObj.previous.length == this.dateObj.current.length) { // изменение при том же количестве символов

        }
        else if (this.dateObj.previous.length > this.dateObj.current.length) { // уменьшение 

        }

        this.genDateOutput(event);






        if (this.dateObj.dotFirst && this.dateObj.dotSecond) {

        }
        else if (this.dateObj.dotFirst && !this.dateObj.dotSecond) {

        }
        else if (!this.dateObj.dotFirst && !this.dateObj.dotSecond) {
          
        }



        if (this.dateObj.previous.length <= this.dateObj.current.length) { // увеличение
          // if (Array.from(this.dateObj.current.matchAll(/\.|\/|-/g)).length == 0 && this.dateObj.day.length == 2) {
          //   this.dateObj.current += '.';
          // }
          // if (Array.from(this.dateObj.current.matchAll(/\.|\/|-/g)).length == 1 && this.dateObj.day.length == 1) {
          //   this.dateObj.current = '0' + this.dateObj.current;
          // }
          // if (Array.from(this.dateObj.current.matchAll(/\.|\/|-/g)).length == 1 && this.dateObj.month != undefined && this.dateObj.month.length == 2) {
          //   this.dateObj.current += '.';
          // }
          
          // if (Array.from(this.dateObj.current.matchAll(/\.|\/|-/g)).length == 2) {
          //   if(this.dateObj.day.length == 1) {
          //     this.dateObj.current = '0' + this.dateObj.current;
          //   }
          //   if(this.dateObj.month.length == 1) {
          //     this.dateObj.current = this.dateObj.current.slice(0, 3) + '0' + this.dateObj.current.slice(3);
          //   }
          // }





        }
        else if (this.dateObj.previous.length == this.dateObj.current.length) { // изменение при том же количестве символов

        }
        else if (this.dateObj.previous.length > this.dateObj.current.length) { // уменьшение 

        }

        this.dateObj.previous = this.dateObj.current;
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
    if (validChar.test(this.dateObj.current)) {  // проверка на недопустимые символы
      this.dateObj.current = this.dateObj.previous;
      this.errAlert();
      return false;
    }

    if (this.dateObj.current.length > 10) {    // проверка на максимальное количество символов (скорее всего избыточно)
      this.dateObj.current = this.dateObj.previous;
      this.errAlert();
      return false;
    }

    if (Array.from(this.dateObj.current.matchAll(/\.|\/|-/g)).length > 2) {  // проверка на количество разделителей
      this.dateObj.current = this.dateObj.previous;
      this.errAlert();
      return false;
    }

    if (Array.from(this.dateObj.current.matchAll(/\d/g)).length > 8) {       // проверка на количество символов
      this.dateObj.current = this.dateObj.previous;
      this.errAlert();
      return false;
    }
    return true;
  }
  
  genDateOutput(event) {
    let dotFirst = this.dateObj.dotFirst ? '.' : '';
    let dotSecond = this.dateObj.dotSecond ? '.' : '';

    event.target.value = (this.dateObj.day != undefined) ? this.dateObj.day : '' + 
                          this.dateObj.dotFirst ? '.' : '' + 
                          (this.dateObj.month != undefined) ? this.dateObj.month : '' + 
                          this.dateObj.dotSecond ? '.' : '' + 
                          (this.dateObj.year != undefined) ? this.dateObj.year : '';
  }

}

export {MaskedTextField}