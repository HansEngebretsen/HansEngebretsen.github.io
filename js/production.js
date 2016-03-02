(function($){
  Hans.site = Hans.site || {};
  _this = Hans.site;

  _this.__bind = function(fn, me){
    return function(){
      return fn.apply(me, arguments);
    };
  };
})(jQuery, window.Hans = window.Hans || {});
(function($){
  Hans.site = Hans.site || {};
  _this = Hans.site;

  _this.__bind = function(fn, me){
    return function(){
      return fn.apply(me, arguments);
    };
  };
})(jQuery, window.Hans = window.Hans || {});
// Waypoints.prototype.scrolls = function(wrapper){
//     var _this = this;
//     setVars = function(wrapper){
//       scrollPos   = $(window).scrollTop(),
//       objectPos   = wrapper.offset().top;
//     }
//     console.log("inside scroll");
//     plaxScroll = function(object, rate, direction){
//       setVars(wrapper);
//       var disToScroll = _this.elements.wHeight,
//           disScrolled = (scrollPos - objectPos),  // Distance already scrolled
//           transY = ((rate / disToScroll) * disScrolled ),
//           transYround = +transY.toFixed(2),
//           transCss = 'translate3d( 0, ' + transYround +'px, ' + '0)';

//       if (direction == "up"){
//         transYround = -transYround;
//       }
//       transCss = 'translate3d( 0, ' + transYround +'px, ' + '0)';

//       function prefixTransform(translate) {// prefixer function
//          var o = $('.img-mood');
//          o.css('transform', translate);
//          o.css('-moz-transform', translate);
//          o.css('-webkit-transform', translate);
//          o.css('-o-transform', translate);
//          o.css('-ms-transform', translate);
//       }
//       prefixTransform(transCss);
//     }

//     window.requestAnimationFrame(function(){
//       var $items = _this.elements.moodboards;
//       plaxScroll($items[1], 50, "up");
//       plaxScroll($items[2], 40, "down");
//       plaxScroll($items[3], 20, "up");
//     });
// }

// Waypoints.prototype.plax = function(e){
//   var _this = this;
//   var section = this.elements.moodboard;
//   console.log(section);
//   var mood = this.elements.moodboards;
//   var startLax = function(){ scrollIntervalID = setInterval(_this.scrolls(mood), 10);}
//   var inview = new Waypoint.Inview({
//     element: section,
//     enter: function(direction) {
//       startLax();
//       console.log('entered');
//     },
//     exited: function(direction) {
//       clearInterval(startLax);
//     }
//   })
// }

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
/*
=======
  Waypoints integration

  Instatiating the waypoints library for scrolling functions
  Check out http://imakewebthings.com/waypoints/guides/getting-started/ for documentation on waypoints.

=======
*/

