class Viewport {

  constructor(obj){
    if ( obj.constructor.name !== 'Rect') {
      throw new Error('Viewport参数必须是Rect对象')
      return
    } 
    this.x = obj.x
    this.y = obj.y
    this.width = obj.width
    this.height = obj.height
  }

  toRect(){
    return new Rect(this.x, this.y, this.width, this.height)
  }
  toArray(){
    return [this.x, this.y, this.width, this.height]
  }
}

