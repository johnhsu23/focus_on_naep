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
			$(this).parent().find(".details__state").prop("checked", false);
			var timeout = setTimeout(function() {
				window.scrollTo(0, _top);
			}, 100)
		})

		$("div.timeline-content ul.timeline-legend li").on("click", function(){
			$("div.filter ul.filter__year li").removeClass("selected");
			if(!$(this).hasClass("active")) var turnOn = true;
			$("div.timeline-content ul.timeline-legend li").removeClass("active")
			if(turnOn) {
				$(this).addClass("active")
			}
			var typeClass;
			if($(this).hasClass("type01")) typeClass = "type01";
			if($(this).hasClass("type02")) typeClass = "type02";
			if($(this).hasClass("type03")) typeClass = "type03";
			if($(this).hasClass("type04")) typeClass = "type04"; 
			if($(this).hasClass("active")) {
				$("ul.timeline li h4").parent().hide();
				$("ul.timeline li h4." + typeClass).parent().show();
			} else {
				$("ul.timeline li h4").parent().show();
			}
		})

		$("div.filter ul.filter__year li a").on("click", function() {
			$("div.timeline-content ul.timeline-legend li").removeClass("active")
			var element1 = this;
			var anchors = $("div.filter ul.filter__year li a");
			var index = -1;
			for(var i = 0; i < anchors.length; i++) {
				var listItem = $(element1).parent();
				if(anchors[i] == element1) {
					index = i;
					if(listItem.hasClass("selected")) {
						listItem.removeClass("selected");
						$("ul.timeline li").show();
						return false;
					}
					$("div.filter ul.filter__year li").removeClass("selected");
					listItem.addClass("selected");
				}
			}

			// $("div.filter ul.filter__year li a").each(function(index, element2) {
			// 	if(element1 == element2) {
			// 		if($(element1).parent().hasClass("selected")) {
			// 			$(element1).parent().removeClass("selected")
			// 			// show all timeline elements
			// 			return;
			// 		}
			// 	}
			// });
			var years = [];
			if(index == 0) {
				years = [2002, 2003, 2004, 2005, 2006];
			} else if (index == 1) {
				years = [2008, 2009, 2010];
			} else if (index == 2) {
				years = [2011, 2012, 2013, 2014];
			} else if (index == 3) {
				years = [2015, 2016, 2017, 2018, 2019, 2020];
			}
			
			$("ul.timeline li h4").parent().hide();
			$("ul.timeline li").each(function(index, element3) {
				for(var i = 0; i < years.length; i++) {
					if($(element3).attr("data-date").indexOf(years[i]) >= 0) {
						$(element3).show();
					}
				}
			});
			return false;
		})
	}

	function addTimelineItems() {
		for(var i = 0; i < _timelineContents.length; i++) {
			// var clone = (i == 0) ? $(".modal-dialog:first") : $(".modal-dialog:first").clone();
			// var clone = (i == 0) ? $(".modal:first") : $(".modal:first").clone();
			var clone = $(".modal:first").clone()
			var id = _timelineContents[i].code;

			var firstTimelineItem = $("ul.timeline li:first");
			var newTimelineItem =$("ul.timeline li:nth-of-type(" + (i + 1) + ")");
			if(newTimelineItem.length == 0) {
				firstTimelineItem.parent().append(firstTimelineItem.clone());
				newTimelineItem =$("ul.timeline li:nth-of-type(" + (i + 1) + ")");
				newTimelineItem.find("a").html(_timelineContents[i].title);
			}

			$("ul.timeline li:nth-of-type(" + (i + 1) + ")").attr("data-date", _timelineContents[i].date);
			if($("ul.timeline li:nth-of-type(" + (i + 1) + ") a").length == 0) {
				$("ul.timeline li:nth-of-type(" + (i + 1) + ") h4").html("<a>" + _timelineContents[i].title + "</a>");	
			}
			$("ul.timeline li:nth-of-type(" + (i + 1) + ") a").attr("href", "#" + _timelineContents[i].code);
			var category = _timelineContents[i].category
			if(category) {
				var categoryClass = null;
				if(category == "Commissions and Technical Panels") {
					categoryClass = "type01";
				} else if(category == "Efforts to Evaluate Feasibility of Reporting Preparedness") {
					categoryClass = "type02";
				}  
				else if(category == "Governing Board Actions and Decisions") {
					categoryClass = "type03";
				} else if (category == "Efforts to Produce Reference Points for Reporting Preparedness") {
					categoryClass = "type04";
				}
				if(categoryClass) {
					$("ul.timeline li:nth-of-type(" + (i + 1) + ") h4").attr("class", categoryClass);	
				}			
			}
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
			// if(i != 0)
			$("body").append(clone);
			// }
		}
		$(".modal:first").remove();
		// var overlay = $(".modal-overlay")
		// $("body").append(overlay);
        $('.event a').on('click', function(){
          $('html').addClass('target');
        })
     		
	}
})