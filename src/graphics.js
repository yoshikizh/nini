class Graphics {

  static init(canvas) {
    this.canvas = canvas
    this.initialized = true
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.frame_count = 0
    this.sprites = []
    this.toucher = new Toucher()
    this.touched_sprite = null
  }

  static update(){
    this.frame_count++
    this.clearCtx()

    this.sortedSpritesByZOrder(this.sprites).forEach((sprite)=>{
      this.refreshSpriteCanvas(sprite)
    })

  }

  static refreshSpriteCanvas(sprite){
    let bitmap = sprite.bitmap

    if ( bitmap ) {

      if ( sprite.viewport ){
        this.ctx.save()
        this.ctx.rect( ...sprite.viewport.toArray() )
        this.ctx.clip()
      }

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

      if ( sprite.viewport ){
        this.ctx.restore()
      }



    }

  }

  static isTouch(sprite){
    return sprite.realRect().isInclude(Toucher.x,Toucher.y)
  }

  static sortedSpritesByZOrder(sprites){
    return sprites.sort((a,b)=>{ return a.z - b.z })
  }


  static touchstartCallback(){

    let sprites = this.sprites.filter((sprite)=>{
      return sprite.on_touchstart_callback !== null && this.isTouch(sprite)
    })
    let touched_sprite = sprites[sprites.length-1]
    if (touched_sprite) {
      touched_sprite.on_touchstart_callback()
      this.touched_sprite = touched_sprite
    }
  }
  static touchmoveCallback(){
    
  }
  static touchendCallback(){
    if (this.touched_sprite){
      this.touched_sprite.on_touchend_callback()
      this.touched_sprite = null
    }
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

  static disposeSprite(sprite){
    this.sprites.forEach((_sprite,i)=>{
      if(sprite === _sprite){
        this.sprites.splice(i,1)
      }
    })
  }

}


