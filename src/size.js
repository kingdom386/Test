/**
 * Created by xiezhonghai on 2016/10/20 0020.
 */
(function (doc, win) {
  const docEl = doc.documentElement
  const size = 750
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) return
      if(clientWidth >= size){
          docEl.style.fontSize = '100px';
      } else {
          docEl.style.fontSize = 100 * (clientWidth / size) + 'px'
      }
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)