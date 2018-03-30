class SceneExample008 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap('./assets/images/nini_sm.jpg')

    // 设置坐标为画面中心
    this.sp.x = canvas.width / 2
    this.sp.y = canvas.height / 2

    // 设置坐标原点(中心)
    this.sp.ox = 0.5
    this.sp.oy = 0.5

    // 设置默认缩放 1
    this.sp.scale = 1

    // 自定义移动方向 1 左下  3 右下  7 左上  9 右上
    this.sp.move_dir = 3

    // 自定义属性透明度增减  add 增加 minus 减少
    this.sp.opacity_status = 'minus'

    // 自定义属性缩放增减  add 增加 minus 减少
    this.sp.scale_status = 'minus'

    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

    // 移动坐标
    if ([3,9].includes(this.sp.move_dir)) this.sp.x += 5 + Math.rand(5)
    if ([1,7].includes(this.sp.move_dir)) this.sp.x -= 5 + Math.rand(5)
    if ([1,3].includes(this.sp.move_dir)) this.sp.y += 5 + Math.rand(5)
    if ([7,9].includes(this.sp.move_dir)) this.sp.y -= 5 + Math.rand(5)
      
    // 透明度变化
    if ( this.sp.opacity_status === 'add' ) this.sp.opacity += 5
    if ( this.sp.opacity_status === 'minus' ) this.sp.opacity -= 5
    if ( this.sp.opacity <= 50 ) this.sp.opacity_status = 'add'
    if ( this.sp.opacity >= 255 ) this.sp.opacity_status = 'minus'

    // 缩放变化
    if ( this.sp.scale_status === 'add' ) this.sp.scale += 0.01 * Math.rand(10)
    if ( this.sp.scale_status === 'minus' ) this.sp.scale -= 0.01 * Math.rand(10)
    if ( this.sp.scale <= 0.5 ) this.sp.scale_status = 'add'
    if ( this.sp.scale >= 2 ) this.sp.scale_status = 'minus'

    // 角度变化 ( 每帧增加10度 )
    this.sp.angle = this.sp.angle + 10

    // 利用勾股定理 计算图片最大半径
    let width = this.sp.bitmap.width
    let height = this.sp.bitmap.height
    let distance = Math.sqrt(Math.pow(width * this.sp.scale,2) +  Math.pow(height * this.sp.scale,2)) * 0.5

    // 检测半径碰撞
    if ( this.sp.x + distance >= canvas.width )
      this.sp.move_dir = this.sp.move_dir === 3 ? 1 : 7
    if ( this.sp.x - distance <=  0 )
      this.sp.move_dir = this.sp.move_dir === 1 ? 3 : 9
    if ( this.sp.y + distance >= canvas.height )
      this.sp.move_dir = this.sp.move_dir === 3 ? 9 : 7
    if ( this.sp.y - distance <= 0 )
      this.sp.move_dir = this.sp.move_dir === 7 ? 1 : 3

  }
}
