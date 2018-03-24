class Color {

  constructor(r,g,b,a=255){
    this.red = r
    this.green = g
    this.blue = b
    this.alpha = a
  }

  toRgbHex(){
    let _red   = this.red.toString(16)
    let _green = this.green.toString(16)
    let _blue  = this.blue.toString(16)

    if (_red < 16) _red = '0' + _red
    if (_green < 16) _green = '0' + _green
    if (_blue < 16) _blue = '0' + _blue

    return '#' + _red + _green + _blue
  }
}
