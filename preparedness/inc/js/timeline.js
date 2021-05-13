$(function(){
	var _timelineContents;
	var _top;
	$.getJSON( "timeline_content.json", function( data ) {
		_timelineContents = data;
		createEvents();
	}).fail(function() {
		// alert("timeline content failed to load")
	});

	function createEvents() {
		$("div.timeline-content .event a").on("click", function(){
			var id = $(this).attr("id")
			$("#pull-up-modal p.like-h4 span:nth-of-type(1)").html(_timelineContents[id].date);
			$("#pull-up-modal p.like-h4 span:nth-of-type(2)").html(_timelineContents[id].title);
			$("#pull-up-modal p:nth-of-type(2)").html(_timelineContents[id].body);
			_top = $(document).scrollTop();
			// $("article.expanded-view").hide("slide", {direction: "down"}, 2000);
		})

		$("div#pull-up-modal .close-it").on("click", function() {
			// setTimeout(function() {
			// 	window.scrollTo(0, _top)	
			// }, 100)
		})
	}
})