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