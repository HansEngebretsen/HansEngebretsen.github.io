
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
    this.showHideBtns = _this.__bind(this.showHideBtns, this);
    this.elements = {
      outer      : $('#mockups-outer'),
      next       : $('#mockupsNext'),
      prev       : $('#mockupsPrev'),
      cont       : $('#mockupsContainer'),
      wrap       : $('#mockupsWrap'),
      mockup     : $('.mockup-wrap'),
      nBtn       : $('.btn-next'),
      pBtn       : $('.btn-prev')
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

  Mockups.prototype.showHideBtns = function(e){
    var el = this.elements;
    console.log('transform is ' + this.transform + ' calculated is: ' + -(this.wid * el.mockup.length - 1));
    if (this.transform >= 0){ // back at the start
      el.pBtn.addClass('hidden'); // hide previous
    } else if (this.transform <= -(this.wid * (el.mockup.length - 1))) {
      el.nBtn.addClass('hidden');
    } else {
      el.pBtn.removeClass('hidden');
      el.nBtn.removeClass('hidden');
    }
  }

  Mockups.prototype.init = function(e){
    // Mockups
    var t = this;
    var el = t.elements;
    var mq = window.matchMedia('(min-width: 700px)');

    if((el.outer.length > 0) && mq.matches){ mockupToggle(); }
    function mockupToggle(){
      var obj = el.wrap.find('.mockup-wrap:first');
      t.wid = obj[0].getBoundingClientRect().width;
      el.nBtn = el.wrap.find('.btn-next'),
      el.pBtn = el.wrap.find('.btn-prev');
      el.pBtn.addClass('hidden');
      el.next.click(function(e){
        t.toggleClass(e, true);
        t.showHideBtns();
      });
      el.prev.click(function(e){
        t.toggleClass(e, false);
        t.showHideBtns();
      });
    }
  };

  _this.mockups = new Mockups(); // attach utils to global
  _this.mockups.init();

})(jQuery, window.Hans = window.Hans || {});