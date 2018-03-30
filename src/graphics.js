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

        let _color = sprite.color

        this.ctx.save()
        this.ctx.translate(_ctx_ox,_ctx_oy)
        this.ctx.rotate(sprite.angle*Math.PI/180);
        this.ctx.translate(-_ctx_ox,-_ctx_oy)
        
        this.ctx.drawImage( bitmap._canvas ,0 ,0 , bitmap.width, bitmap.height, _x, _y, bitmap.width* sprite.scale, bitmap.height* sprite.scale )
        
        if (_color.alpha > 0){
          this.ctx.globalCompositeOperation = 'source-over'
          this.ctx.fillStyle = _color.toRgbHex()
          this.ctx.globalAlpha = _color.alpha / 255
          this.ctx.fillRect(_x, _y, bitmap.width* sprite.scale, bitmap.height* sprite.scale)
        }

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