(function($) {
  var Waypoints = function(){
    this.elements = {
        viewable        : $('.inview'),
        laxContainer    : $('.lax-container'),
        laxImg          : '.lax-img',
        scrollUp        : $('#scrollUp'),
        autovids        : $('.autoplayvideo'),
        wHeight         : $(window).height()
    }
  }


Waypoints.prototype.viewable = function(e){
  var elements = this.elements.viewable;
  elements.addClass('opaque');
  var fadein = function(name){
    $name = $(name);
    $name.removeClass('opaque');
    $name.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
      $name.removeClass('opaque');
    });
  }
  // Different offset depending on direction
  elements.waypoint(function(direction) {
    if (direction === 'down') {
      fadein(this.element);
    }
  }, {
    offset: '70%'
  });
}
Waypoints.prototype.autovid = function(e){
  var videos = this.elements.autovids;
  videos.waypoint(function(direction){
    if (direction === 'down'){
      this.element.autoplay = true;
      this.element.play();
    }
    }, {
      offset: '70%'
   });
}
Waypoints.prototype.showScroll = function(e){
  var sup = this.elements.scrollUp;
  var waypointrs = new Waypoint({
    element: $('body'),
    handler: function(direction){
      if (direction == 'down' ){
        sup.removeClass('opaque');
      }if (direction == 'up' ){
        sup.addClass('opaque');
      }
    },
    offset: -120
  })

}
Waypoints.prototype.scrollUp = function(e){
  e.preventDefault();
  console.log('bout to scroll' + e);
  $("html, body").animate({ scrollTop: 0 }, 500);
}
Waypoints.prototype.scroller = function(wrapper, objects){
    var _this = this;
    setVars = function(wrapper){
      scrollPos   = $(window).scrollTop(),
      objectPos   = wrapper.offset().top;
    }
    plaxScroll = function(objects, rate, direction){
      setVars(wrapper);
      var disToScroll = _this.elements.wHeight,
          disScrolled = (scrollPos - objectPos),  // Distance already scrolled
          transY = ((rate / disToScroll) * disScrolled ),
          transYround = +transY.toFixed(2),
          transCss = 'translate3d( 0, ' + transYround +'px, ' + '0)';


      function prefixTransform(o, translate) {// prefixer function
         o.css('transform', translate);
         o.css('-moz-transform', translate);
         o.css('-webkit-transform', translate);
         o.css('-o-transform', translate);
         o.css('-ms-transform', translate);
      }
      prefixTransform(objects, transCss);
    }
    window.requestAnimationFrame(function(){
      objects.each(function(){ // Loop through laxin objects
        var t = $(this);
        var rate = t.data("scroll");
          plaxScroll(t, rate, "up");
      })
    });
}
Waypoints.prototype.plaxInit = function(e){
  var _this = this;

  this.elements.laxContainer.each(function(){
    var wrapper = $(this),
      objects = wrapper.find(_this.elements.laxImg);
    function laxfunction(){
          _this.scroller(wrapper, objects);
      interval = window.setInterval(function(){
          _this.scroller(wrapper, objects);
        }, 10);
    }
    var inview = new Waypoint.Inview({
      element: wrapper,
      enter: function(direction) {
        new laxfunction();
      },
      exited: function(direction) {
        window.clearInterval(interval);
      }
    })
  });
}

Waypoints.prototype.init = function(e){
  var mqTablet = window.matchMedia( "( min-width: 620px )"); // Media query for intro slide and navscroll
  var mqTabletmax = window.matchMedia( "( max-width: 620px )"); // Media query for intro slide and navscroll
  if (mqTablet.matches){
    this.viewable();
    this.plaxInit();
  }
  if (this.elements.autovids){
    this.autovid();
  }
  if (mqTabletmax.matches){
    this.showScroll();
    _this = this;
    this.elements.scrollUp.click(function(e){
      _this.scrollUp(e);
    });
  }
}

 // Instantiation
  new Waypoints().init(); // attach waypoints to global
})(jQuery || {});
// Waypoints.prototype.scrolls = function(wrapper){
//     var _this = this;
//     setVars = function(wrapper){
//       scrollPos   = $(window).scrollTop(),
//       objectPos   = wrapper.offset().top;
//     }
//     console.log("inside scroll");
//     plaxScroll = function(object, rate, direction){
//       setVars(wrapper);
//       var disToScroll = _this.elements.wHeight,
//           disScrolled = (scrollPos - objectPos),  // Distance already scrolled
//           transY = ((rate / disToScroll) * disScrolled ),
//           transYround = +transY.toFixed(2),
//           transCss = 'translate3d( 0, ' + transYround +'px, ' + '0)';

//       if (direction == "up"){
//         transYround = -transYround;
//       }
//       transCss = 'translate3d( 0, ' + transYround +'px, ' + '0)';

//       function prefixTransform(translate) {// prefixer function
//          var o = $('.img-mood');
//          o.css('transform', translate);
//          o.css('-moz-transform', translate);
//          o.css('-webkit-transform', translate);
//          o.css('-o-transform', translate);
//          o.css('-ms-transform', translate);
//       }
//       prefixTransform(transCss);
//     }

//     window.requestAnimationFrame(function(){
//       var $items = _this.elements.moodboards;
//       plaxScroll($items[1], 50, "up");
//       plaxScroll($items[2], 40, "down");
//       plaxScroll($items[3], 20, "up");
//     });
// }

// Waypoints.prototype.plax = function(e){
//   var _this = this;
//   var section = this.elements.moodboard;
//   console.log(section);
//   var mood = this.elements.moodboards;
//   var startLax = function(){ scrollIntervalID = setInterval(_this.scrolls(mood), 10);}
//   var inview = new Waypoint.Inview({
//     element: section,
//     enter: function(direction) {
//       startLax();
//       console.log('entered');
//     },
//     exited: function(direction) {
//       clearInterval(startLax);
//     }
//   })
// }

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
/*
=======
  Waypoints integration

  Instatiating the waypoints library for scrolling functions
  Check out http://imakewebthings.com/waypoints/guides/getting-started/ for documentation on waypoints.

=======
*/

