import { BaseClass } from "./baseClass";

console.log('hi, fields-and-buttons');


class Main extends BaseClass {
  constructor(domElement) {
    super(domElement);
  }


}

let main = new Main(document.documentElement);
