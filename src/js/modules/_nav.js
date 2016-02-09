
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
           $('.internal-nav-wrap').toggleClass('social-clicked');
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
       console.log('worked');
     });
  };

  _this.nav = new Nav(); // attach utils to global
  _this.nav.init();

})(jQuery, window.Hans = window.Hans || {});