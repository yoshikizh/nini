class SceneExample022 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap('./assets/images/nini_md.jpg')
    // this.sp.bitmap = new Bitmap({ width: Graphics.width, height: Graphics.height })

    // 设置在画面中心位置
    this.sp.ox = 0.5
    this.sp.oy = 0.5
    this.sp.x = Graphics.width / 2
    this.sp.y = Graphics.height / 2

    this.sp.bitmap.font.color = new Color(0,0,0)
    this.sp.bitmap.font.size = 32



    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

    // 在图片上绘制文字
    this.sp.bitmap.drawText(new Rect(0,this.sp.bitmap.height / 2 - 16,this.sp.bitmap.width,32), "我是nini",1)

  }
}
