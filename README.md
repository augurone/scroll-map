# Scroll Map
Map the scroll state of the window compared to the calculated position a target element using AMD and CanJS.

##Use

Import the module
```js
require.config({
  paths: {
    "can": "//canjs.com/release/master/amd/can",
    "scroll-map": "//rawgit.com/tappily/scroll-map/master/src/js/scroll-map"
  }
});
```
Create a control you want to bind the scroll map events to.
```js
define('scroll/somecontrol', ['can/control'], function($control) {
  return $control.extend({
    defaults: {
      scrollMap: null
    }
  },
  {
    '{scrollMap} optimal': function($element, $event, $optimal) {
      //do optimal stuff
    },
    '{scrollMap} viewable': function($element, $event, $viewable) {
      //do viewable stuff
    }
  });
});
```
Initialize your control with a new scrollmap instance.

```js
define('main', ['scroll/somecontrol', "scroll-map"], function($control, $createScrollMap) {
  var element = document.getElementById('#sometarget');
  return new $control(element, {
    scroll: $createScrollMap(element)
  })
});

```

##Example
You can see a working example on [CodePen](http://codepen.io/tappily/pen/pyrKwZ/).
