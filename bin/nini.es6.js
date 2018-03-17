Math.rand = function(max) {
  return Math.floor(max * Math.random())
}

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
}

class Color {

  constructor(r,g,b,a){
    this.red = r
    this.green = g
    this.blue = b
    this.alpha = a
  }

}

class Viewport {

  constructor(obj){
    if ( obj.constructor.name !== 'Rect') {
      throw new Error('Viewport参数必须是Rect对象')
      return
    } 
    this.rect = obj
  }

}

class Bitmap {

  constructor(obj){

    if ( typeof(obj) === 'string' ) {
      this.img = new Image()
      this.img.src = obj

      this.img.onload = ()=>{
        this.width  = this.img.width
        this.height = this.img.height

      }
    }

    if ( typeof(obj) === 'object' ) {
      this.width  = obj.width
      this.height = obj.height
    }

  }
}

class Sprite {

  constructor(viewport = null){
    this._viewport = viewport
    this._bitmap = null
    this._opacity = 255
    this._scale = 1
    this._angle = 0

    this._x = 0
    this._y = 0
    this._z = 0

    this._ox = 0
    this._oy = 0

    this._mirror = false

    Graphics.addSprite(this)
  }

  get _viewport(){ return this.__viewport }
  set _viewport(value){ this.__viewport = value }
  get bitmap(){ return this._bitmap }
  set bitmap(value){ this._bitmap = value }
  get opacity(){ return this._opacity }
  set opacity(value){ this._opacity = value }
  get scale(){ return this._scale }
  set scale(value){ this._scale = value }
  get angle(){ return this._angle }
  set angle(value){ this._angle = value % 360 }
  get x(){ return this._x }
  set x(value){ this._x = value }
  get y(){ return this._y }
  set y(value){ this._y = value }
  get z(){ return this._z }
  set z(value){ this._z = value }
  get ox(){ return this._ox }
  set ox(value){ this._ox = value }
  get oy(){ return this._oy }
  set oy(value){ this._oy = value }

  dispose(){

  }
}

class Graphics {

  static init(canvas) {
    this.ctx = canvas.getContext('2d')
    this.sprites = []
  }

  static update(){

    this.clearCtx()

    let bitmap = null

    this.sprites.forEach((sprite)=>{

      bitmap = sprite.bitmap

      if ( bitmap ) {

        this.ctx.globalAlpha = (1 / 255) * sprite.opacity

        let _x = sprite.x - sprite.ox * (bitmap.width * sprite.scale)
        let _y = sprite.y - sprite.oy * (bitmap.height * sprite.scale)

        let _ctx_ox = _x + sprite.ox * bitmap.width * sprite.scale
        let _ctx_oy = _y + sprite.oy * bitmap.height * sprite.scale

        this.ctx.save()
        this.ctx.translate(_ctx_ox,_ctx_oy)
        this.ctx.rotate(sprite.angle*Math.PI/180);
        this.ctx.translate(-_ctx_ox,-_ctx_oy)
        // this.ctx.scale(sprite.scale,sprite.scale);
        // this.ctx.fillStyle = "red"
        this.ctx.drawImage( bitmap.img ,0 ,0 , bitmap.width, bitmap.height, _x, _y, bitmap.width* sprite.scale, bitmap.height* sprite.scale )
        // this.ctx.scale(1,1);
        this.ctx.rotate(0)
        this.ctx.globalAlpha = 1
        this.ctx.restore()
      }

    })

  }

  static addSprite(sprite){
    this.sprites.push(sprite)
  }

  static clearCtx(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  static clearSprites(){
    this.sprites = []
  }

}
Graphics.init(canvas)

class SceneBase {

  loop(){

    this.update()

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  
  }

  update(){
    Graphics.update()
  }
}
class SceneManage {
  static init(){
    this.scene = null
  }

  static go(scene){
    this.scene = new scene()
  }
}

