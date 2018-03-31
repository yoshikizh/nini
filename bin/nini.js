'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Math.rand = function (max) {
  return Math.floor(max * Math.random());
};

Array.prototype.clear = function () {
  this.splice(0, this.length);
};

var Toucher = function () {
  _createClass(Toucher, [{
    key: 'initalize',
    value: function initalize() {
      this.x = 0;
      this.y = 0;
      return new Toucher();
    }
  }]);

  function Toucher() {
    _classCallCheck(this, Toucher);

    this.touched = false;
    this.touch_struct = { touch_start_pos: null, touch_move_pos: null };

    this.initEvents();
  }

  _createClass(Toucher, [{
    key: 'touchstartHandler',
    value: function touchstartHandler(e) {

      e.preventDefault();
      var x = void 0,
          y = void 0;
      if (e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.layerX || e.offsetX;
        y = e.layerY || e.offsetY;
      }

      if (x && y) {
        this.touch_struct.touch_start_pos = [x, y];
        Toucher.x = x;
        Toucher.y = y;
        this.touched = true;
        Graphics.touchstartCallback();
      }
    }
  }, {
    key: 'touchmoveHandler',
    value: function touchmoveHandler(e) {

      e.preventDefault();
      var x = void 0;
      var y = void 0;
      if (e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.layerX || e.offsetX;
        y = e.layerY || e.offsetY;
      }

      if (x && y) {
        Toucher.x = x;
        Toucher.y = y;
        this.touch_struct.touch_move_pos = [x, y];
        Graphics.touchmoveCallback();
      }
    }
  }, {
    key: 'touchendhandler',
    value: function touchendhandler(e) {

      e.preventDefault();

      this.touched = null;
      this._clearStruct();
      Graphics.touchendCallback();
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {

      canvas.addEventListener('mouseup', this.touchendhandler.bind(this));
      canvas.addEventListener('mousemove', this.touchmoveHandler.bind(this));
      canvas.addEventListener('mousedown', this.touchstartHandler.bind(this));

      canvas.addEventListener('touchstart', this.touchstartHandler.bind(this));
      canvas.addEventListener('touchmove', this.touchmoveHandler.bind(this));
      canvas.addEventListener('touchend', this.touchendhandler.bind(this));
    }
  }, {
    key: '_clearStruct',
    value: function _clearStruct() {
      this.touch_struct.touch_start_pos = null;
      this.touch_struct.touch_move_pos = null;
    }
  }, {
    key: 'update',
    value: function update() {}
  }]);

  return Toucher;
}();

var Rect = function () {
  function Rect(x, y, width, height) {
    _classCallCheck(this, Rect);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  _createClass(Rect, [{
    key: 'toArray',
    value: function toArray() {
      return [this.x, this.y, this.width, this.height];
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      return this.x >= 0 && this.y >= 0 && this.width > 0 && this.height > 0;
    }
  }, {
    key: 'isInclude',
    value: function isInclude(x, y) {
      return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }
  }]);

  return Rect;
}();

var Color = function () {
  function Color(r, g, b) {
    var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 255;

    _classCallCheck(this, Color);

    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }

  _createClass(Color, [{
    key: 'toRgbHex',
    value: function toRgbHex() {
      var _red = this.red.toString(16);
      var _green = this.green.toString(16);
      var _blue = this.blue.toString(16);

      if (_red < 16) _red = '0' + _red;
      if (_green < 16) _green = '0' + _green;
      if (_blue < 16) _blue = '0' + _blue;

      return '#' + _red + _green + _blue;
    }
  }]);

  return Color;
}();

var Font = function Font() {
  _classCallCheck(this, Font);

  this.name = 'Arial';
  this.color = new Color(255, 255, 255);
  this.size = 16;
};

var Viewport = function Viewport(obj) {
  _classCallCheck(this, Viewport);

  if (obj.constructor.name !== 'Rect') {
    throw new Error('Viewport参数必须是Rect对象');
    return;
  }
  this.rect = obj;
};

var Bitmap = function () {
  function Bitmap(obj, callback) {
    var _this = this;

    _classCallCheck(this, Bitmap);

    // 兼容微信小游戏
    this._canvas = (typeof wx === 'undefined' ? 'undefined' : _typeof(wx)) === 'object' ? wx.createCanvas() : document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    this.font = new Font();

    if (typeof obj === 'string') {
      this.img = new Image();
      this.img.src = obj;

      this.img.onload = function () {
        _this.width = _this.img.width;
        _this.height = _this.img.height;

        _this._canvas.width = _this.width;
        _this._canvas.height = _this.height;

        _this._ctx.drawImage(_this.img, 0, 0, _this.width, _this.height, 0, 0, _this.width, _this.height);

        if (callback) {
          callback();
        }
      };
    }

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
      this.width = obj.width;
      this.height = obj.height;
      this._canvas.width = Math.max(this.width || 0, 1);
      this._canvas.height = Math.max(this.height || 0, 1);
    }
  }

  // private


  _createClass(Bitmap, [{
    key: '_measureTextWidth',
    value: function _measureTextWidth(str) {
      var ctx = this._ctx;
      ctx.save();
      ctx.font = this._makeFontCssFormat();
      var width = ctx.measureText(str).width;
      ctx.restore();
      return width;
    }

    // private

  }, {
    key: '_makeFontCssFormat',
    value: function _makeFontCssFormat() {
      var font_name = this.font.name;
      var font_size = this.font.size;
      return font_size + 'px ' + font_name;
    }
  }, {
    key: 'drawText',
    value: function drawText(rect, str) {
      var _ctx;

      var align = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


      // 计算字高
      var font_height = rect.height - (rect.height - this.font.size * 0.7) / 2;
      var str_width = this._measureTextWidth(str);

      this._ctx.save();
      (_ctx = this._ctx).rect.apply(_ctx, _toConsumableArray(rect.toArray()));
      this._ctx.clip();
      this._ctx.fillStyle = this.font.color.toRgbHex();
      this._ctx.font = this._makeFontCssFormat();
      this._ctx.textAlign = ['left', 'center', 'right'][align];
      this._ctx.textBaseline = 'alphabetic';

      var x = rect.x;
      var y = rect.y + font_height;
      if (this._ctx.textAlign === 'left') {
        var _x4 = rect.x;
      }
      if (this._ctx.textAlign === 'center') {
        x = rect.x + (rect.width + str_width) / 2 - str_width / 2;
      }
      if (this._ctx.textAlign === 'right') {
        x = rect.x + (rect.width + str_width - str_width);
      }
      this._ctx.fillText(str, x, y, rect.width);
      this._ctx.restore();
    }
  }, {
    key: 'bltImage',
    value: function bltImage(dx, dy, src_bitmap, src_rect) {
      if (src_rect.isValid()) {
        var _ctx2;

        this._ctx.globalCompositeOperation = 'source-over';
        (_ctx2 = this._ctx).drawImage.apply(_ctx2, [src_bitmap.img].concat(_toConsumableArray(src_rect.toArray()), [dx, dy, src_rect.width, src_rect.height]));
      }
    }
  }, {
    key: 'stretchBltImage',
    value: function stretchBltImage(src_bitmap, src_rect, dest_rect) {
      if (src_rect.isValid()) {
        var _ctx3;

        this._ctx.globalCompositeOperation = 'source-over';
        (_ctx3 = this._ctx).drawImage.apply(_ctx3, [src_bitmap.img].concat(_toConsumableArray(src_rect.toArray()), _toConsumableArray(dest_rect.toArray())));
      }
    }
  }, {
    key: 'changeHue',
    value: function changeHue(offset) {

      if (offset && this.width > 0 && this.height > 0) {

        var image_data = this._ctx.getImageData(0, 0, this.width, this.height);
        var pix_data = image_data.data;

        var _rgbToHsl = function _rgbToHsl(r, g, b) {
          var cmin = Math.min(r, g, b);
          var cmax = Math.max(r, g, b);
          var h = 0;
          var s = 0;
          var l = (cmin + cmax) / 2;
          var delta = cmax - cmin;

          if (delta > 0) {
            if (r === cmax) {
              h = 60 * (((g - b) / delta + 6) % 6);
            } else if (g === cmax) {
              h = 60 * ((b - r) / delta + 2);
            } else {
              h = 60 * ((r - g) / delta + 4);
            }
            s = delta / (255 - Math.abs(2 * l - 255));
          }
          return [h, s, l];
        };

        var _hslToRgb = function _hslToRgb(h, s, l) {
          var c = (255 - Math.abs(2 * l - 255)) * s;
          var x = c * (1 - Math.abs(h / 60 % 2 - 1));
          var m = l - c / 2;
          var cm = c + m;
          var xm = x + m;

          if (h < 60) {
            return [cm, xm, m];
          } else if (h < 120) {
            return [xm, cm, m];
          } else if (h < 180) {
            return [m, cm, xm];
          } else if (h < 240) {
            return [m, xm, cm];
          } else if (h < 300) {
            return [xm, m, cm];
          } else {
            return [cm, m, xm];
          }
        };

        var _offset = (offset % 360 + 360) % 360;

        for (var i = 0; i < pix_data.length; i += 4) {
          var hsl = _rgbToHsl(pix_data[i + 0], pix_data[i + 1], pix_data[i + 2]);
          var h = (hsl[0] + _offset) % 360;
          var s = hsl[1];
          var l = hsl[2];
          var rgb = _hslToRgb(h, s, l);
          pix_data[i + 0] = rgb[0];
          pix_data[i + 1] = rgb[1];
          pix_data[i + 2] = rgb[2];
        }
        this._ctx.putImageData(image_data, 0, 0);
      }
    }
  }, {
    key: 'drawCircle',
    value: function drawCircle(x, y, radius, color) {
      var ctx = this._ctx;
      ctx.save();
      ctx.fillStyle = color.toRgbHex();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    }
  }, {
    key: 'fillRect',
    value: function fillRect(rect, color) {
      var ctx = this._ctx;
      ctx.save();
      ctx.fillStyle = color.toRgbHex();
      ctx.fillRect.apply(ctx, _toConsumableArray(rect.toArray()));
      ctx.restore();
    }
  }, {
    key: 'fillAll',
    value: function fillAll(color) {
      this.fillRect(new Rect(0, 0, this.width, this.height), color.toRgbHex());
    }
  }, {
    key: 'clearRect',
    value: function clearRect(rect) {
      var _ctx4;

      (_ctx4 = this._ctx).clearRect.apply(_ctx4, _toConsumableArray(rect.toArray()));
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.clearRect(new Rect(0, 0, this.width, this.height));
    }
  }]);

  return Bitmap;
}();

var Sprite = function () {
  function Sprite() {
    var viewport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Sprite);

    this._viewport = viewport;
    this._bitmap = null;
    this._opacity = 255;
    this._scale = 1;
    this._angle = 0;

    this._x = 0;
    this._y = 0;
    this._z = 0;

    this._ox = 0;
    this._oy = 0;

    this._mirror = false;

    this._color = new Color(0, 0, 0, 0);

    this.on_touchstart_callback = null;
    this.on_touchmove_callback = null;
    this.on_touchend_callback = null;

    this.touched = false;

    Graphics.addSprite(this);
  }

  _createClass(Sprite, [{
    key: 'realRect',
    value: function realRect() {

      var w = this.bitmap.width;
      var h = this.bitmap.height;

      var x = this.x - this.ox * w;
      var y = this.y - this.oy * h;

      return new Rect(x, y, w, h);
    }
  }, {
    key: 'onTouchstart',
    value: function onTouchstart(callback) {
      this.on_touchstart_callback = callback;
    }
  }, {
    key: 'onTouchmove',
    value: function onTouchmove(callback) {
      this.on_touchmove_callback = callback;
    }
  }, {
    key: 'onTouchend',
    value: function onTouchend(callback) {
      this.on_touchend_callback = callback;
    }
  }, {
    key: 'dispose',
    value: function dispose() {}
  }, {
    key: '_viewport',
    get: function get() {
      return this.__viewport;
    },
    set: function set(value) {
      this.__viewport = value;
    }
  }, {
    key: 'bitmap',
    get: function get() {
      return this._bitmap;
    },
    set: function set(value) {
      this._bitmap = value;
    }
  }, {
    key: 'opacity',
    get: function get() {
      return this._opacity;
    },
    set: function set(value) {
      this._opacity = value;
    }
  }, {
    key: 'scale',
    get: function get() {
      return this._scale;
    },
    set: function set(value) {
      this._scale = value;
    }
  }, {
    key: 'angle',
    get: function get() {
      return this._angle;
    },
    set: function set(value) {
      this._angle = value % 360;
    }
  }, {
    key: 'x',
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
    }
  }, {
    key: 'y',
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
    }
  }, {
    key: 'z',
    get: function get() {
      return this._z;
    },
    set: function set(value) {
      this._z = value;
    }
  }, {
    key: 'ox',
    get: function get() {
      return this._ox;
    },
    set: function set(value) {
      this._ox = value;
    }
  }, {
    key: 'oy',
    get: function get() {
      return this._oy;
    },
    set: function set(value) {
      this._oy = value;
    }
  }, {
    key: 'color',
    get: function get() {
      return this._color;
    },
    set: function set(value) {
      this._color = value;
    }
  }]);

  return Sprite;
}();

