class Viewport {

  constructor(obj){
    if ( obj.constructor.name !== 'Rect') {
      throw new Error('Viewport参数必须是Rect对象')
      return
    } 
    this.rect = obj
  }

}

