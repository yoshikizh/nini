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

  // private
  _measureTextWidth(str) {
    let ctx = this._ctx
    ctx.save()
    ctx.font = this._makeFontCssFormat()
    let width = ctx.measureText(str).width
    ctx.restore()
    return width
  }

  // private
  _makeFontCssFormat() {
    let font_name = this.font.name
    let font_size = this.font.size
    return `${font_size}px ${font_name}`
  }

  drawText(rect, str, align = 0) {

    // 计算字高
    let font_height = rect.height - (rect.height - this.font.size * 0.7) / 2
    let str_width = this._measureTextWidth(str)

    this._ctx.save()
    this._ctx.rect( ...rect.toArray() )
    this._ctx.clip()
    this._ctx.fillStyle = this.font.color.toRgbHex()
    this._ctx.font      = this._makeFontCssFormat()
    this._ctx.textAlign = ['left', 'center', 'right'][align]
    this._ctx.textBaseline = 'alphabetic'


    let x = rect.x
    let y = rect.y + font_height
    if ( this._ctx.textAlign === 'left' ) {
      let x = rect.x
    }
    if ( this._ctx.textAlign === 'center' ) {
      x = rect.x + ( rect.width + str_width ) / 2 - str_width / 2
    }
    if ( this._ctx.textAlign === 'right' ) {
      x = rect.x + ( (rect.width + str_width) - str_width )
    }
    this._ctx.fillText(str,x,y,rect.width)
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
        let hsl = _rgbToHsl(pix_data[i + 0], pix_data[i + 1], pix_data[i + 2])
        let h = (hsl[0] + _offset) % 360
        let s = hsl[1]
        let l = hsl[2]
        let rgb = _hslToRgb(h, s, l)
        pix_data[i + 0] = rgb[0]
        pix_data[i + 1] = rgb[1]
        pix_data[i + 2] = rgb[2]
      }
      this._ctx.putImageData(image_data, 0, 0)
    }
  }

  drawCircle(x, y, radius, color) {
    let ctx = this._ctx
    ctx.save()
    ctx.fillStyle = color.toRgbHex()
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.restore()
  }

  fillRect(rect, color) {
    let ctx = this._ctx
    ctx.save()
    ctx.fillStyle = color.toRgbHex();
    ctx.fillRect(...rect.toArray());
    ctx.restore()
  }

  fillAll(color) {
    this.fillRect(new Rect(0, 0, this.width, this.height), color.toRgbHex())
  }

  clearRect(rect) {
    this._ctx.clearRect(...rect.toArray());
  }

  clear(){
    this.clearRect(new Rect(0, 0, this.width, this.height));
  }

}

