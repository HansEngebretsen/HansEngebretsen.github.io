
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
                console.log(container);
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
            console.log(srcarray);

        if (direction == 'prev') {
          next = active.prev('.screen-container');
          if (next.length == '0'){
            next = carouselItems.last();
            console.log('length is zero');
          }
        } else {
          next = active.next('.screen-container');
          if (next.length == '0'){
            next = carouselItems.first();
            console.log('next is zero');
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