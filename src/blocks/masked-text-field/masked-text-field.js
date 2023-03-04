class MaskedTextField {
  constructor(domElement) {
    this.domElement = domElement;
    this.domElementInput = domElement.querySelector('.masked-text-field__input');
    this.initEventListener();
    this.dateObj = {
      previous: '',
      day: '',
      month: '',
      year: '',
      dotFirst: false,
      dotSecond: false,
      dotPressed: false,
      formatted: true,
    }
  }

  initEventListener() {
    this.domElementInput.addEventListener('focusin', this);
    this.domElementInput.addEventListener('focusout', this);
    this.domElementInput.addEventListener('input', this);
    this.domElementInput.addEventListener('keydown', this);
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
        this.checkDate(event);
        break;

      case 'input':
        this.handleInput(event);
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
          //this.getCursorPosition(this.domElement.querySelector('.masked-text-field__input'));
        }
        if (
          event.key == '.' ||
          event.key == '/' ||
          event.key == '-') {
          this.dateObj.dotPressed = true;
          console.log('dot');
          console.log(this.dateObj.dotPressed);
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

  handleInput(event) {
    if(!this.checkInput(event)) {
      this.dateObj.dotPressed = false;
      return false;
    }

    this.splitDate(event);
    this.placementPoints(event);

    if (this.dateObj.previous.length <= event.target.value.length) { // увеличение
      if(!this.checkOctetLength(event)) {
        return false;
      }
      this.autoFill();
    }
    else if (this.dateObj.previous.length == event.target.value.length) { // изменение при том же количестве символов

    }
    else if (this.dateObj.previous.length > event.target.value.length) { // уменьшение 

    }

    this.genDateOutput(event);

    this.dateObj.dotPressed = false;
    this.dateObj.previous = event.target.value;
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

  splitDate(event) {
    let splitDate = event.target.value.split(/\.|\/|-/);

    this.dateObj.day = splitDate[0];
    this.dateObj.month = splitDate[1];
    this.dateObj.year = splitDate[2];
  }

  placementPoints(event) {
    if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 0) {
      this.dateObj.dotFirst = false;
      this.dateObj.dotSecond = false;
    }
    else if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 1) {
      this.dateObj.dotFirst = true;
      this.dateObj.dotSecond = false;
    }
    else if (Array.from(event.target.value.matchAll(/\.|\/|-/g)).length == 2) {
      this.dateObj.dotFirst = true;
      this.dateObj.dotSecond = true;
    }
  }

  checkOctetLength(event) {
    if (this.dateObj.day != undefined && this.dateObj.day.length > 2) {
      event.target.value = this.dateObj.previous;
      this.errAlert();
      this.dateObj.dotPressed = false;
      return false;
    }
    else {
      this.dateObj.formatted = true;
    }

    if (this.dateObj.month != undefined && this.dateObj.month.length > 2) {
      event.target.value = this.dateObj.previous;
      this.errAlert();
      this.dateObj.dotPressed = false;
      return false;
    }
    else {
      this.dateObj.formatted = true;
    }

    if (this.dateObj.year != undefined && this.dateObj.year.length > 4) {
      event.target.value = this.dateObj.previous;
      this.errAlert();
      this.dateObj.dotPressed = false;
      return false;
    }
    else {
      this.dateObj.formatted = true;
    }

    return true;
  }

  autoFill() {
    if (!this.dateObj.dotFirst && this.dateObj.day.length == 2) {
      this.dateObj.dotFirst = true;
    }
    if (this.dateObj.dotFirst && this.dateObj.day.length == 1 && this.dateObj.dotPressed) {
      this.dateObj.day = '0' + this.dateObj.day;
    }
    if (this.dateObj.dotFirst && this.dateObj.month != undefined && this.dateObj.month.length == 2) {
      this.dateObj.dotSecond = true;
    }

    if (this.dateObj.dotFirst && this.dateObj.dotSecond) {
      if (this.dateObj.day.length == 1 && this.dateObj.dotPressed) {
        this.dateObj.day = '0' + this.dateObj.day;
      }
      if (this.dateObj.month.length == 1 && this.dateObj.dotPressed) {
        this.dateObj.month = '0' + this.dateObj.month;
      }
    }
  }
  
  genDateOutput(event) {
    let day = (this.dateObj.day != undefined) ? this.dateObj.day : '';
    let month = (this.dateObj.month != undefined) ? this.dateObj.month : '';
    let year = (this.dateObj.year != undefined) ? this.dateObj.year : '';
    let dotFirst = this.dateObj.dotFirst ? '.' : '';
    let dotSecond = this.dateObj.dotSecond ? '.' : '';

    event.target.value = day + dotFirst + month + dotSecond + year;
    if (event.target.value.length == 10) {
      this.checkDate(event);
    }
  }

  checkDate(event) {
    let day = (this.dateObj.day != undefined) ? this.dateObj.day : '';
    let month = (this.dateObj.month != undefined) ? this.dateObj.month : '';
    let year = (this.dateObj.year != undefined) ? this.dateObj.year : '';
    let dotFirst = this.dateObj.dotFirst ? '-' : '';
    let dotSecond = this.dateObj.dotSecond ? '-' : '';

    let ms = Date.parse(year + dotSecond + month + dotFirst + day);
    let output = new Date(ms);
    if (output == 'Invalid Date') {
      console.log('error');
      console.log(output);
    }
    else {
      console.log('ok');
      console.log(output);
    }
  }

  getCursorPosition(parent) {
    setTimeout(() => {
      console.log(parent.selectionStart);
    }, 1)
  }

}

export {MaskedTextField}