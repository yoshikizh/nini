class SceneManage {
  static init(){
    this.scene = null
  }

  static go(scene){

    if ( !Graphics.initialized ) {

      // 兼容微信小游戏则无需 canvas_id
      let canvas = typeof(wx) === 'object' ? wx.createCanvas() : document.getElementById(Graphics.canvas_id)

      if (!canvas) {
        throw new Error('init canvas failed')
        return
      }
      Graphics.init(canvas)

    } else {
      Graphics.clearSprites()
    }
    this.scene = new scene()
  }
}

