class Bitmap {

  constructor(obj){

    if ( typeof(obj) === 'string' ) {
      this.img = new Image()
      this.img.src = obj

      this.img.onload = ()=>{
        this.width  = this.img.width
        this.height = this.img.height

      }
    }

    if ( typeof(obj) === 'object' ) {
      this.width  = obj.width
      this.height = obj.height
    }

  }
}

