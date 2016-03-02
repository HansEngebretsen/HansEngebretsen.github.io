
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