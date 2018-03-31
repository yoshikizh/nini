class SceneExample041 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap('./assets/images/nini_sm.jpg')

    // 设置坐标为画面中心
    this.sp.x = canvas.width / 2
    this.sp.y = canvas.height / 2

    // this.sp.onClick(()=>{})

    // 设置坐标原点(中心)
    this.sp.ox = 0.5
    this.sp.oy = 0.5

    this.sp.onTouchstart(()=>{
      console.log("start")
    })

    this.sp.onTouchmove(()=>{

    })

    this.sp.onTouchend(()=>{
      console.log("over")
    })


    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

  }

}
