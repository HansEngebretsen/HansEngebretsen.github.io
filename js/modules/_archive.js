
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