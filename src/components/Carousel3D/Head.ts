
export class Head{

  private root:HTMLElement;
  private lis:HTMLCollection;

  constructor(element:HTMLElement){
    
    this.root = element;
    this.lis = element.getElementsByTagName('li');



  }


}