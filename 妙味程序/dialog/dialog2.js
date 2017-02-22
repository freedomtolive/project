function Dialog2(opt){
//	opt = opt || {};
	this.defaults = {};
	
	//如果传入的opt不是一个对象时，那么默认他为一个空对象
	if(opt.constructor !== Object){
		opt = {};
	}
	//将opt的属性复制一份，避免修改原来的数据mask
	for(var attr in opt){
		this.defaults[attr] = opt[attr]
	}
	this.init();
}

Dialog2.prototype = {
	constructor : Dialog2,
	init(){
		this.div = this.html();
		document.body.appendChild(this.div);
		
		//定位置
		this.pos();
		this.addevent();
		this.sty();
		
		//拖拽
		new Drag({
			dragEle:this.div.querySelector('.dialog2_head'),
			moveEle:this.div
		});
		
		//增加层级
		handle.zIndexFn(this.div)
	},
	html(){
		var oDiv = document.createElement("div");
		oDiv.className = 'dialog2_wrap dialog_wrap';
		var html = `
			<header class="dialog2_head">
				<div class="dialog2_head_left">
					<span class="dialog2_head_img"></span>
					<div class="dialog2_head_left">
						<h3 class="dialog2_head_title"><span>${this.defaults.title}</span>  照片查看器</h3>
					</div>
				</div>
				<div class="dialog_head_right dialog2_head_right">
					<div class="min">
						<span></span>
					</div>
					<div class="max">
						<span></span>
					</div>
					<div class="cha">
						<span></span>
					</div>
				</div>
			</header>
			<div class="dialog2_content">
				<div class="dialog2_content_top">
					<ul class="dialog2_content_list">
						<li>
							<div class="dialog2_li_font">文件(F)</div>
							<span class="dialog2_li_img"></span>
						</li>
						<li>
							<div class="dialog2_li_font">打印(P)</div>
							<span class="dialog2_li_img"></span>
						</li>
						<li>
							<div class="dialog2_li_font">电子邮件(E)</div>
						</li>
						<li>
							<div class="dialog2_li_font">刻录(U)</div>
							<span class="dialog2_li_img"></span>
						</li>
						<li>
							<div class="dialog2_li_font">打开(O)</div>
							<span class="dialog2_li_img"></span>
						</li>
					</ul>
				</div>
				<div class="dialog2_img">
					<img src="${this.defaults.url}"></img>
				</div>
			</div>
			<footer class="dialog2_foot">
				<div class="dialog2_foot_content">
					<div class="dialog2_seeMore">
						<span class="dialog2_seeMore_ico" ></span>
					</div>
					<div class="dialog2_seeMax">
						<span class="dialog2_seeMax_ico"></span>
					</div>
					<span class="dialog2_prev_ico"></span>
					<span class="dialog2_browse_ico"></span>
					<span class="dialog2_next_ico"></span>
					<div class="dialog2_rotate1">
						<span class="dialog2_rotate1_ico"></span>
					</div>
					<div class="dialog2_rotate2">
						<span class="dialog2_rotate2_ico"></span>
					</div>
					<span class="dialog2_gang"></span>
					<div class="dialog2_delet">
						<span class="dialog2_delet_ico"></span>
					</div>
				</div>
			</footer>
		`
		oDiv.innerHTML = html;
		return oDiv;
	},
	sty(){
		this.div.style.width = this.defaults.width + 'px';
		this.div.style.height = this.defaults.height + 'px';
		this.div.style.zIndex = ++commonObj.max;
	},
	pos(){
		this.div.style.left = (this.dWidth() - this.div.offsetWidth)/2 + 'px';
		this.div.style.top = (this.dHeight() - this.div.offsetHeight)/2 + 'px';
		
		if(this.defaults.left !== null && !isNaN(Number(this.defaults.left)) ){
			this.div.style.left = this.defaults.left + 'px';
		};
		if(this.defaults.left !== null && !isNaN(Number(this.defaults.top)) ){
			this.div.style.top = this.defaults.top + 'px';
		};
	},
	dWidth(){
		return document.documentElement.offsetWidth;
	},
	dHeight(){
		return document.documentElement.clientHeight;
	},
	addevent(){
		//先确定一个This的指向,避免下面的函数内this指向发生改变
		var This = this;
		
		//添加关闭事件
		this.oClose = this.div.getElementsByClassName('cha')[0];
		
		this.oClose.addEventListener('mousedown',function(ev){
			ev.stopPropagation();
		},false)
		
		this.oClose.addEventListener('click',function(){
			var index = $(This.div).index(".dialog_wrap")
			document.body.removeChild(This.div);
			$(".tankuang_div").eq(index).remove();
			if(!$(".tankuang_div").length){
				$(".min_computed").hide();
			}
			//重新计算位置
			var oMin_tankuang = document.getElementsByClassName("min_tankuang")[0];
			var xiaojianjian = document.getElementsByClassName("xiaojianjian")[0];
			var xiaojianjian2 = document.getElementsByClassName("xiaojianjian2")[0];
			var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
			oMin_tankuang.style.width = 260*aDialog_wrap.length+"px";
			oMin_tankuang.style.left = -(260*aDialog_wrap.length-74)/2+"px";
			xiaojianjian2.style.left = (260*aDialog_wrap.length-19)/2+"px";
			xiaojianjian.style.left = (260*aDialog_wrap.length-19)/2+"px";
		},false)
		
		//添加最小化事件
		this.oMin = $(this.div).find(".min");
		this.oMin.mousedown(function(ev){
			ev.stopPropagation();
		})
		this.oMin.click(function(){
			$(This.div).hide();
		})
		
		//放大还原
		var onoff = false;//false对应没有全屏
		this.oMax = $(this.div).find(".max");
		var pos0 = This.div.getBoundingClientRect();
		var content = This.div.getElementsByClassName("dialog2_content")[0]
		var imgBox = This.div.getElementsByClassName("dialog2_img")[0];
		this.lastLeft = pos0.left;
		this.lastTop = pos0.top;
		this.lastWidth = This.div.offsetWidth;
		this.lastHeight = This.div.offsetHeight;
		this.lastChildsWidth = imgBox.offsetHeight;
		this.oMax.mousedown(function(ev){
			ev.stopPropagation();
		})
		this.oMax.click(function(ev){
			clearTimeout("timer2")
			if(!onoff){
				//第一次没有transition效果~~~~~~
				var numHeight = This.dHeight() - 168;
				var numWidth = This.dWidth()-260;
				$(".max span").addClass("max_span")
				This.div.style.width = This.dWidth()-20+"px";
				This.div.style.height = This.dHeight()+"px";
				This.div.style.left = 0;
				This.div.style.top = 0;
				imgBox.style.height = content.offsetHeight - 28 + "px";
			}else{
				$(".max span").removeClass("max_span")
				This.div.style.width = This.lastWidth+"px";
				This.div.style.height = This.lastHeight+"px";
				This.div.style.left = This.lastLeft+"px";
				This.div.style.top = This.lastTop+"px";
				imgBox.style.height = This.lastChildsWidth + "px";
			}
			onoff = !onoff;
			
			pos();
			
			ev.stopPropagation();
		})
		
		//-----------------------hover效果----------------------
		$(".dialog2_foot_content div").hover(function(){
			$(this).addClass("dialog2_foot_content_hover");
		},
		function(){
			$(this).removeClass("dialog2_foot_content_hover");
			$(this).removeClass("dialog2_foot_content_select");
		})
		$(".dialog2_foot_content div").mousedown(function(){
			$(this).addClass("dialog2_foot_content_select");
		})
		$(".dialog2_foot_content div").mouseup(function(){
			$(this).removeClass("dialog2_foot_content_select");
		})
		//------------------------旋转-----------------------------
		var num = 0;
		var oImg = This.div.getElementsByTagName("img")[0];
		$(This.div).find(".dialog2_rotate1").click(function(){
			num = num-90
//			if(num%90 == 0){
//				oImg.style.width = $(".dialog2_img")[0].offsetHeight+"px";
//				oImg.style.height = "auto";
//			}else{
//				oImg.style.width = $(".dialog2_img")[0].offsetHeight+"px";
//				oImg.style.height = "auto";
//			}
			oImg.style.transform = "rotate("+ num +"deg)";	
		})
		$(This.div).find(".dialog2_rotate2").click(function(){
			num = num+90;
			oImg.style.transform = "rotate("+ num +"deg)";	
		})
		
		//-------------------上一张,下一张--------------------------
		$(This.div).find(".dialog2_prev_ico").hover(function(){
			$(this).addClass("dialog2_prev_ico_hover");
		},function(){
			$(this).removeClass("dialog2_prev_ico_hover");
			$(this).removeClass("dialog2_prev_ico_selected");
		})
		$(This.div).find(".dialog2_prev_ico").mousedown(function(){
			$(this).addClass("dialog2_prev_ico_selected");
		})
		$(This.div).find(".dialog2_prev_ico").mouseup(function(){
			$(this).removeClass("dialog2_prev_ico_selected");
		})
		
		$(This.div).find(".dialog2_prev_ico").click(function(){
				console.log(1)
		})
		
		
		$(This.div).find(".dialog2_next_ico").hover(function(){
			$(this).addClass("dialog2_next_ico_hover");
		},function(){
			$(this).removeClass("dialog2_next_ico_hover");
			$(this).removeClass("dialog2_next_ico_selected");
		})
		$(This.div).find(".dialog2_next_ico").mousedown(function(){
			$(this).addClass("dialog2_next_ico_selected");
		})
		$(This.div).find(".dialog2_next_ico").mouseup(function(){
			$(this).removeClass("dialog2_next_ico_selected");
		})
		
		
		$(This.div).find(".dialog2_next_ico").click(function(){
			console.log(1);
		})
		
		var dialog2_foot = This.div.getElementsByClassName("dialog2_foot")[0]
		var dialog2_foot_content = This.div.getElementsByClassName("dialog2_foot_content")[0];
		var img = imgBox.getElementsByTagName("img")[0];
		
		function pos(){
			img.style.left = (imgBox.offsetWidth - img.offsetWidth)/2 + "px";
			dialog2_foot_content.style.left = (dialog2_foot.offsetWidth - dialog2_foot_content.offsetWidth)/2 + "px";
		}
		
		
		
		//-------------------------放大缩小------------------------------------
		var oDialog2_img = This.div.getElementsByClassName("dialog2_img")[0];
		handle.addScroll(oDialog2_img,goMore,goLess);
		var moreNum = 1;
		function goMore(){
			moreNum += 0.1;
			if(moreNum>2){
			moreNum=2
			}
			oImg.style.transform = "rotate("+ num +"deg) scale("+moreNum+")";
		}
		
		function goLess(){
			moreNum -= 0.1;
			if(moreNum<0.3){
				moreNum=0.3
			}
			oImg.style.transform = "rotate("+ num +"deg) scale("+moreNum+")";
		}
		
		oImg.addEventListener("mousedown",function(ev){
			console.log(3)
			if(moreNum<=1) return;
			var disX = ev.clientX;
			var disY = ev.clientY;
			
			document.addEventListener("mousemove",MoveFn(ev,disX,disY),false)
			document.addEventListener("mouseup",UpFn,false)
		},false)
		
		function MoveFn(ev,disX,disY){
			
//			if((oImg.offsetWidth) > (oDialog2_img.offsetWidth)){
//				console.log(1)
//			}
//			if((oImg.offsetHeight) > (oDialog2_img.offsetHeight)){
//				console.log(2)
//			}




		}
		function UpFn(){
		}
		
		
	}
	
}

