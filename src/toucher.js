class Toucher{

  initalize(){
    this.x = 0
    this.y = 0
    return new Toucher()
  }


  constructor(){

    this.touched = false
    this.touch_struct = { touch_start_pos: null, touch_move_pos: null  }

    this.initEvents()
  }



  touchstartHandler(e){

    e.preventDefault()  
    let x,y
    if ( e.touches ){
      x = e.touches[0].clientX
      y = e.touches[0].clientY
    } else {
      x = e.layerX || e.offsetX
      y = e.layerY || e.offsetY
    }

    if (x && y){
      this.touch_struct.touch_start_pos = [x,y]
      Toucher.x = x
      Toucher.y = y
      this.touched = true
      Graphics.touchstartCallback()
    }

  }


  touchmoveHandler(e){

    e.preventDefault()  
    let x
    let y
    if ( e.touches ){
      x = e.touches[0].clientX
      y = e.touches[0].clientY
    } else {
      x = e.layerX || e.offsetX
      y = e.layerY || e.offsetY
    }

    if (x && y) {
      Toucher.x = x
      Toucher.y = y
      this.touch_struct.touch_move_pos = [x,y]
      Graphics.touchmoveCallback()
    }

  }

  touchendhandler(e){

    e.preventDefault()

    this.touched = null
    this._clearStruct()
    Graphics.touchendCallback()
  }


  initEvents(){

    canvas.addEventListener('mouseup', this.touchendhandler.bind(this))
    canvas.addEventListener('mousemove', this.touchmoveHandler.bind(this))
    canvas.addEventListener('mousedown', this.touchstartHandler.bind(this))

    canvas.addEventListener('touchstart', this.touchstartHandler.bind(this))
    canvas.addEventListener('touchmove', this.touchmoveHandler.bind(this))
    canvas.addEventListener('touchend', this.touchendhandler.bind(this))

  }

  _clearStruct(){
    this.touch_struct.touch_start_pos = null
    this.touch_struct.touch_move_pos = null
  }


  update(){



  }

}