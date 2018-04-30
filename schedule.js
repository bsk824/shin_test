var sch = {
	wrap : '.schedule_list',
	dateWrap : '.date_sel',
	timeWrap : '.time_sel',
	padding : 213,
	scrollStatus: 0,
	pos : [],
	posH : [],
	schDatePos : [],
	schDateHPos : [],
	datePos : [],
	timePos : [],
	timeDatePos : []
}
var posSet = function(ele) {
	var listWrap = $('.' + ele),
		date = listWrap.find('.date'),
		dateH = listWrap.find('.date_wrap'),
		items = listWrap.find('.item');
	if(ele === 'date_sel') {
		sch.datePos = [];
		items.each(function(){
			var $this = $(this),
				pos = $this.position().left;
			sch.datePos.push(pos);
		});
	}
	if(ele === 'time_sel') {
		sch.timePos = [],
		sch.timeDatePos = [];
		items.each(function(){
			var $this = $(this),
				pos = $this.position().top;
			sch.timePos.push(pos);
		});
		date.each(function(){
			var $this = $(this),
				pos = $this.position().top;
			sch.timeDatePos.push(pos);
		});
	}
	if(ele === 'schedule_list') {
		sch.Pos = [],
		sch.schDatePos = [];
		items.each(function(){
			var $this = $(this),
				pos = $this.position().top,
				posH = pos + $this.height();
			
			sch.pos.push(pos);
			sch.posH.push(posH);
		});
		date.each(function(){
			var $this = $(this),
				pos = $this.position().top - sch.padding;
			sch.schDatePos.push(pos);
		});
		dateH.each(function(){
			var $this = $(this),
				pos = $this.position().top - sch.padding,
				posH = pos + $this.height();
			sch.schDateHPos.push(posH);
		});
	}
}
var scheduleItemView = function(_this) {
	var $this = $(_this),
		parent =  $this.parent(),
		idx = parent.index();
	
	parent.addClass('active').siblings().removeClass('active');
	
	sch.scrollStatus = 1;
	$(sch.wrap).stop().animate({scrollTop : sch.pos[idx]},500);
	$(sch.timeWrap).stop().animate({scrollTop : sch.timePos[idx]},500,function(){
		sch.scrollStatus = 0;
	});
}
var dateActivePos = function(idx) {
	var dateItemW = $(sch.dateWrap).find('.item').eq(idx).width() / 2,
		dateCenter = dateItemW - ($(window).width() / 2);
	function pos() {
		return sch.datePos[idx] + dateCenter
	}
	return pos();
}
var dateSel = function(_this) {
	var $this = $(_this),
		parent = $this.parent(),
		idx = parent.index();
	
	parent.addClass('active').siblings().removeClass('active');

	$(sch.dateWrap).stop().animate({scrollLeft : dateActivePos(idx)},200);
	
	sch.scrollStatus = 1;
	$(sch.wrap).stop().animate({scrollTop : sch.schDatePos[idx]},500);
	$(sch.timeWrap).stop().animate({scrollTop : sch.timeDatePos[idx]},500,function(){
		sch.scrollStatus = 0;
	});
}
var todayActive = function(idx) {
	$(sch.wrap).scrollTop(sch.schDatePos[idx]);
	$(sch.timeWrap).scrollTop(sch.timeDatePos[idx]);
	$(sch.dateWrap).scrollLeft(dateActivePos(idx)).find('.item').eq(idx).removeClass('active');
}

$(function(){
	
	posSet('date_sel');
	posSet('time_sel');
	posSet('schedule_list');
	
	todayActive(7);
	
	$(sch.wrap).scroll(function(){
		var $this = $(this),
			scrollTop = $this.scrollTop(),
			schItem = $(sch.wrap).find('.item'),
			dateItem = $(sch.dateWrap).find('.item'),
			timeItem = $(sch.timeWrap).find('.item'),
      idx = 0;
		
		// var idx = sch.posH.findIndex(function(item, idx) {
		// 	return item - 200 >= scrollTop
		// });
		// var dateIdx = sch.schDateHPos.findIndex(function(item, idx) {
		// 	return item - 200 > scrollTop
		// });
    sch.pos.some(function(val, now){
      if (val <= scrollTop) {
        idx = now;
       }
      
    });
    
    console.log(idx, scrollTop, sch.pos[idx]);
		
		var activeDate = dateItem.eq(dateIdx),
			activeItem = schItem.eq(idx),
			activeTime = timeItem.eq(idx);

		activeItem.addClass('active').siblings().removeClass('active');
		
		if(!activeDate.hasClass('active') && sch.scrollStatus === 0) {
			activeDate.addClass('active').siblings().removeClass('active');
			$(sch.dateWrap).stop().animate({scrollLeft : dateActivePos(dateIdx)}, 200);
		}
		if(!activeTime.hasClass('active') && sch.scrollStatus === 0) {
			activeTime.addClass('active').siblings().removeClass('active');
			$(sch.timeWrap).stop().animate({scrollTop : sch.timePos[idx]},500);
		}
	});

	
});