import( /* webpackChunkName: 'pageA'*/ './pageA').then((pageA) => {
  console.log(pageA)
})

import( /* webpackChunkName: 'pageB'*/ './pageB').then((pageB) => {
  console.log(pageB)
})

let clicked = false
window.addEventListener('click', () => {
  if (!clicked) {
    import('./css/base.css')
    clicked = true
  }
})

export default "page"