$(function(){

	var _timelineContents;
	var _top;
	$.getJSON( "timeline_content.json", function( data ) {
		_timelineContents = data.timeline;
		_footnotes = data.footnotes;
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

		$("div.modal .modal__close").on("click", function() {
			$('html').removeClass('target');
			var timeout = setTimeout(function() {
			window.scrollTo(0, _top);
				// console.log("inside: " + _top)
				// document.body.scrollTop = _top;	
			}, 100)
			$('html').removeClass('target');
		})
	}

	function addTimelineItems() {
		for(var i = 0; i < _timelineContents.length; i++) {
			// var clone = (i == 0) ? $(".modal-dialog:first") : $(".modal-dialog:first").clone();
			var clone = (i == 0) ? $(".modal:first") : $(".modal:first").clone();
			var id = _timelineContents[i].code;
			$("ul.timeline li:nth-of-type(" + (i + 1) + ")").attr("data-date", _timelineContents[i].date);
			if($("ul.timeline li:nth-of-type(" + (i + 1) + ") a").length == 0) {
				$("ul.timeline li:nth-of-type(" + (i + 1) + ") h4").html("<a>" + _timelineContents[i].title + "</a>");	
			}
			$("ul.timeline li:nth-of-type(" + (i + 1) + ") a").attr("href", "#" + _timelineContents[i].code);

			// if(i == 0) {
			// 	clone = $(".modal-dialog:first")
			// }
			// if($("#" + id).length == 0) {
				clone.attr("id", id)
				clone.find(".modal__text p").remove();
				clone.find(".modal__text").prepend(_timelineContents[i].tier1);
				clone.find(".modal__text").prepend("<p class='like-h4'><span>" + _timelineContents[i].date + "</span>" + _timelineContents[i].title + "</p>");
				
				// alert(_timelineContents[i].tier2)
				clone.find(".modal__text .details__contents").html("");
				clone.find(".modal__text .details__contents").append(_timelineContents[i].tier2);
				if(!_timelineContents[i].tier2) {
					clone.find(".modal__text .details__trigger").remove();
				}
				var footnoteIndexes = _timelineContents[i].footnoteIndexes;
				// var footnotes = _timelineContents[i].
				// alert(footnoteIndexes)
				clone.find(".modal__text .details input").attr("id", "open-more" + i);
				clone.find(".modal__text .details label").attr("for", "open-more" + i);
				if(footnoteIndexes) {
					for(var j = 0; j < footnoteIndexes.length; j++) {
						var index = footnoteIndexes[j];
						clone.find(".modal__text .references").append(_footnotes[index]);
					}
				} else {
					clone.find(".modal__text .references").remove();
				}
				if(i != 0)
					$("body").append(clone);
			// }
		}
		// var overlay = $(".modal-overlay")
		// $("body").append(overlay);
        $('.event a').on('click', function(){
          $('html').addClass('target');
        })
     		
	}
})