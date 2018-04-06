class Rect{
  constructor(x,y,width,height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  toArray(){
    return [this.x, this.y, this.width, this.height]
  }

  isValid(){
    return this.x >= 0 && this.y >= 0 && this.width > 0 && this.height > 0
  }

  isInclude(x,y){
    return x >= this.x && x <= ( this.x + this.width ) && y >= this.y && y <= ( this.y + this.height )
  }

  isIncludeRect(rect) {
    let _x = rect.x
    let _y = rect.y
    let _width = rect.width
    let _height = rect.height
    return _x > this.x && _x < this.x + this.width && _y > this.y && _y < this.y + this.width
  }
}

