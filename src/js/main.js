define(['can/map', 'can/map/define'], function ($map) {
  
  function calcViewable($targetTop, $targetHeight, $viewTop, $viewHeight) {
    var targetBottom = $targetTop + $targetHeight,
        viewBottom = $viewTop + $viewHeight;
    return !($targetTop > viewBottom) && !(targetBottom < $viewTop);
  }
  
  function initRun(check) {
    if (check) {
      return check;
    } else {
      return false;
    }
  }
  
  var Watcher = $map.extend({
    define: {
      status: {
        set: function ($target) {
          this.attr('y', $target.pageYOffset);
          this.attr('vh', $target.innerHeight);
        }
      },
      optimal: {
        get: function () {
          var target = initRun(this.attr('target')),
              targetTop = target.offsetTop,
              targetBottom = targetTop + target.offsetHeight,
              viewHeight = this.attr('vh'),
              viewTop = this.attr('y') + viewHeight / 3,
              viewBottom = viewTop + viewHeight - viewHeight / 3 * 2;
          
          return !(targetTop > viewBottom) && !(targetBottom < viewTop);
        },
        type: 'boolean',
        value: false
      },
      viewable: {
        get: function () {
          var target = initRun(this.attr('target')),
              targetTop = target.offsetTop,
              targetBottom = targetTop + target.offsetHeight,
              viewTop = this.attr('y'),
              viewBottom = viewTop + this.attr('vh');
          
          return !(targetTop > viewBottom) && !(targetBottom < viewTop);
        },
        type: 'boolean',
        value: false
      },
      y: {
        type: 'number',
        value: 0
      },
      vh: {
        type: 'number',
        value: 0
      },
      target: {
        value: null
      }
    }
  });
  
  return function ($element) {
    var watcher = new Watcher(),
        handler = function ($event) {
          watcher.attr('status', this);
        };
    watcher.attr('target', $element);
    window.addEventListener('scroll', handler);
    window.addEventListener('unload', function () {
      window.removeEventListener('scroll', handler);
    });
    
    return watcher;
  };
});
