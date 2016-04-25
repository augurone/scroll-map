define(['can/map', 'can/map/define', 'scroll-map/calculatedOffsets'], function($map, $define, $offsets) {

  'use strict';
  
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
              viewBottom = viewTop + viewHeight - viewHeight/3 * 2,
              outsideViewBottom = target.offsetTop > viewBottom,
              outsideViewTop = target.offsetBottom < viewTop;
          
          return !outsideViewBottom && !outsideViewTop;
        },
        value: false,
        type: 'boolean'
      },
      viewable: {
        get: function() {
          var target = this.attr('target'),
              viewTop = this.attr('y'),
              viewBottom = viewTop + this.attr('vh'),
              outsideViewBottom = target.offsetTop > viewBottom,
              outsideViewTop = target.offsetBottom < viewTop;

          return !outsideViewBottom && !outsideViewTop;
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
          var impl = {
            offsetTop: 0,
            offsetHeight: 0,
            offsetBottom: 0
          };
          
          if($target) {
            impl.offsetTop = parseFloat($offsets($target).offsetTop);
            impl.offsetHeight = parseFloat($target.offsetHeight);
            impl.offsetBottom = impl.offsetTop + impl.offsetHeight;
          }
          
          return impl;
        },
        value: null
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
  };
});
