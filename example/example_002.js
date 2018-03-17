class SceneExample002 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap('./assets/images/nini_sm.jpg')

    // 设置坐标为画面左上角
    this.sp.x = 0
    this.sp.y = 0

    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

    // 移动图片
    this.sp.y += 3
    this.sp.x += 3 * ( canvas.width / canvas.height )

    // 判断超过画面重置坐标
    if ( this.sp.x >= canvas.width && this.sp.y >= canvas.height ) {
        this.sp.x = 0
        this.sp.y = 0
    }

  }
}
