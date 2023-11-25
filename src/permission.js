import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  console.log('to:', to) // 输出目标路由对象
  console.log('from:', from) // 输出来源路由对象
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else {
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
