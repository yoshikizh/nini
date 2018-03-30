class Sprite {

  constructor(viewport = null){
    this._viewport = viewport
    this._bitmap = null
    this._opacity = 255
    this._scale = 1
    this._angle = 0

    this._x = 0
    this._y = 0
    this._z = 0

    this._ox = 0
    this._oy = 0

    this._mirror = false

    this._color = new Color(0,0,0,0)

    Graphics.addSprite(this)
  }

  get _viewport(){ return this.__viewport }
  set _viewport(value){ this.__viewport = value }
  get bitmap(){ return this._bitmap }
  set bitmap(value){ this._bitmap = value }
  get opacity(){ return this._opacity }
  set opacity(value){ this._opacity = value }
  get scale(){ return this._scale }
  set scale(value){ this._scale = value }
  get angle(){ return this._angle }
  set angle(value){ this._angle = value % 360 }
  get x(){ return this._x }
  set x(value){ this._x = value }
  get y(){ return this._y }
  set y(value){ this._y = value }
  get z(){ return this._z }
  set z(value){ this._z = value }
  get ox(){ return this._ox }
  set ox(value){ this._ox = value }
  get oy(){ return this._oy }
  set oy(value){ this._oy = value }
  get color(){ return this._color }
  set color(value){ this._color = value }

  dispose(){

  }
}

