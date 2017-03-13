(function(){
	$(".child2_div").on("mouseover",function(){
		var index = $(this).index();
		console.log(index)
		$(".child2_div").removeClass("in");

		$(this).addClass("in");
		$(".child_bg").removeClass("in");
		$(".child_bg").addClass("out");
		$(".child_bg").eq(index).removeClass("out");
		$(".child_bg").eq(index).addClass("in");

	})




})()