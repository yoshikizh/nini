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

  _createClass(Bitmap, [{
    key: 'drawText',
    value: function drawText(rect, str) {
      var _ctx;

      var align = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


      // Todo 自定义字体&字号 ...
      var font_name = this.font.name;
      var font_size = this.font.size;

      // Tip canvas 获取不到字高，默认字高为字号大小的 90%
      var font_height = this.font.size * 0.9;

      this._ctx.save();

      (_ctx = this._ctx).rect.apply(_ctx, _toConsumableArray(rect.toArray()));
      this._ctx.clip();

      this._ctx.fillStyle = this.font.color.toRgbHex();
      this._ctx.font = font_size + 'px ' + font_name;

      this._ctx.textAlign = ['left', 'center', 'right'][align];

      var str_width = this._ctx.measureText(str).width;

      var x = rect.x;
      if (this._ctx.textAlign === 'left') {
        var _x4 = rect.x;
      }
      if (this._ctx.textAlign === 'center') {
        x = rect.x + (rect.width + str_width) / 2 - str_width / 2;
      }
      if (this._ctx.textAlign === 'right') {
        x = rect.x + (rect.width + str_width - str_width);
      }

      this._ctx.fillText(str, x, rect.y + font_height, rect.width);

      this._ctx.restore();
    }
  }, {
    key: 'bltImage',
    value: function bltImage(dx, dy, src_bitmap, src_rect) {
      if (src_rect.isValid()) {
        var _ctx2;

        console.log("有效");
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
  }], [{
    key: 'fillRect',
    value: function fillRect(rect, color) {}
  }, {
    key: 'clear',
    value: function clear() {}
  }, {
    key: 'clearRect',
    value: function clearRect(rect) {}
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

    Graphics.addSprite(this);
  }

  _createClass(Sprite, [{
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
      this.sprites = [];
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.clearCtx();

      var bitmap = null;

      this.sprites.forEach(function (sprite) {

        bitmap = sprite.bitmap;

        if (bitmap) {

          _this2.ctx.globalAlpha = 1 / 255 * sprite.opacity;

          var _x = sprite.x - sprite.ox * (bitmap.width * sprite.scale);
          var _y = sprite.y - sprite.oy * (bitmap.height * sprite.scale);

          var _ctx_ox = _x + sprite.ox * bitmap.width * sprite.scale;
          var _ctx_oy = _y + sprite.oy * bitmap.height * sprite.scale;

          _this2.ctx.save();
          _this2.ctx.translate(_ctx_ox, _ctx_oy);
          _this2.ctx.rotate(sprite.angle * Math.PI / 180);
          _this2.ctx.translate(-_ctx_ox, -_ctx_oy);

          _this2.ctx.drawImage(bitmap._canvas, 0, 0, bitmap.width, bitmap.height, _x, _y, bitmap.width * sprite.scale, bitmap.height * sprite.scale);

          _this2.ctx.rotate(0);
          _this2.ctx.globalAlpha = 1;
          _this2.ctx.restore();
        }
      });
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
