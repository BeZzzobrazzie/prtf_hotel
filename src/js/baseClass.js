class BaseClass {
  constructor(domElement) {
    this.domElement = domElement;
    this.init(this.domElement);
  }


  init(domElement) {
    for (let child of domElement.children) {
      for(let c of child.classList) {
        let prom;
        switch(this.checkClassBem(c)) {
          case 'block':
            prom = import('../blocks/' + this.pathToModuleBlock(c) + '.js');
            prom.then(
              result => this.handlerImportResult(result, child), 
              error => this.handlerImportError(error, child)
            );
            break;
          case 'element':
            break;
          case 'mod':
            break;
          case 'error':
            break;
        }
      }
      this.init(child);
    }
  }



  checkClassBem(cls) {
    if (!cls.includes('_')) {
      return 'block'
    }
    else if (cls.includes(cls.match(/[^_]__[^_]/)) && !cls.includes(cls.match(/[^_]_[^_]/))) {
      return 'element'
    }
    else if (cls.includes(cls.match(/[^_]_[^_]/))) {
      return 'mod'
    }
    else {
      return 'error'
    }
  }

  pathToModuleBlock(cls) {
    let path = String(cls) + '/' + String(cls);
    return path;
  }
  
  handlerImportResult(result, child) {
    //console.log(result);
    for(let key in result) {
      //this.children.push(new result[key](child));
      new result[key](child);
    }
  }

  handlerImportError(error, child) {
    //console.log(error);
    //this.children.push(this.createBlank(child));
  }

}

export { BaseClass };