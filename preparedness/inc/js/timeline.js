$(function(){
	var _timelineContents;
	$.getJSON( "timeline_content.json", function( data ) {
		_timelineContents = data;
		createEvents();
	}).fail(function() {
		alert("timeline content failed to load")
	});

	function createEvents() {
		$("div.timeline-content .event a").on("click", function(){
			var id = $(this).attr("id")
			// alert(JSON.stringify(_timelineContents[id]));
			$("#pull-up-modal p.like-h3").html(_timelineContents[id].title);
			$("#pull-up-modal p:nth-of-type(2)").html(_timelineContents[id].body);
			// $("article.expanded-view").hide("slide", {direction: "down"}, 2000);
		})
	}
})