var Graphics = function () {
  function Graphics() {
    _classCallCheck(this, Graphics);
  }

  _createClass(Graphics, null, [{
    key: 'init',
    value: function init(canvas) {
      this.initialized = true;
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
      this.frame_count = 0;
      this.sprites = [];
      this.toucher = new Toucher();
      this.touched_sprite = null;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.frame_count++;
      this.clearCtx();

      this.sortedSpritesByZOrder(this.sprites).forEach(function (sprite) {
        _this2.refreshSpriteCanvas(sprite);
      });
    }
  }, {
    key: 'refreshSpriteCanvas',
    value: function refreshSpriteCanvas(sprite) {
      var bitmap = sprite.bitmap;

      if (bitmap) {

        this.ctx.globalAlpha = 1 / 255 * sprite.opacity;

        var _x = sprite.x - sprite.ox * (bitmap.width * sprite.scale);
        var _y = sprite.y - sprite.oy * (bitmap.height * sprite.scale);

        var _ctx_ox = _x + sprite.ox * bitmap.width * sprite.scale;
        var _ctx_oy = _y + sprite.oy * bitmap.height * sprite.scale;

        var _color = sprite.color;

        this.ctx.save();
        this.ctx.translate(_ctx_ox, _ctx_oy);
        this.ctx.rotate(sprite.angle * Math.PI / 180);
        this.ctx.translate(-_ctx_ox, -_ctx_oy);

        this.ctx.drawImage(bitmap._canvas, 0, 0, bitmap.width, bitmap.height, _x, _y, bitmap.width * sprite.scale, bitmap.height * sprite.scale);

        if (_color.alpha > 0) {
          this.ctx.globalCompositeOperation = 'source-over';
          this.ctx.fillStyle = _color.toRgbHex();
          this.ctx.globalAlpha = _color.alpha / 255;
          this.ctx.fillRect(_x, _y, bitmap.width * sprite.scale, bitmap.height * sprite.scale);
        }

        this.ctx.rotate(0);
        this.ctx.globalAlpha = 1;
        this.ctx.restore();
      }
    }
  }, {
    key: 'isTouch',
    value: function isTouch(sprite) {
      return sprite.realRect().isInclude(Toucher.x, Toucher.y);
    }
  }, {
    key: 'sortedSpritesByZOrder',
    value: function sortedSpritesByZOrder(sprites) {
      return sprites.sort(function (a, b) {
        return a.z - b.z;
      });
    }
  }, {
    key: 'touchstartCallback',
    value: function touchstartCallback() {
      var _this3 = this;

      var sprites = this.sprites.filter(function (sprite) {
        return sprite.on_touchstart_callback !== null && _this3.isTouch(sprite);
      });
      var touched_sprite = sprites[sprites.length - 1];
      if (touched_sprite) {
        touched_sprite.on_touchstart_callback();
        this.touched_sprite = touched_sprite;
      }
    }
  }, {
    key: 'touchmoveCallback',
    value: function touchmoveCallback() {}
  }, {
    key: 'touchendCallback',
    value: function touchendCallback() {
      if (this.touched_sprite) {
        this.touched_sprite.on_touchend_callback();
        this.touched_sprite = null;
      }
    }
  }, {
    key: 'addSprite',
    value: function addSprite(sprite) {
      this.sprites.push(sprite);
    }
  }, {
    key: 'clearCtx',
    value: function clearCtx() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, {
    key: 'clearSprites',
    value: function clearSprites() {
      this.sprites.clear();
    }
  }, {
    key: 'dispose_sprite',
    value: function dispose_sprite() {}
  }]);

  return Graphics;
}();

var SceneBase = function () {
  function SceneBase() {
    _classCallCheck(this, SceneBase);
  }

  _createClass(SceneBase, [{
    key: 'loop',
    value: function loop() {

      this.update();

      window.requestAnimationFrame(this.loop.bind(this), canvas);
    }
  }, {
    key: 'update',
    value: function update() {
      Graphics.update();
    }
  }]);

  return SceneBase;
}();

var SceneManage = function () {
  function SceneManage() {
    _classCallCheck(this, SceneManage);
  }

  _createClass(SceneManage, null, [{
    key: 'init',
    value: function init() {
      this.scene = null;
    }
  }, {
    key: 'go',
    value: function go(scene) {

      if (!Graphics.initialized) {

        // 兼容微信小游戏则无需 canvas_id
        var _canvas = (typeof wx === 'undefined' ? 'undefined' : _typeof(wx)) === 'object' ? wx.createCanvas() : document.getElementById(Graphics.canvas_id);

        if (!_canvas) {
          throw new Error('init canvas failed');
          return;
        }
        Graphics.init(_canvas);
      } else {
        Graphics.clearSprites();
      }
      this.scene = new scene();
    }
  }]);

  return SceneManage;
}();
