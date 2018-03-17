class SceneBase {

  loop(){

    this.update()

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  
  }

  update(){
    Graphics.update()
  }
}

