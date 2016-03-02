
/*
=======
  Class Toggler

  Generic class toggler function:
  Add Class of "toggle" to element, as well as a 'data-toggle' attribvute
  Function will toggle a class of active on the id or class associated with the attribute.
  this is so gross, needs cleaning up

  Navigation toggle function (for mobile)

  Tabs arguments for class toggler
=======
*/

(function($, Hans) {
  Hans.site = Hans.site || {};
  _this = Hans.site;
  var Utils = function(e){
    this.toggler = _this.__bind(this.toggler, this);
    this.nav = _this.__bind(this.nav, this);
    this.init = _this.__bind(this.init, this);

    this.classes = {
      toggle    : '.toggle',
      tabs      : '.tabs',
      nav       : '#navigation',
      navToggle : '#navToggle',
      overlay   : '.overlayMask',
      active    : 'active'
    };
    this.elements = {};
  };

  Utils.prototype.toggler = function(e){
    var c  = this.classes,
        t  = this.elements;

    var clicked        = $(e.currentTarget),
        toggleTarget   = clicked.data('toggle'),
        toggleMe       = true,
        className      = c.active;
        t.toggleTarget = $(toggleTarget);

    if (clicked.parents(c.tabs).length && clicked.hasClass(c.active)){ // stop executing if you're clicking yourself and you aren't a toggle
      return;
    } else if (clicked.parents(c.tabs).length){
      t.container = clicked.parents(c.tabs);
      t.container.find('.active').removeClass('active');
    }

    if (clicked.data('classname')){ // if using a custom class
      className = clicked.data('classname');
      t.toggleTarget.removeAttr('id');
      t.toggleTarget.attr('id', className);
    }
    clicked.toggleClass(c.active);
    t.toggleTarget.toggleClass(className);
  }

  Utils.prototype.nav = function(e){
    var c  = this.classes,
        t  = this.elements;
    if(t.overlay.hasClass(c.active) || t.nav.hasClass(c.active)){
      t.overlay.removeClass(c.active);
      t.nav.removeClass(c.active);
      t.navtoggle.removeClass(c.active);
    }else {
      t.nav.addClass(c.active);
      t.navToggle.addClass(c.active);
      t.overlay.addClass(c.active);
    }
  }

  Utils.prototype.init = function(e){
    var c  = this.classes,
        t  = this.elements;

        t.toggle = $(c.toggle),
        t.nav = $(c.nav),
        t.navToggle = $(c.navToggle),
        t.overlay = $(c.overlay),
        t.swapImg = $(c.swapImg);

    var  __this = this;

    if (t.toggle){
      t.toggle.click(function(e){
        e.preventDefault();
        var clicked = $(e.currentTarget);
        if (clicked.data('overlay') || clicked.hasClass(c.overlay)){
          console.log('nav');
          __this.nav(e);
        }else {
          __this.toggler(e);
        }
      });
    }
    if (t.swapImg){
      t.swapImg.click(function(e){
        __this.shadowImg(e);
      })
    }

  }

  _this.utils = new Utils(); // attach utils to global
  _this.utils.init();

})(jQuery, window.Hans = window.Hans || {});