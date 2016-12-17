
/*
=======
  Archive functions

  For animations on page load
=======
*/

(function($, Hans) {
  Hans.site = Hans.site || {};
  _this = Hans.site;

  var Mockups = function(e){
    this.init = _this.__bind(this.init, this);
    this.toggleClass = _this.__bind(this.toggleClass, this);
    this.elements = {
      outer      : $('#mockups-outer'),
      next       : $('#mockupsNext'),
      prev       : $('#mockupsPrev'),
      cont       : $('#mockupsContainer'),
      wrap       : $('#mockupsWrap'),
      mockup     : $('.mockup-wrap')
    };
    this.wid = 0;
    this.transform = 0;
  };

  Mockups.prototype.toggleClass = function(e, direction){
    var t = this;
    var el = t.elements;
    e.preventDefault();
    var active = el.mockup.filter('.active'),
        next = active.next(),
        prev = active.prev(),
        obj = direction ? next : prev,
        color = obj.data('color');

    t.transform = direction ? (t.transform - t.wid) : (t.transform + t.wid);
    active.removeClass('active');
    obj.addClass('active');
    el.cont.css('transform', 'translateX(' + t.transform + 'px)');
    el.outer[0].className = 'section mockups-outer ' + color;
  }

  Mockups.prototype.init = function(e){
    // Mockups
    var t = this;
    var el = t.elements;
    if(el.outer.length > 0){ mockupToggle(); }
    function mockupToggle(){
    console.log('init');
      t.wid = el.wrap.find('.mockup-wrap').outerWidth();
      el.next.click(function(e){
        t.toggleClass(e, true);
      });
      el.prev.click(function(e){
        t.toggleClass(e, false);
      });
    }
  };

  _this.mockups = new Mockups(); // attach utils to global
  _this.mockups.init();

})(jQuery, window.Hans = window.Hans || {});