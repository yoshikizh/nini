class SceneExample008 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap({ width: Graphics.width, height: Graphics.height })

    this.sp.bitmap.font.size = 64
    this.sp.bitmap.font.color = new Color(255,0,0)
    this.sp.bitmap.drawText(new Rect(0,0,Graphics.width,64), "nini居左")
    this.sp.bitmap.drawText(new Rect(0,0,Graphics.width,64), "nini居中", 1)
    this.sp.bitmap.drawText(new Rect(0,0,Graphics.width,64), "nini居右", 2)

    this.sp.bitmap.font.size = 48
    this.sp.bitmap.font.color = new Color(0,255,0)
    this.sp.bitmap.drawText(new Rect(0,Graphics.height / 2 - 16,Graphics.width,48), "nini居左")
    this.sp.bitmap.drawText(new Rect(0,Graphics.height / 2 - 16,Graphics.width,48), "nini居中", 1)
    this.sp.bitmap.drawText(new Rect(0,Graphics.height / 2 - 16,Graphics.width,48), "nini居右", 2)

    this.sp.bitmap.font.size = 32
    this.sp.bitmap.font.color = new Color(0,0,255)
    this.sp.bitmap.drawText(new Rect(0,Graphics.height - 32,Graphics.width,32), "nini居左")
    this.sp.bitmap.drawText(new Rect(0,Graphics.height - 32,Graphics.width,32), "nini居中", 1)
    this.sp.bitmap.drawText(new Rect(0,Graphics.height - 32,Graphics.width,32), "nini居右", 2)

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

  }
}
