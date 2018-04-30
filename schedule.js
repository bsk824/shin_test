var sch = {
	wrap : '.schedule_list',
	dateWrap : '.date_sel',
	timeWrap : '.time_sel',
	padding : 50,
	scrollStatus: 0,
	pos : [],
	datePos : [],
	timePos : []
}
var posSet = function(ele) {
	var listWrap = $('.' + ele),
		date = listWrap.find('.date'),
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
		sch.timePos = []
		items.each(function(){
			var $this = $(this),
				pos = $this.position().top;
			sch.timePos.push(pos);
		});
	}
	if(ele === 'schedule_list') {
		sch.pos = [];
		items.each(function(){
			var $this = $(this),
				pos = $this.position().top - sch.padding;
			sch.pos.push(pos);
		});
	}
}
var scheduleItemView = function(_this) {
	var $this = $(_this),
		parent =  $this.parent(),
		idx = parent.index();
	
	parent.addClass('active').siblings().removeClass('active');
	
	sch.scrollStatus = 1;
	$('html, body').stop().animate({scrollTop : sch.pos[idx]},400);
	$(sch.timeWrap).stop().animate({scrollTop : sch.timePos[idx]},500,function(){
		sch.scrollStatus = 0;
	});
}
var dateActivePos = function(idx) {
	var dateItemW = $(sch.dateWrap).find('.item').eq(idx).width() / 2,
		dateCenter = dateItemW - ($(window).width() / 2);
	function pos() {
		return sch.datePos[idx] + dateCenter;
	}
	return pos();
}
var dateSel = function(_this) {
	var $this = $(_this),
		parent = $this.parent(),
		idx = parent.index();
	
	parent.addClass('active').siblings().removeClass('active');

	$(sch.dateWrap).stop().animate({scrollLeft : dateActivePos(idx)},200);
}
var todayActive = function(idx) {
	$(sch.dateWrap).scrollLeft(dateActivePos(idx)).find('.item').eq(idx).removeClass('active');
}

$(function(){
	setTimeout(function(){
		posSet('date_sel');
		posSet('time_sel');
		posSet('schedule_list');
		
		todayActive(7);
	},200);

	$(window).scroll(function(){
		var $this = $(this),
			scrollTop = $this.scrollTop(),
			schItem = $(sch.wrap).find('.item'),
			dateItem = $(sch.dateWrap).find('.item'),
			timeItem = $(sch.timeWrap).find('.item'),
			idx = 0;
		
		sch.pos.some(function(val, now){
			if (val <= scrollTop) {
				idx = now;
			}
		});

		var activeItem = schItem.eq(idx),
			activeTime = timeItem.eq(idx);

		activeItem.addClass('active').siblings().removeClass('active');
		
		if(!activeTime.hasClass('active') && sch.scrollStatus === 0) {
			activeTime.addClass('active').siblings().removeClass('active');
			$(sch.timeWrap).stop().animate({scrollTop : sch.timePos[idx]},500);
		}
	});

});