class Bitmap {

  constructor(obj){
    if ( typeof(obj) === 'string' ) {
      this.img = new Image()
      this.img.src = obj
      this.font = null

      // 兼容微信小游戏
      this._canvas = typeof(wx) === 'object' ? wx.createCanvas() : document.createElement('canvas')
      this._ctx = this._canvas.getContext('2d')

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

  static drawText(rect, str, align = 1) {

  }

  static bltImage(dx, dy ,src_bitmap , src_rect) {
    if ( src_rect.isValid() ) {
      Graphics.ctx.globalCompositeOperation = 'source-over'
      Graphics.ctx.drawImage(src_bitmap.img, ...src_rect.toArray(), dx, dy, src_rect.width, src_rect.height )
    }
  }

  static stretchBltImage(src_bitmap, src_rect, dest_rect) {
    if ( src_rect.isValid() && dest_rect.width > 0 && dest_rect.height > 0 &&
      src_rect.x + src_rect.width <= src_bitmap.width && 
      src_rect.y + src_rect.height <= src_bitmap.height) {

      Graphics.ctx.globalCompositeOperation = 'source-over'
      Graphics.ctx.drawImage(src_bitmap.img, ...src_rect.toArray(), ...dest_rect.toArray())

    }
  }


  static fillRect(rect, color) {

  }

  static clear(){

  }

  static clearRect(rect) {

  }

}


Bitmap.prototype.bltImage = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    dw = dw || sw;
    dh = dh || sh;
    if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
        sx + sw <= source.width && sy + sh <= source.height) {
        this._context.globalCompositeOperation = 'source-over';
        this._context.drawImage(source._image, sx, sy, sw, sh, dx, dy, dw, dh);
        this._setDirty();
    }
};