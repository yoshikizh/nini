class SceneManage {
  static init(){
    this.scene = null
  }

  static go(scene){
    this.scene = new scene()
  }
}

