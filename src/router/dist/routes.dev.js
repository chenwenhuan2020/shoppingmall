"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: '/login',
  name: 'Login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Login.vue'));
    });
  }
}, {
  path: '/main',
  name: 'Main',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Main.vue'));
    });
  },
  children: [{
    path: 'home',
    name: 'Home',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Home.vue'));
      });
    }
  }, {
    path: 'menu',
    name: 'Menu',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Menu.vue'));
      });
    }
  }, {
    path: 'shopbag',
    name: 'Shopbag',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Shopbag.vue'));
      });
    }
  }, {
    path: 'my',
    name: 'My',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/My.vue'));
      });
    }
  }]
}, {
  path: '/detail/:pid',
  name: 'Detail',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Detail.vue'));
    });
  }
}, {
  path: '/pay',
  name: 'Pay',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Pay.vue'));
    });
  }
}, {
  path: '/newAddress',
  name: 'NewAddress',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/NewAddress.vue'));
    });
  }
}, {
  path: '/address',
  name: 'Address',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Address.vue'));
    });
  }
}, {
  path: '/order',
  name: 'Order',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Order.vue'));
    });
  }
}, {
  path: '/account',
  name: 'Account',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Account.vue'));
    });
  }
}, {
  path: '/like',
  name: 'Like',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Like.vue'));
    });
  }
}, {
  path: '/search',
  name: 'Search',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Search.vue'));
    });
  }
}, {
  path: '/secure',
  name: 'Secure',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Secure.vue'));
    });
  }
}, {
  path: '/forgot',
  name: 'Forgot',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Forgot.vue'));
    });
  }
}, {
  path: '*',
  redirect: {
    name: 'Home'
  }
}];
exports.routes = routes;