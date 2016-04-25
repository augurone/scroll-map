define([], function() {
  'use strict';

  return function($element) {
    var calcLeft = 0,
      calcTop = 0;

    if ($element.offsetParent) {
      do {
        calcLeft += $element.offsetLeft;
        calcTop += $element.offsetTop;
      } while (($element = $element.offsetParent));
    }

    return {
      offsetTop: calcTop,
      offsetLeft: calcLeft
    };
  };
});
