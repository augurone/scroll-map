define(['can/map', 'can/map/define'], function($map) {
  
  function calcViewable($target_top, $target_height, $view_top, $view_height) {
    var target_bottom = $target_top + $target_height,
        view_bottom = $view_top + $view_height;
    return !($target_top > view_bottom) && !(target_bottom < $view_top);
  }
  
  var defaultWatcherTargetImpl = {
    offsetTop: 0,
    offsetHeight: 0,
    offsetBottom: 0
  };
  
  var Watcher = $map.extend({
    define: {
      status: {
          set: function($target) {
            this.attr('y', $target.pageYOffset);
            this.attr('vh', $target.innerHeight);
          }
      },
      optimal: {
        get: function() {
          var target = this.attr('target'),
              viewHeight = this.attr('vh'),
              viewTop = this.attr('y') + viewHeight/3,
              viewBottom = viewTop + viewHeight - viewHeight/3 * 2;
          
          return !(target.offsetTop > viewBottom) && !(target.offsetBottom < viewTop);
        },
        value: false,
        type: 'boolean'
      },
      viewable: {
        get: function() {
          var target = this.attr('target'),
              viewTop = this.attr('y'),
              viewBottom = viewTop + this.attr('vh');
          
          return !(target.offsetTop > viewBottom) && !(target.offsetBottom < viewTop);
        },
        value: false,
        type: 'boolean'
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
        set: function($target) {
          var impl = defaultWatcherTargetImpl;
          
          if($target) {
            impl.offsetTop = parseFloat($target.offsetTop);
            impl.offsetHeight = parseFloat($target.offsetHeight);
            impl.offsetBottom = impl.offsetTop + impl.offsetHeight;
          }
          
          return impl;
        },
        value: defaultWatcherTargetImpl
      }
    }
  });
  
  return function($element) {
    var watcher = new Watcher(),
        handler = function($event) {
          watcher.attr('status', this);
        };
    
    watcher.attr('target', $element);
    window.addEventListener('scroll', handler);
    window.addEventListener('unload', function() {
      window.removeEventListener('scroll', handler);
    });
    
    return watcher;
  }
});
