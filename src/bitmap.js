class Bitmap {

  constructor(obj){

    // 兼容微信小游戏
    this._canvas = typeof(wx) === 'object' ? wx.createCanvas() : document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d')
    this.font = null

    if ( typeof(obj) === 'string' ) {
      this.img = new Image()
      this.img.src = obj
      
      this.img.onload = ()=>{
        this.width  = this.img.width
        this.height = this.img.height

        this._canvas.width = this.width
        this._canvas.height = this.height

        this._ctx.drawImage(this.img, 0,0,this.width,this.height,0,0,this.width,this.height)
      }
    }

    if ( typeof(obj) === 'object' ) {
      this.width  = obj.width
      this.height = obj.height
      this._canvas.width = Math.max(this.width || 0, 1)
      this._canvas.height = Math.max(this.height || 0, 1)
    }
  }

  drawText(rect, str, align = 1) {

  }

  bltImage(dx, dy ,src_bitmap , src_rect) {
    if ( src_rect.isValid() ) {
      this._ctx.globalCompositeOperation = 'source-over'
      this._ctx.drawImage(src_bitmap.img, ...src_rect.toArray(), dx, dy, src_rect.width, src_rect.height )
    }
  }

  static stretchBltImage(src_bitmap, src_rect, dest_rect) {
    if ( src_rect.isValid() && dest_rect.width > 0 && dest_rect.height > 0 &&
      src_rect.x + src_rect.width <= src_bitmap.width && 
      src_rect.y + src_rect.height <= src_bitmap.height) {

      this._ctx.globalCompositeOperation = 'source-over'
      this._ctx.drawImage(src_bitmap.img, ...src_rect.toArray(), ...dest_rect.toArray())

    }
  }


  static fillRect(rect, color) {

  }

  static clear(){

  }

  static clearRect(rect) {

  }

}

