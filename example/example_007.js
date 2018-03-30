class SceneExample007 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sprites = []

    let bitmap = new Bitmap('./assets/images/nini_sm.jpg')

    // let color_hash = [new Color(255,0,0,100), new Color(0,255,0,100), new Color(0,0,255,100)]

    for ( let i = 0; i < 3; i ++ ) {

      let sprite = new Sprite()
      sprite.bitmap = bitmap

      sprite.x = (canvas.width / 3 / 2) + i * canvas.width / 3
      sprite.y = canvas.height / 2

      sprite.ox = 0.5
      sprite.oy = 0.5

      // sprite.color = color_hash[i]

      // 自定义动画计数 和 状态
      sprite.animation_count = 0
      sprite.animation_status = 'add'

      this.sprites.push(sprite)

    }

    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

    this.sprites.forEach((sprite,i)=>{
      
      let color = sprite.color

      if (sprite.animation_count <= 0) sprite.animation_status = 'add'
      if (sprite.animation_count >= 255) sprite.animation_status = 'minus'
      if ( sprite.animation_status === 'add' ) sprite.animation_count++
      if ( sprite.animation_status === 'minus' ) sprite.animation_count--
      if (i === 0) sprite.color = new Color(255, 0, 0, sprite.animation_count)
      if (i === 1) sprite.color = new Color(0, 255, 0, sprite.animation_count)
      if (i === 2) sprite.color = new Color(0, 0, 255, sprite.animation_count)
      
    })
  }
}
