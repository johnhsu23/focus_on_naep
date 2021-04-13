$(function(){
	$("#timeline-content li h3").on("click", function(){
		alert('hi')
		$("article.expanded-view").hide("slide", {direction: "down"}, 2000);
	})
})