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
			<div class="dialog2_content"  data-id="${this.defaults.pid}">
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
			num = num-90;
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
		
		//-------------点击上一张做得事情-----------------
		$(This.div).find(".dialog2_prev_ico").click(function(){
			var numPid = $(This.div).find(".dialog2_content")[0].dataset.id
			var arrImg = data.myComputed.filter((item)=>item.pid == numPid)	
			var index = arrImg.findIndex((item)=>item.id == This.defaults.id)
			if(index == 0){
				index = arrImg.length;
			}
			This.defaults.id = arrImg[index-1].id
			This.defaults.url = arrImg[index-1].pos
			This.defaults.title = arrImg[index-1].title
				
			$(This.div).find(".dialog2_head_title span").text(This.defaults.title)	;
			$(This.div).find(".dialog2_img img")[0].src = This.defaults.url;
			oImg.style.height = imgBox.offsetHeight+"px";
			oImg.style.width = "auto";
		})
		
		//--------------------删除--------------------------------
		$(This.div).find(".dialog2_delet_ico").click(function(){
			//找到数组和当前是数组的第几张图片
			var numPid = $(This.div).find(".dialog2_content")[0].dataset.id
			var arrImg = data.myComputed.filter((item)=>item.pid == numPid)	
			var index = arrImg.findIndex((item)=>item.id == This.defaults.id)
			var obj = data.myComputed.find((item)=>item.id == This.defaults.id )
			console.log(data.delet)
			//放入回收站
			console.log(obj)
			data.delet.push(obj)
			data.myComputed = data.myComputed.filter((item)=>item.id != This.defaults.id )
			
			if(index >= arrImg.length-1){
				index = 0;
			}
			
			//显示下一张图片,并改变数字
			This.defaults.id = arrImg[index+1].id
			This.defaults.url = arrImg[index+1].pos
			This.defaults.title = arrImg[index+1].title	
			$(This.div).find(".dialog2_head_title span").text(This.defaults.title);
			$(This.div).find(".dialog2_img img")[0].src = This.defaults.url;
			oImg.style.height = imgBox.offsetHeight+"px";
			
			handle.removeHtml()
			
			handle.removeDeletHtml();
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
			//点击下一张做得事情
			var numPid = $(This.div).find(".dialog2_content")[0].dataset.id
			var arrImg = data.myComputed.filter((item)=>item.pid == numPid)	
			var index = arrImg.findIndex((item)=>item.id == This.defaults.id)
			if(index == arrImg.length-1){
				index = -1;
			}
			This.defaults.id = arrImg[index+1].id
			This.defaults.url = arrImg[index+1].pos
			This.defaults.title = arrImg[index+1].title
				
			$(This.div).find(".dialog2_head_title span").text(This.defaults.title)	;
			$(This.div).find(".dialog2_img img")[0].src = This.defaults.url;
			oImg.style.height = imgBox.offsetHeight+"px";
			oImg.style.width = "auto";
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
		var disWidth = oImg.offsetWidth;
		var disHeight = oImg.offsetHeight;
		var disLeft = oImg.offsetLeft;
		var disTop = oImg.offsetTop;
		var moreNum = 0;
		function goMore(){
			moreNum = 6;
			if(oImg.offsetHeight>=disHeight*3){
				return
			}
			oImg.style.width = oImg.offsetWidth + moreNum + "px";
			oImg.style.height = "auto";
			
			oImg.style.left = oImg.offsetLeft - (moreNum/2) + "px";
			oImg.style.top =  oImg.offsetTop - (moreNum/2) + "px";
			if(oImg.offsetHeight > disHeight){
				$(This.div).find(".dialog2_seeMax_ico").addClass("dialog2_seeMax_ico_active");
			}
		}
		
		function goLess(){
			moreNum = -6;
			if(oImg.offsetHeight<=disHeight+6){
				oImg.style.height = disHeight + "px"
				if(oImg.offsetHeight == disHeight){
					$(This.div).find(".dialog2_seeMax_ico").removeClass("dialog2_seeMax_ico_active");
				}
				
				return;
			}
			
			oImg.style.width = oImg.offsetWidth + moreNum + "px";
			oImg.style.height = "auto";
			
			
			if(oImg.offsetLeft >= disLeft){
				oImg.style.left = disLeft + "px"
			}else if(oImg.offsetLeft<=(oDialog2_img.offsetWidth-oImg.offsetWidth)&&(oDialog2_img.offsetWidth<oImg.offsetWidth)){
				oImg.offsetLeft=(oDialog2_img.offsetWidth-oImg.offsetWidth)+"px"
			}else{
				oImg.style.left = oImg.offsetLeft - (moreNum/2) + "px";
			}
			
			if(oImg.offsetTop >= disTop){
				oImg.style.top = disTop + "px";
			}else if(oImg.offsetTop<=(oDialog2_img.offsetHeight-oImg.offsetHeight-3)&&(oDialog2_img.offsetHeight<oImg.offsetHeight)){
				oImg.style.top = (oDialog2_img.offsetHeight-oImg.offsetHeight-3) + "px";
				console.log(oDialog2_img.offsetHeight-oImg.offsetHeight)
			}else{
				oImg.style.top =  oImg.offsetTop - (moreNum/2) + "px";
			}
			
		}
		
		oImg.addEventListener("mousedown",function(ev){
			if(moreNum<=1) return;
			This.disX = ev.clientX;
			This.disY = ev.clientY;
			
			document.onmousemove = MoveFn.bind(this);
			document.onmouseup = UpFn;
			ev.preventDefault();
			ev.stopPropagation();
			
			function MoveFn(ev){
				var oriX = ev.clientX - This.disX
				var oriY = ev.clientY - This.disY
				if(!num%90){
					//说明是正常或者旋转180度的角度
					if(oImg.offsetWidth > oDialog2_img.offsetWidth){
						if((oImg.offsetLeft + oriX) >= 0){
							oImg.style.left = 0 + "px";
						}else if((oImg.offsetLeft + oriX)<=(oDialog2_img.offsetWidth-oImg.offsetWidth)){
							oImg.style.left = oDialog2_img.offsetWidth - oImg.offsetWidth + "px";
						}else{
							oImg.style.left = oImg.offsetLeft + oriX + "px";
						}
					}
					if(oImg.offsetHeight > oDialog2_img.offsetHeight){
						if((oImg.offsetTop + oriX) >= 0){
							oImg.style.top = 0 + "px";
						}else if((oImg.offsetTop + oriY)<=(oDialog2_img.offsetHeight-oImg.offsetHeight)){
							oImg.style.top = oDialog2_img.offsetHeight-oImg.offsetHeight + "px";
						}else{
							oImg.style.top = oImg.offsetTop + oriY + "px";
						}
					}
					This.disX = ev.clientX;
					This.disY = ev.clientY;
				}else{
					//说明是旋转90度或者270度的角度
					if(oImg.offsetWidth > oDialog2_img.offsetHeight){
						if((oImg.offsetTop + oriY) >= 0){
							oImg.style.top = 0 + "px";
						}else if((oImg.offsetTop + oriY)<=(oDialog2_img.offsetHeight-oImg.offsetHeight)){
							oImg.style.top = oDialog2_img.offsetHeight-oImg.offsetHeight + "px";
						}else{
							oImg.style.top = oImg.offsetTop + oriY + "px";
						}
					}
					if(oImg.offsetHeight > oDialog2_img.offsetWidth){
//						console.log(oImg.offsetLeft + oriX)
//						console.log(oImg.offsetLeft)
//						-----------------拖拽不会写------------------------
						oImg.style.left = oImg.offsetLeft + oriX + "px";
					}
					This.disX = ev.clientX;
					This.disY = ev.clientY;
				}
			}
			function UpFn(ev){
				this.onmousemove = this.onmouseup = null;
			}
		},false)
		
		//-------------放大的点击------------------------------
		$(This.div).find(".dialog2_seeMax").click(function(){
			if($(this).find(".dialog2_seeMax_ico").hasClass("dialog2_seeMax_ico_active")){
				oImg.style.width = disWidth + "px";
				oImg.style.height = disHeight + "px";
				oImg.style.left = disLeft + "px";
				oImg.style.top = disTop + "px";
				$(this).find(".dialog2_seeMax_ico").removeClass("dialog2_seeMax_ico_active")
			}else{
				oImg.style.width = disWidth*2 + "px";
				oImg.style.height = disHeight*2 + "px";
				oImg.style.left = disLeft-disWidth/2 + "px";
				oImg.style.top = disTop-disWidth/2 + "px";
				$(this).find(".dialog2_seeMax_ico").addClass("dialog2_seeMax_ico_active")
			}
		})
		
		
	}
	
}

