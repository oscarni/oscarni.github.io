$(document).ready(function() {
	var base_url = window.location.pathname;

	var History = window.History;
	
	
	// Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        History.log(State.data, State.title, State.url);
        
        //stuff for nav
		$('li').removeClass('current');
		$("li").find('[data-section="' + State.title +'"]').addClass('current');
    });
	
	
	var did_scroll = false;
	$(window).scroll(function(){
	  did_scroll = true;
	});
	
	// Every 250ms, check if the page scrolled
	setInterval(function(){
	  if (did_scroll) {
	      updatePath();
	      //loadMorePhotos(); // Infinite scroll, etc.
	      did_scroll = false;
	  }
	}, 250);
	
	// Update the URL
	function updatePath() {
	  var new_url;
	  var in_viewport = $('div.sectionwrap:in-viewport').first();
	  if (History.enabled) {
	      if (in_viewport.hasClass('top')) {
	          new_url = base_url; // The original URL of the stream page
	      } else {
	          new_url = base_url + '#' + in_viewport.data('section');
	      }
	  History.replaceState('', in_viewport.data('section'), new_url);
	  }
	}
	
	
	function goToByScroll(section){

      // Scroll
    $('html,body').animate({
        scrollTop: $("#" + section).offset().top - 10},
        'fast');
	}
	
	$("#nav ul li ul li").click(function(e) { 
	      // Prevent a page reload when a link is pressed
	    e.preventDefault(); 
	      // Call the scroll function
	    goToByScroll($(this).data('section'));           
	});
		
});