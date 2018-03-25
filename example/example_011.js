class SceneExample011 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap('./assets/images/nini_md.jpg')

    // 目标精灵用于裁剪(为了方便创建跟显示画布同样的大小)
    this.sp2 = new Sprite()
    this.sp2.bitmap = new Bitmap({width: Graphics.width, height: Graphics.height})

    // 设置坐标为画面中心
    this.sp.x = Graphics.width / 2 - 32
    this.sp.y = 32

    // 设置坐标原点(中心)
    this.sp.ox = 1
    this.sp.oy = 0

    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

    let bitmap_width = this.sp.bitmap.width
    let bitmap_height = this.sp.bitmap.height

    let offset_x = this.sp.x + 64
    let offset_y = this.sp.y

    let rw = parseInt(bitmap_width / 3)
    let rh = parseInt(bitmap_height / 3)

    for ( let i = 0; i < 9; i++ ) {

      let c1 = parseInt(i / 3)
      let c2 = parseInt(i % 3)

      this.sp2.bitmap.bltImage(offset_x + (rw + 10)*c2, offset_y + (rh + 10)*c1, this.sp.bitmap , new Rect(rw*c2,rh*c1,rw,rh))
    }

  }
}