(function($) {
  var Waypoints = function(){
    this.elements = {
        viewable        : $('.inview'),
        laxContainer    : $('.lax-container'),
        laxImg          : '.lax-img',
        scrollUp        : $('#scrollUp'),
        autovids        : $('.autoplayvideo'),
        wHeight         : $(window).height()
    }
  }


Waypoints.prototype.viewable = function(e){
  var elements = this.elements.viewable;
  elements.addClass('opaque');
  var fadein = function(name){
    $name = $(name);
    $name.removeClass('opaque');
    $name.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
      $name.removeClass('opaque');
    });
  }
  // Different offset depending on direction
  elements.waypoint(function(direction) {
    if (direction === 'down') {
      fadein(this.element);
    }
  }, {
    offset: '70%'
  });
}
Waypoints.prototype.autovid = function(e){
  var videos = this.elements.autovids;
  videos.waypoint(function(direction){
    if (direction === 'down'){
      this.element.autoplay = true;
      this.element.play();
    }
    }, {
      offset: '70%'
   });
}
Waypoints.prototype.showScroll = function(e){
  var sup = this.elements.scrollUp;
  var waypointrs = new Waypoint({
    element: $('body'),
    handler: function(direction){
      if (direction == 'down' ){
        sup.removeClass('opaque');
      }if (direction == 'up' ){
        sup.addClass('opaque');
      }
    },
    offset: -120
  })

}
Waypoints.prototype.scrollUp = function(e){
  e.preventDefault();
  console.log('bout to scroll' + e);
  $("html, body").animate({ scrollTop: 0 }, 500);
}
Waypoints.prototype.scroller = function(wrapper, objects){
    var _this = this;
    setVars = function(wrapper){
      scrollPos   = $(window).scrollTop(),
      objectPos   = wrapper.offset().top;
    }
    plaxScroll = function(objects, rate, direction){
      setVars(wrapper);
      var disToScroll = _this.elements.wHeight,
          disScrolled = (scrollPos - objectPos),  // Distance already scrolled
          transY = ((rate / disToScroll) * disScrolled ),
          transYround = +transY.toFixed(2),
          transCss = 'translate3d( 0, ' + transYround +'px, ' + '0)';


      function prefixTransform(o, translate) {// prefixer function
         o.css('transform', translate);
         o.css('-moz-transform', translate);
         o.css('-webkit-transform', translate);
         o.css('-o-transform', translate);
         o.css('-ms-transform', translate);
      }
      prefixTransform(objects, transCss);
    }
    window.requestAnimationFrame(function(){
      objects.each(function(){ // Loop through laxin objects
        var t = $(this);
        var rate = t.data("scroll");
          plaxScroll(t, rate, "up");
      })
    });
}
Waypoints.prototype.plaxInit = function(e){
  var _this = this;

  this.elements.laxContainer.each(function(){
    var wrapper = $(this),
      objects = wrapper.find(_this.elements.laxImg);
    function laxfunction(){
          _this.scroller(wrapper, objects);
      interval = window.setInterval(function(){
          _this.scroller(wrapper, objects);
        }, 10);
    }
    var inview = new Waypoint.Inview({
      element: wrapper,
      enter: function(direction) {
        new laxfunction();
      },
      exited: function(direction) {
        window.clearInterval(interval);
      }
    })
  });
}

Waypoints.prototype.init = function(e){
  var mqTablet = window.matchMedia( "( min-width: 620px )"); // Media query for intro slide and navscroll
  var mqTabletmax = window.matchMedia( "( max-width: 620px )"); // Media query for intro slide and navscroll
  if (mqTablet.matches){
    this.viewable();
    this.plaxInit();
  }
  if (this.elements.autovids){
    this.autovid();
  }
  if (mqTabletmax.matches){
    this.showScroll();
    _this = this;
    this.elements.scrollUp.click(function(e){
      _this.scrollUp(e);
    });
  }
}

 // Instantiation
  new Waypoints().init(); // attach waypoints to global
})(jQuery || {});