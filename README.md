<p align="center">
  <h3 align="center">nini</h3>
  <a href="https://getbootstrap.com/">
    <img src="http://assets.twk2nd.com/temp/nini_md.jpg" alt="" width=72 height=72>
  </a>
  <p align="center">
    一个飞速构建HTML5的游戏框架, 飞的更高, 飞的更远!
    <br>
    <br>
    <a href="https://github.com/yoshikizh/nini">简体中文</a>
    ·
    <a href="https://github.com/yoshikizh/nini/blob/master/README-en.md">English</a>
  </p>
</p>

<br>

## 内容导览

- [快速开始](#快速开始)
- [特性](#特性)
- [精灵和位图](#精灵和位图)
- [场景](#场景)
- [动画](#动画)
- [声音](#声音)
- [交互](#交互)
- [Copyright and license](#copyright-and-license)

## 快速开始


加载ninijs

```html
  <script src="nini.js" type="text/javascript"></script>
```

页面中包含一个 `canvas` 标签并设置 id 为 canvas

```html
  <canvas id="canvas" width="800" height="450"></canvas>
```

基本使用方法

- 创建一个场景类(可自定义)
- 必须继承框架的基础场景 `SceneBase`
- 框架内部会执行场景内精灵的循环渲染

```js
class MainScene extends SceneBase {
  constructor(){

    // 调用超类构造函数(必须)
    super()

    // 创建精灵 并设置位图
    this.sp = new Sprite()
    this.sp.bitmap = new Bitmap("./assets/images/nini_md.jpg")

    // 设置坐标
    this.sp.x = 0
    this.sp.y = 0

    // 刷新循环(必须)
    this.loop()

  }
}

// 初始化场景并跳转
SceneManage.go(MainScene)

```

## 特性

nini将画布(canvas)的绘图包装成精灵(Sprite)和位图(Bitmap),前者是游戏场景中能看到的部分，后者是图片的元数据
渲染方式为canvas或Html5，游戏默认帧率为60
修改帧率也是可以的，但不能超过60(目前还未实现)
`Graphics.frame_rate = 30`
在场景中除了显示精灵意外，还可以通过刷新循环(update方法)来实现动画效果，


## 精灵和位图

Sprite 和 Bitmap 是 nini 重要的组成部分, 他们负责加载图片并将图片显示出来
他们两者不是强耦合, Bitmap 可以作为已加载的资源单独存在, 供Sprite使用
Sprite 主要设置图片在场景中的属性 ( 如坐标位置，角度，缩放比例，透明度等 )

## 场景
未完待续

## 动画
未完待续

## 声音

## 交互

## Copyright and license
遵循开源MIT协议



