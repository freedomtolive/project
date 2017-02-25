(function(){
	//日期
	var t = new Date();
	var strWeek = "";
	
	handle.time();
	setInterval(handle.time(),1000)
	
	var oHua = document.getElementsByClassName("huakuai")[0]
	var disX = null;
	var onOff = false;
	
	//--------------------------拖拽解锁------------------------------
	$(".huakuai")[0].addEventListener('touchstart',start);
	document.addEventListener('touchmove',move);
	document.addEventListener('touchend',end);
	function start(ev){
		var e = ev.changedTouches[0];
		disX = e.pageX - this.offsetLeft;
		onOff = true;
	}
	function move(ev){
		if(onOff == false) return;
		var e = ev.changedTouches[0];
		var numLeft = e.pageX - disX;
		if(numLeft>=($(".foot_font")[0].offsetWidth - $(".huakuai")[0].offsetWidth)){
			numLeft = $(".foot_font")[0].offsetWidth - $(".huakuai")[0].offsetWidth
		}else if(numLeft<=0){
			numLeft = 0;
		}
		$(".huakuai")[0].style.left = numLeft + "px";
	}
	function end(){
		if($(".huakuai")[0].offsetLeft >= ($(".foot_font")[0].offsetWidth/5*3)){
			$(".huakuai")[0].style.left = $(".foot_font")[0].offsetWidth - $(".huakuai")[0].offsetWidth + "px";
		}else{
			$(".huakuai")[0].style.left = 0 + "px";
		}
		
		if($(".huakuai")[0].offsetLeft  === ($(".foot_font")[0].offsetWidth - $(".huakuai")[0].offsetWidth)){
			
		}
		
		onOff = false
	}
	
	
	
	
})()
