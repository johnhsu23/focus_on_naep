$(function(){

	var _timelineContents;
	var _top;
	$.getJSON( "timeline_content.json", function( data ) {
		_timelineContents = data;
		addTimelineItems();
		createEvents();
	}).fail(function() {
		console.log("JSON not loaded")
		// alert("timeline content failed to load")
	});

	function createEvents() {
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			// console.log(scrollTop);
			  // if ( scrollTop > $(headerElem).offset().top ) { 
			    // display add
			  // }
			// $(".modal-content").css("top", 500)
		})
		$("div.timeline-content .event a").on("click", function(){
			// var id = $(this).attr("id")
			// $("#pull-up-modal p.like-h4 span:nth-of-type(1)").html(_timelineContents[id].date);
			// $("#pull-up-modal p.like-h4 span:nth-of-type(2)").html(_timelineContents[id].title);
			// $("#pull-up-modal p:nth-of-type(2)").html(_timelineContents[id].body);
			_top = $(document).scrollTop();
			// $(".modal-content").css("top", $(document).scrollTop())
			// setTimeout(function() {
			// 	window.scrollTo(0, _top)	
			// }, 100)
			// $("article.expanded-view").hide("slide", {direction: "down"}, 2000);
		})

		// alert($("div.modal-dialog .close-it").length)
		$("div.modal-dialog .close-it").on("click", function() {
			// alert(_top)
			console.log("outside: " + _top)
			var timeout setTimeout(function() {
				// alert("inside");
				// alert(_top);
				// window.scrollTo(0, _top);
				console.log("inside: " + _top)
				document.body.scrollTop = _top;	
			}, 100)
		})
	}

	function addTimelineItems() {
		for(var i = 0; i < _timelineContents.length; i++) {
			var clone = $(".modal-dialog:first").clone();
			var id = _timelineContents[i].code;
			$("ul.timeline li:nth-of-type(" + (i + 1) + ") a").attr("href", "#" + _timelineContents[i].code);

			if($("#" + id).length == 0) {
				clone.attr("id", id)
				clone.find(".content-box p").remove();
				clone.find(".content-box").append("<p class='like-h4'><span>" + _timelineContents[i].date + "</span>" + _timelineContents[i].title + "</p>");
				clone.find(".content-box").append(_timelineContents[i].tier1);
				// alert(_timelineContents[i].tier2)
				clone.find(".content-box").append(_timelineContents[i].tier2);
				$("body").append(clone);
			}
		}
		var overlay = $(".modal-overlay")
		$("body").append(overlay);
        $('.event a').on('click', function(){
          $('html').addClass('target');
        })
        $('.close-it').on('click', function(){
          $('html').removeClass('target');
        })
      		
	}
})