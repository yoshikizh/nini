class SceneManage {
  static init(){
    this.scene = null
  }

  static go(scene){

    if ( !Graphics.initialized ) {
      let canvas = document.getElementById(Graphics.canvas_id)
      if (!canvas) {
        throw new Error('init canvas failed')
        return
      }
      Graphics.init(canvas)
      // Graphics.initialized = true

    } else {
      Graphics.clearSprites()
    }
    this.scene = new scene()
  }
}

