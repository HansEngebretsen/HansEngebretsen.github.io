(function($){
  Hans.site = Hans.site || {};
  _this = Hans.site;

  _this.__bind = function(fn, me){
    return function(){
      return fn.apply(me, arguments);
    };
  };
})(jQuery, window.Hans = window.Hans || {});

/*
=======
  Archive functions

  For animations on page load
=======
*/

(function($, Hans) {
  Hans.site = Hans.site || {};
  _this = Hans.site;

  var Archive = function(e){
    this.init = _this.__bind(this.init, this);
  };

  Archive.prototype.init = function(e){
    // Archive
    if($('.work').length > 0){projectToggle();};
    function projectToggle(){
      $('.preview-image, .project-container .more').on('click', function(){
            $('html,body').animate({scrollTop: $('.project-container').offset().top - '10'}, 400);
            $(this).parents('li').addClass('active');
            $(this).parents('ul').addClass('project-active');
      });
      $('.project-container .back').click(function(e) {
        e.preventDefault();
        $(this).parents('li').removeClass('active');
        $(this).parents('ul').removeClass('project-active');
      });
    }

  };

  _this.archive = new Archive(); // attach utils to global
  _this.archive.init();

})(jQuery, window.Hans = window.Hans || {});

/*
=======
  Carousel functions

  For animations on page load
=======
*/

(function($, Hans) {
  Hans.site = Hans.site || {};
  _this = Hans.site;
  var Carousel = function(e){
    this.init = _this.__bind(this.init, this);
    this.second = _this.__bind(this.second, this);
  };
  Carousel.prototype.second = function(e){
    if($('.carousel-full').length > 0){carousel(); };
    function carousel(){
      $('.carousel-full .slide-toggle').on('click', function(e){
            e.preventDefault();
            var t = $(this),
                container = t.parents('.carousel-full'),
                nav = container.find('.slide-nav'),
                slides = container.find('.nav'),
                slideWrap = container.find('.slide'),
                slide = t.attr('href');
            slideWrap.removeClass('active');
            nav.children().removeClass('active');
            t.addClass('active');
            $(slide).addClass('active');
      });
      $('.project-container .back').click(function(e) {
        e.preventDefault();
        $(e.currentTarget).parents('li').removeClass('active');
        $(e.currentTarget).parents('ul').removeClass('project-active');
      });
    }
  }
  Carousel.prototype.init = function(e){
    this.second(e);
    if ($('.cinema-carousel')){
      var swapSource = function(e, direction) {
        e.preventDefault;
        var carousel = $(e.currentTarget).parents('.cinema-carousel'),
            carouselItems = carousel.find('.screen-container'),
            active   = carousel.find('.active'),
            activeimg   = active.find('img'),
            activesrc = activeimg.attr('src'),
            next      = active.next('.screen-container');

            srcarray = [];
            itemsImages = carouselItems.each().find('img');
            srcarray = itemsImages;

        if (direction == 'prev') {
          next = active.prev('.screen-container');
          if (next.length == '0'){
            next = carouselItems.last();
          }
        } else {
          next = active.next('.screen-container');
          if (next.length == '0'){
            next = carouselItems.first();
          }
        }

        newsrc = next.find('img').attr('src');
        activeimg.attr('src', newsrc);
      }
      $('.cinema-carousel .prev').click(function(e){
        direction = "prev";
        e.preventDefault();
          swapSource(e, direction)
        });
       $('.cinema-carousel .next').click(function(e){
        e.preventDefault();
        direction = "next";
          swapSource(e, direction)
        });
    }
  }
  _this.carousel = new Carousel(); // attach utils to global
  _this.carousel.init();

})(jQuery, window.Hans = window.Hans || {});

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

/*
=======
  Loaded functions

  For animations on page load
=======
*/

(function($, Hans) {
  Hans.site = Hans.site || {};
  _this = Hans.site;
  var Loaded = function(e){
    this.toggler = _this.__bind(this.toggler, this);
    this.nav = _this.__bind(this.nav, this);
    this.init = _this.__bind(this.init, this);

    this.classes = {
      profile    : '.work #profile-image',
      nav        : '#navigation-menu',
      bod        : 'body',
      articlenav : '#article-navigation'
    };
    this.elements = {};
  };

  Loaded.prototype.init = function(e){
    var c  = this.classes,
        t  = this.elements,
        w  = window.innerWidth,
        bp = 750;

        t.profile = $(c.profile);
        t.nav = $(c.nav);
        t.body = $(c.body);
        t.articlenav = $(c.articlenav);

    $( document ).ready(function() {
      t.profile.addClass('bounceInLeft');
      t.nav.addClass('unfolded');
      t.body.addClass('loaded');
    });
    if (t.articlenav.length && w > bp){
      var mn = $('#article-navigation');
          mns = 'fixed';
          hdr = $('.cover-image').height();

      $(window).scroll(function() { // refactor me to be performant
        if( $(this).scrollTop() > hdr ) {
          mn.addClass(mns);
        } else {
          mn.removeClass(mns);
        }
      });
    }

  }

  _this.loaded = new Loaded(); // attach utils to global
  _this.loaded.init();

})(jQuery, window.Hans = window.Hans || {});

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
    if(el.outer.length > 0){ mockupToggle(); }
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

/*
=======
  Archive functions

  For animations on page load
=======
*/

(function($, Hans) {
  Hans.site = Hans.site || {};
  _this = Hans.site;

  var Nav = function(e){
    this.init = _this.__bind(this.init, this);
  };

  Nav.prototype.init = function(e){
     // Navigation
     $('#social-toggle').click(function(e) {
           e.preventDefault();
           $('.global-navigation').toggleClass('social-clicked');
       });

     // Nav toggle on mobile
     $('#nav-toggle').click(function(e) {
       e.preventDefault();
       $('body').addClass('menu-clicked');
     });
     $('.close-toggle').click(function(e) {
           e.preventDefault();
           $('body').removeClass('menu-clicked');
           $('body').removeClass('hans-clicked');
         });
     $('#navigation-menu .first a.current').click(function(e) {
       e.preventDefault();
       $('body').toggleClass('about');
     });
  };

  _this.nav = new Nav(); // attach utils to global
  _this.nav.init();

})(jQuery, window.Hans = window.Hans || {});

/*
=======
  Archive functions

  For animations on page load
=======
*/

(function($, Hans) {
  Hans.site = Hans.site || {};
  _this = Hans.site;

  var SpinRound = function(e){
    this.init = _this.__bind(this.init, this);
  };

  SpinRound.prototype.init = function(e){
    // Typing Text Function
    var TxtRotate = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 300 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    };

    // Only start when clicked, and don't run multiple instances
      if ($('.about')) {
        var elements = document.getElementsByClassName('txt-rotate');

        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
      }
      $(this).data('clicked', true);
  };

  _this.spinRound = new SpinRound(); // attach utils to global
  _this.spinRound.init();

})(jQuery, window.Hans = window.Hans || {});