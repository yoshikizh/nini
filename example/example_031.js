class SceneExample031 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap({width: Graphics.width, height: Graphics.height})

    for ( let i = 0; i < Graphics.width / 50; i++ ) {
      this.sp.bitmap.drawCircle(25 + 50 * i,25,25, new Color(255 - i * 15,0,0))
      this.sp.bitmap.drawCircle(25 + 50 * i,75,25, new Color(0,255 - i * 15,0))
      this.sp.bitmap.drawCircle(25 + 50 * i,125,25, new Color(0,0,255 - i * 15))

      this.sp.bitmap.fillRect(new Rect(50 * i,175,50,50), new Color(255 - i * 15,0,0))
      this.sp.bitmap.fillRect(new Rect(50 * i,225,50,50), new Color(0,255 - i * 15,0))
      this.sp.bitmap.fillRect(new Rect(50 * i,275,50,50), new Color(0,0,255 - i * 15))

    }

    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

  }
}
