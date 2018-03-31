class SpriteBullet extends Sprite {

  constructor(){

    // 调用超类构造函数(必须)
    super()

  }

  update(){

  }

}

class SprteEnemy extends Sprite {

  constructor(){

    // 调用超类构造函数(必须)
    super()

  }

  update(){
    
  }

} 

class SpritePlayer extends Sprite {


  constructor(){

    // 调用超类构造函数(必须)
    super()

  }

  update(){
    
  }

}

class SceneExample045 extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap('./assets/images/nini_sm.jpg')

    // 设置坐标为画面中心
    this.sp.x = canvas.width / 2
    this.sp.y = canvas.height / 2

    // this.sp.onTouchStar(()=>{})
    // this.sp.onTouchMove(()=>{})
    // this.sp.onTouchEnd(()=>{})
    // this.sp.onClick(()=>{})

    // 设置坐标原点(中心)
    this.sp.ox = 0.5
    this.sp.oy = 0.5

    // 刷新循环(必须)
    this.loop()
  }

  // 定义update方法 实现动画的基础
  update(){

    // 调用父类的update(必须)
    super.update()

    // 精灵更新
    // this.sp2.update()


    // 触摸跟随
    if (Toucher.x && Toucher.y){
      this.sp.x = Toucher.x
      this.sp.y = Toucher.y
    }

    // // 检测碰撞
    // if ( this.sp.checkRectCollision(,this.sp2) ) {

    //   // 子弹消失
    //   this.sp.dispose()

    //   // 敌机爆炸
    //   this.sp2.boom()

    // }

  }
}
