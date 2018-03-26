Math.rand = function(max) {
  return Math.floor(max * Math.random())
}

Array.prototype.clear = function() {
  this.splice(0,this.length)
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

  isValid(){
    return this.x >= 0 && this.y >= 0 && this.width > 0 && this.height > 0
  }
}

class Color {

  constructor(r,g,b,a=255){
    this.red = r
    this.green = g
    this.blue = b
    this.alpha = a
  }

  toRgbHex(){
    let _red   = this.red.toString(16)
    let _green = this.green.toString(16)
    let _blue  = this.blue.toString(16)

    if (_red < 16) _red = '0' + _red
    if (_green < 16) _green = '0' + _green
    if (_blue < 16) _blue = '0' + _blue

    return '#' + _red + _green + _blue
  }
}
class Font{
  constructor(){
    this.name = 'Arial'
    this.color = new Color(255,255,255)
    this.size = 16
  }
}class Viewport {

  constructor(obj){
    if ( obj.constructor.name !== 'Rect') {
      throw new Error('Viewport参数必须是Rect对象')
      return
    } 
    this.rect = obj
  }

}

class Bitmap {

  constructor(obj, callback){

    // 兼容微信小游戏
    this._canvas = typeof(wx) === 'object' ? wx.createCanvas() : document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d')
    this.font = new Font()

    if ( typeof(obj) === 'string' ) {
      this.img = new Image()
      this.img.src = obj
      
      this.img.onload = ()=>{
        this.width  = this.img.width
        this.height = this.img.height

        this._canvas.width = this.width
        this._canvas.height = this.height

        this._ctx.drawImage(this.img, 0,0,this.width,this.height,0,0,this.width,this.height)

        if ( callback ) {
          callback()
        }
      }
    }

    if ( typeof(obj) === 'object' ) {
      this.width  = obj.width
      this.height = obj.height
      this._canvas.width = Math.max(this.width || 0, 1)
      this._canvas.height = Math.max(this.height || 0, 1)
    }
  }

  drawText(rect, str, align = 0) {

    // Todo 自定义字体&字号 ...
    let font_name = this.font.name
    let font_size = this.font.size

    // Tip canvas 获取不到字高，默认字高为字号大小的 90%
    let font_height = this.font.size * 0.9

    this._ctx.save()

    this._ctx.rect( ...rect.toArray() )
    this._ctx.clip()

    this._ctx.fillStyle = this.font.color.toRgbHex()
    this._ctx.font    = `${font_size}px ${font_name}`

    this._ctx.textAlign = ['left', 'center', 'right'][align]

    let str_width = this._ctx.measureText(str).width

    let x = rect.x
    if ( this._ctx.textAlign === 'left' ) {
      let x = rect.x
    }
    if ( this._ctx.textAlign === 'center' ) {
      x = rect.x + (rect.width+str_width) / 2 - str_width / 2
    }
    if ( this._ctx.textAlign === 'right' ) {
      x = rect.x + ( (rect.width+str_width) - str_width )
    }

    this._ctx.fillText(str,x, rect.y + font_height, rect.width)

    this._ctx.restore()
  }

  bltImage(dx, dy ,src_bitmap , src_rect) {
    if ( src_rect.isValid() ) {
      this._ctx.globalCompositeOperation = 'source-over'
      this._ctx.drawImage(src_bitmap.img, ...src_rect.toArray(), dx, dy, src_rect.width, src_rect.height )
    }
  }

  stretchBltImage(src_bitmap, src_rect, dest_rect) {
    if ( src_rect.isValid() ) {
      this._ctx.globalCompositeOperation = 'source-over'
      this._ctx.drawImage(src_bitmap.img, ...src_rect.toArray(), ...dest_rect.toArray() )
    }
  }

  changeHue(offset) {

    if (offset && this.width > 0 && this.height > 0) {

      let image_data = this._ctx.getImageData(0, 0, this.width, this.height)
      let pix_data = image_data.data

      let _rgbToHsl = (r, g, b)=> {
        let cmin = Math.min(r, g, b)
        let cmax = Math.max(r, g, b)
        let h = 0
        let s = 0
        let l = (cmin + cmax) / 2
        let delta = cmax - cmin

        if (delta > 0) {
          if (r === cmax) {
            h = 60 * (((g - b) / delta + 6) % 6)
          } else if (g === cmax) {
            h = 60 * ((b - r) / delta + 2)
          } else {
            h = 60 * ((r - g) / delta + 4)
          }
          s = delta / (255 - Math.abs(2 * l - 255))
        }
        return [h, s, l]
      }

      let _hslToRgb = (h, s, l)=> {
        let c = (255 - Math.abs(2 * l - 255)) * s
        let x = c * (1 - Math.abs((h / 60) % 2 - 1))
        let m = l - c / 2
        let cm = c + m
        let xm = x + m

        if (h < 60) {
          return [cm, xm, m]
        } else if (h < 120) {
          return [xm, cm, m]
        } else if (h < 180) {
          return [m, cm, xm]
        } else if (h < 240) {
          return [m, xm, cm]
        } else if (h < 300) {
          return [xm, m, cm]
        } else {
          return [cm, m, xm]
        }
      }

      let _offset = ((offset % 360) + 360) % 360;

      for (let i = 0; i < pix_data.length; i += 4) {
          let hsl = _rgbToHsl(pix_data[i + 0], pix_data[i + 1], pix_data[i + 2]);
          let h = (hsl[0] + _offset) % 360;
          let s = hsl[1];
          let l = hsl[2];
          let rgb = _hslToRgb(h, s, l);
          pix_data[i + 0] = rgb[0];
          pix_data[i + 1] = rgb[1];
          pix_data[i + 2] = rgb[2];
      }
      this._ctx.putImageData(image_data, 0, 0);
    }

  }

  static fillRect(rect, color) {

  }

  static clear(){

  }

  static clearRect(rect) {

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
    this.initialized = true
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.frame_count = 0
    this.sprites = []
  }

  static update(){
    this.frame_count++
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
        
        this.ctx.drawImage( bitmap._canvas ,0 ,0 , bitmap.width, bitmap.height, _x, _y, bitmap.width* sprite.scale, bitmap.height* sprite.scale )

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
    this.sprites.clear()
  }

}


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

    if ( !Graphics.initialized ) {

      // 兼容微信小游戏则无需 canvas_id
      let canvas = typeof(wx) === 'object' ? wx.createCanvas() : document.getElementById(Graphics.canvas_id)

      if (!canvas) {
        throw new Error('init canvas failed')
        return
      }
      Graphics.init(canvas)

    } else {
      Graphics.clearSprites()
    }
    this.scene = new scene()
  }
}

