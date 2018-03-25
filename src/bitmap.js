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

  static fillRect(rect, color) {

  }

  static clear(){

  }

  static clearRect(rect) {

  }

}

