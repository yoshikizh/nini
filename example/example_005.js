class SceneExample005 extends SceneBase {
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

    // 自定义属性透明度增减  add 增加 minus 减少
    this.sp.opacity_status = 'minus'

    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

    // 透明度变化
    if ( this.sp.opacity_status === 'add' ) this.sp.opacity += 5
    if ( this.sp.opacity_status === 'minus' ) this.sp.opacity -= 5
    if ( this.sp.opacity <= 50 ) this.sp.opacity_status = 'add'
    if ( this.sp.opacity >= 255 ) this.sp.opacity_status = 'minus'

  }
}
