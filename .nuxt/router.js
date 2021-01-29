import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3458f000 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _7172bf35 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _85c5205a = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _76b0d0da = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _618b6b79 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _4bf6a37a = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _a91c4a40 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _3458f000,
    children: [{
      path: "",
      component: _7172bf35,
      name: "home"
    }, {
      path: "/login",
      component: _85c5205a,
      name: "login"
    }, {
      path: "/register",
      component: _85c5205a,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _76b0d0da,
      name: "profile"
    }, {
      path: "/settings",
      component: _618b6b79,
      name: "settings"
    }, {
      path: "/editor",
      component: _4bf6a37a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _a91c4a40,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
