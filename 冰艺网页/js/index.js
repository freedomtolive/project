(function(){

	var oContent_move = document.querySelector(".content_move");
	var oContent_child = document.querySelectorAll(".content_child")
	var num = 0;
	var num2 = $(window).innerHeight()
	var maxTrans = -num2 * (oContent_child.length-1);
	var onOff = true;
	$(".child2_div").on("mouseover",function(){
		var index = $(this).index();
		$(".child2_div").removeClass("in");

		$(this).addClass("in");
		$(".child_bg").removeClass("in");
		$(".child_bg").addClass("out");
		$(".child_bg").eq(index).removeClass("out");
		$(".child_bg").eq(index).addClass("in");
	})

	function addScroll(obj,fnUp,fnDown) {
		//为obj添加鼠标滚轮事件处理函数
		obj.onmousewheel = fn;
		obj.addEventListener("DOMMouseScroll",fn);
		function fn(e) {//只要滚动滚轮了，就会触发fn
			if(e.wheelDelta){//chrome
				e.wheelDelta<0? fnDown(): fnUp();
				return false;//阻止默认行为，防止页面滚动
			}
			if(e.detail){//firefox
				e.detail>0? fnDown(): fnUp();
				e.preventDefault();
			}
		}
	}

	addScroll(oContent_move,function(){
		if(onOff === true){
			onOff = false;
			if(num>=0){
				num = 0
			}else{
				num = num + num2
			}

			if(num === num2*-1){
				$(".content_child2").addClass("in");
			}else{
				$(".content_child2").removeClass("in");
			}

			if(num === 0){
				$(".content_child1").addClass("in");
			}else{
				$(".content_child1").removeClass("in");
			}

			if(num === num2*-2){
				$(".content_child3").addClass("in");
			}else{
				$(".content_child3").removeClass("in");
			}
			MTween({
				el:oContent_move,
				time:400,
				target: {
					translateY:num
				},
				type: "linear",
				callBack:function(){
					onOff = true
				}
			})
		}
	},function(){
		if(onOff === true){
			onOff = false;
			if(num <= maxTrans){
				num === maxTrans
			}else{
				num = num - num2
			}


			if(num === num2*-1){
				$(".content_child2").addClass("in");
			}else{
				$(".content_child2").removeClass("in");
			}

			if(num === 0){
				$(".content_child1").addClass("in");
			}else{
				$(".content_child1").removeClass("in");
			}

			if(num === num2*-2){
				$(".content_child3").addClass("in");
			}else{
				$(".content_child3").removeClass("in");
			}
			MTween({
				el:oContent_move,
				time:400,
				target: {
					translateY:num
				},
				type: "linear",
				callBack:function(){
					onOff = true
				}
			})
		}
	})

	var off1 = true;
	var off2 = false;
	var timer = setInterval(function(){
		if($(".child").eq(0).hasClass("in")){
			if(!off1){
				off1 = true
			}else{
				off1 = false
				$(".child").eq(0).removeClass("in");
				$(".child").eq(0).addClass("left-out");
				$(".info").eq(0).removeClass("in");
				$(".info").eq(0).addClass("left-out");
			}
		}else if($(".child").eq(0).hasClass("left-out")){
			$(".child").eq(0).removeClass("left-out");
			$(".child").eq(0).addClass("left-in");
			$(".info").eq(0).removeClass("left-out");
			$(".info").eq(0).addClass("left-in");
		}else if($(".child").eq(0).hasClass("left-in")){
			$(".child").eq(0).removeClass("left-in");
			$(".child").eq(0).addClass("in");
			$(".info").eq(0).removeClass("left-in");
			$(".info").eq(0).addClass("in");
		}	

		if($(".child").eq(1).hasClass("in")){
			if(!off2){
				off2 = true
			}else{
				$(".child").eq(1).removeClass("in");
				$(".child").eq(1).addClass("left-out");
				$(".info").eq(1).removeClass("in");
				$(".info").eq(1).addClass("left-out");
				off2 = false
			}
		}else if($(".child").eq(1).hasClass("left-out")){
			$(".child").eq(1).removeClass("left-out");
			$(".child").eq(1).addClass("left-in");
			$(".info").eq(1).removeClass("left-out");
			$(".info").eq(1).addClass("left-in");
		}else if($(".child").eq(1).hasClass("left-in")){
			$(".child").eq(1).removeClass("left-in");
			$(".child").eq(1).addClass("in");
			$(".info").eq(1).removeClass("left-in");
			$(".info").eq(1).addClass("in");
		}	
	},2000)


})()