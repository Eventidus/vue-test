import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else {
      if (!store.getters.userID) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
    next()
  }
})
router.afterEach(() => {
  nprogress.done()
})
