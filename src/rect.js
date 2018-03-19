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
}

