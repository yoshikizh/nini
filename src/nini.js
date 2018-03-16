'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('canvas');

Math.rand = function (max) {
  return Math.floor(max * Math.random());
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
  }]);

  return Rect;
}();

var Graphics = function () {
  function Graphics() {
    _classCallCheck(this, Graphics);
  }

  _createClass(Graphics, null, [{
    key: 'init',
    value: function init(canvas) {
      this.ctx = canvas.getContext('2d');
      this.sprites = [];
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      this.clearCtx();

      var bitmap = null;

      this.sprites.forEach(function (sprite) {

        bitmap = sprite.bitmap;

        if (bitmap) {

          _this.ctx.globalAlpha = 1 / 255 * sprite.opacity;

          var _x = sprite.x - sprite.ox * bitmap.width;
          var _y = sprite.y - sprite.oy * bitmap.height;

          var _ctx_ox = _x + sprite.ox * bitmap.width;
          var _ctx_oy = _y + sprite.oy * bitmap.height;

          // this.ctx.translate(_ctx_ox,_ctx_oy)
          // this.ctx.rotate(sprite.angle*Math.PI/180);
          // this.ctx.translate(-_ctx_ox,-_ctx_oy)
          _this.ctx.drawImage(bitmap.img, 0, 0, bitmap.width, bitmap.height, _x, _y, bitmap.width, bitmap.height);

          // this.ctx.rotate(0)
          // this.ctx.globalAlpha = 1

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
      this.sprites = [];
    }
  }]);

  return Graphics;
}();

Graphics.init(canvas);

var Bitmap = function Bitmap(obj) {
  var _this2 = this;

  _classCallCheck(this, Bitmap);

  if (typeof obj === 'string') {
    this.img = new Image();
    this.img.src = obj;

    this.img.onload = function () {
      _this2.width = _this2.img.width;
      _this2.height = _this2.img.height;
    };
  }

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    this.width = obj.width;
    this.height = obj.height;
  }
};

var Viewport = function Viewport(obj) {
  _classCallCheck(this, Viewport);

  if (obj.constructor.name !== 'Rect') {
    throw new Error('Viewport参数必须是Rect对象');
    return;
  }
  this.rect = obj;
};

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
      this.scene = new scene();
    }
  }]);

  return SceneManage;
}();

SceneManage.init();

var SceneBase = function () {
  function SceneBase() {
    _classCallCheck(this, SceneBase);
  }

  _createClass(SceneBase, [{
    key: 'loop',


    // constructor(){}

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