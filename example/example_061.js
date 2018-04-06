const IMAGE_PATH = './assets/images-demo/01'
const BITMAP_BG = new Bitmap(IMAGE_PATH + '/bg.jpg')
const BITMAP_PLAYER = new Bitmap(IMAGE_PATH + '/hero.png')
const BITMAP_ENEMY = new Bitmap(IMAGE_PATH + '/enemy.png')
const BITMAP_BULLET = new Bitmap(IMAGE_PATH + '/bullet.png')
const BITMAP_EXPLOSIONS = []
for (let i = 1; i <= 19; i++) {
  BITMAP_EXPLOSIONS.push(new Bitmap(IMAGE_PATH+'/explosion'+i.toString()+'.png'))
}
class Bullet extends Sprite{
  constructor(x, y){
    super()
    this.bitmap = BITMAP_BULLET
    this.scale = 0.2
    this.x = x
    this.y = y
    this.ox = 0.5
    this.oy = 0.5
  }
  update(){
    this.y -= 10
  }
}
class Background extends Sprite {
  constructor(){
    super()
    this.bitmap = new Bitmap({ width: 512, height: 512 * 3 })
    for (let i = 0; i < 3; i++){
      this.bitmap.bltImage(0, i * 512 ,BITMAP_BG , new Rect(0,0,512, 512))
    }
    this.y = -1024
  }
  update(){
    this.y += 1
    if ( this.y >= 0 ) this.y = -1024
  }
}
class Boom extends Sprite {
  constructor(x,y){
    super()
    this.bitmap = null
    this.ox = 0.5
    this.oy = 0.5
    this.x = x
    this.y = y
    this.scale = 2
    this.animation_count = 20
  }
  update(){
    this.animation_count--
    this.bitmap = BITMAP_EXPLOSIONS[20 - this.animation_count]
    if (this.animation_count === 0){
      this.dispose()
    }
  }
}
class Enemy extends Sprite {
  constructor(){
    super()
    this.y = 0
    this.ox = 0.5
    this.oy = 0.5
    this.bitmap = BITMAP_ENEMY
    this.scale = 0.4 + 0.1 * Math.rand(6)
    this.speed = 2 + Math.rand(5)
    this.x = this.randX()
    this.y = this.randY()
    this.animation_count = 0
  }
  update(){ this.updateMove() }
  randX(){
    let n = parseInt((512-60) / 60)
    return 60 + 60 * Math.rand(n)
  }
  randY(){ return -150 * Math.rand(5) }
  updateMove(){ this.y += this.speed }
}
class Player extends Sprite {
  constructor(){
    super()
    this.ox = 0.5
    this.oy = 0.5
    this.bitmap = BITMAP_PLAYER
    this.x = 512 / 2
    this.y = Graphics.height - 40
    this.scale = 0.5
    this.count = 0
    this.bullets = []
  }
  update(){
    this.count++
    this.updateMove()
    this.updateShot()
    this.updateBullets()
  }
  updateBullets(){
    this.bullets.forEach((bullet,i)=>{
      bullet.update()
      if ( bullet.y < -bullet.realHeight() ){
        this.bullets.splice(i,1)
        bullet.dispose()
      }
    })
  }
  updateShot(){
    if ( !this.disposed && this.count % 30 === 0 ) {
      this.bullets.push(new Bullet(this.x, this.y - this.realHeight() / 2))
    }
  }
  updateMove(){
    if (Toucher.x && Toucher.y){
      this.x = Toucher.x
      this.y = Toucher.y
      let top_side_y = this.realHeight() / 2
      let bottom_side_y = 450 - this.realHeight() / 2
      let left_side_x = this.realWidth() / 2
      let right_side_x = 512 - this.realWidth() / 2
      if (this.x > right_side_x ) this.x = right_side_x
      if (this.x < left_side_x) this.x = left_side_x
      if (this.y > bottom_side_y ) this.y = bottom_side_y
      if (this.y < top_side_y) this.y = top_side_y
    }
  }
  dispose(){
    super.dispose()
    this.bullets.forEach((bullet)=>{
      bullet.dispose()
    })
    this.bullets = []
  }
}
class SceneExample061 extends SceneBase {
  constructor(){
    super()
    this.count = 0
    this.bg = new Background()
    this.player = new Player()
    this.enemies = []
    this.animations = []
    this.gameover = false
    this.score = 0
    this.createGameinfo()
    this.loop()
  }
  createGameinfo(){
    this.gameinfo = new Sprite()
    this.gameinfo.bitmap = new Bitmap({width: Graphics.width, height: 44 })
  }
  update(){
    super.update()
    this.count++
    super.update()
    this.bg.update()
    this.player.update()
    this.updateEnemies()
    this.updateAnimations()
    this.updateGameinfo()
  }
  updateGameinfo(){
    this.gameinfo.bitmap.clear()
    this.gameinfo.bitmap.font.size = 32
    this.gameinfo.bitmap.drawText(new Rect(512 + 12,12,256, 32),`得分:${this.score}`)
  }
  updateAnimations(){
    this.animations.forEach((animation,i)=>{ 
      animation.update()
      if ( animation.animation_count === 0 ) {
        animation.dispose()
        this.animations.splice(i,1)
      }
    })
  }
  updateEnemies(){
    this.enemies.forEach((enemy,i)=>{
      enemy.update()
      if ( enemy.y > 512 + enemy.realHeight() ){
        this.enemies.splice(i,1)
        enemy.dispose()
      }
      let enemy_rect = enemy.realRect()
      let player_rect = this.player.realRect()
      this.player.bullets.forEach((bullet,j)=>{
        let bullet_rect = bullet.realRect()
        if ( enemy_rect.isIncludeRect(bullet_rect) ){
          this.animations.push(new Boom(enemy.x, enemy.y))
          this.enemies.splice(i,1)
          this.player.bullets.splice(j,1)
          enemy.dispose()
          bullet.dispose()
          this.score += 100
        }
      })
      if ( !this.player.disposed && player_rect.isIncludeRect(enemy_rect) ) {
        this.animations.push(new Boom(this.player.x, this.player.y))
        this.player.dispose()
        this.gameover = true
      }
    })
    if (this.count % 60 === 0) {
      this.enemies.push(new Enemy())
    }
  }
}