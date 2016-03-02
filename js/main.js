(function($){
  Hans.site = Hans.site || {};
  _this = Hans.site;

  _this.__bind = function(fn, me){
    return function(){
      return fn.apply(me, arguments);
    };
  };
})(jQuery, window.Hans = window.Hans || {});