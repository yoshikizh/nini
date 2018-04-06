class SceneExample051 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    let viewport = new Viewport(new Rect( 100, 100, Graphics.width - 200, Graphics.height - 200 ))

    // 创建精灵 并设置位图
    this.sp = new Sprite(viewport)
    this.sp.bitmap = new Bitmap('./assets/images/nini_big.jpg')

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


  }
}
