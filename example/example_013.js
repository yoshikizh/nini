class SceneExample013 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 目标裁剪精灵
    this.sprites = []

    // 原始位图
    this.origin_bitmap = new Bitmap('./assets/images/nini_big.jpg', ()=>{

      // 设置裁剪精灵
      for ( let i = 0; i < 30; i++) {
        let sp = new Sprite()
        let w = parseInt(400/10)
        let h = parseInt(556/10)
        sp.bitmap = new Bitmap({width: w, height: h})

        let dx = parseInt(i / 10) * w
        let dy = parseInt(i % 10) * h

        let src_rect = new Rect(dx, dy, w, h)

        console.log(src_rect)

        sp.bitmap.bltImage(0, 0, this.origin_bitmap, src_rect)
        sp.ox = 0.5
        sp.oy = 0.5
        sp.x = Graphics.width / 2
        sp.y = Graphics.height / 2
        sp.move_dir = [1,3,7,9][Math.rand(4)]
        sp.opacity_status = 'add'
        sp.scale_status = ['add','minus'][Math.rand(2)]
        sp.opacity = 50 + Math.rand(200)

        this.sprites.push(sp)
      }

    })

    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

    this.sprites.forEach((sp)=>{

      // 移动坐标
      if ([3,9].includes(sp.move_dir)) sp.x += 5 + Math.rand(5)
      if ([1,7].includes(sp.move_dir)) sp.x -= 5 + Math.rand(5)
      if ([1,3].includes(sp.move_dir)) sp.y += 5 + Math.rand(5)
      if ([7,9].includes(sp.move_dir)) sp.y -= 5 + Math.rand(5)

      // 透明度变化
      if ( sp.opacity_status === 'add' ) sp.opacity += 5
      if ( sp.opacity_status === 'minus' ) sp.opacity -= 5
      if ( sp.opacity <= 50 ) sp.opacity_status = 'add'
      if ( sp.opacity >= 255 ) sp.opacity_status = 'minus'

      // 缩放变化
      if ( sp.scale_status === 'add' ) sp.scale += 0.01 * Math.rand(10)
      if ( sp.scale_status === 'minus' ) sp.scale -= 0.01 * Math.rand(10)
      if ( sp.scale <= 0.5 ) sp.scale_status = 'add'
      if ( sp.scale >= 3 ) sp.scale_status = 'minus'

      // 角度变化 ( 每帧增加10度 )
      sp.angle = sp.angle + 10

      // 利用勾股定理 计算图片最大半径
      let width = sp.bitmap.width
      let height = sp.bitmap.height
      let distance = Math.sqrt(Math.pow(width * sp.scale,2) +  Math.pow(height * sp.scale,2)) * 0.5

      // 检测半径碰撞
      if ( sp.x + distance >= Graphics.width )
        sp.move_dir = sp.move_dir === 3 ? 1 : 7
      if ( sp.x - distance <=  0 )
        sp.move_dir = sp.move_dir === 1 ? 3 : 9
      if ( sp.y + distance >= Graphics.height )
        sp.move_dir = sp.move_dir === 3 ? 9 : 7
      if ( sp.y - distance <= 0 )
        sp.move_dir = sp.move_dir === 7 ? 1 : 3

    })

  }
}
