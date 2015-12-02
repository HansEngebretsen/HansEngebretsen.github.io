$( document ).ready(function() {
  // Loaded transitions
  var w = window.innerWidth,
      bp = 750;
  $('.work #profile-image').addClass('bounceInLeft');
  $('#navigation-menu').addClass('unfolded');
  $('body').addClass('loaded');

  // Navigation
  if ($('#article-navigation').length && w > bp){
    var mn = $('#article-navigation');
        mns = 'fixed';
        hdr = $('.cover-image').height();

    $(window).scroll(function() {
      if( $(this).scrollTop() > hdr ) {
        mn.addClass(mns);
      } else {
        mn.removeClass(mns);
      }
    });
  }
});

if ($('.scroll-toggle')){
  $('.scroll-toggle').click(function(e){
    e.preventDefault();
    $(this).toggleClass('clicked');
    $(this).parents('.cinema-carousel').toggleClass('clicked');
  });
}

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
// Project Containers
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

//Carousel
if($('.carousel-full').length > 0){carousel(); };
function carousel(){
  $('.carousel-full .slide-toggle').on('click', function(e){
        e.preventDefault();
        var t = $(this),
            container = t.parentsUntil('.carousel-full'),
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
    $(this).parents('li').removeClass('active');
    $(this).parents('ul').removeClass('project-active');
  });
}

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


// Sticky article nav

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
$('#hans-toggle').click(function() {
  if ( !$('#hans-toggle').data('clicked') ) {
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
});