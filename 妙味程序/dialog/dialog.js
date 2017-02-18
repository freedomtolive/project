function Dialog(opt){
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

Dialog.prototype = {
	constructor : Dialog,
	init(){
		this.div = this.html();
		
		document.body.appendChild(this.div);
		var oDialog = this.div.getElementsByClassName("dialog_conmput")[0];
		oDialog.innerHTML += html.createMyComputedHtml(data.myComputed,0);
		
		//如果输入的结构中能找见dialog_sort_contentTop，则说明打开的是此电脑，这时加载页面
		if(this.defaults.content.indexOf("dialog_sort_contentTop")!=-1){
			var oDialog_sort = this.div.getElementsByClassName("dialog_sort_contentTop")[0];
			oDialog_sort.innerHTML=html.createSortHtml(data.myComputed);
			
			var oDialog_sort2 = this.div.getElementsByClassName("dialog_sort_contentBottom2")[0];
			oDialog_sort2.innerHTML=html.createComputHtml(data.myComputed);
			
			var aJindu = this.div.getElementsByClassName("jindu");
			var oContentBottom2_right = this.div.getElementsByClassName("contentBottom2_right")[0]
			var oDiv = oContentBottom2_right.getElementsByTagName("div")[0];
			//找到对应的数组，根据数组中数据的多少改变jindu的宽度
			var arr = data.myComputed.filter((item)=> item.isTop == false)
			for(var i=0;i<aJindu.length;i++){
				aJindu[i].style.width = arr[i].now/arr[i].common*oDiv.offsetWidth + "px";
			}
		}else{
			//否则说明是回收站()
			var oDialog_sort_contentBottom3 = this.div.getElementsByClassName("dialog_sort_contentBottom3")[0];
			oDialog_sort_contentBottom3.innerHTML=html.createDelet(data.delet);
		}
		//定位置
		this.pos();
		this.addevent();
		this.sty();
		new Drag({
			dragEle:this.div.querySelector('.dialog_head'),
			moveEle:this.div
		});
	},
//	mask(){
		//遮罩的样式
//		this.Mask = document.createElement("div")
//		this.Mask.style.cssText = "width:100%;height:100%;background:#000;opacity: .5;position:fixed;left:0;top:0;z-index:99;";
//		document.body.appendChild(this.Mask)
//	},
	html(){
		//内容
		var oDiv = document.createElement("div");
		oDiv.className = 'dialog_wrap';
		var html = `
			<header class="dialog_head">
				<div class="dialog_head_left">
					<div class="dialog_head_img ${this.defaults.img}"></div>
					<span class="gang">|</span>
					<h3 class="dialog_title">${this.defaults.title}</h3>
				</div>
				<div class="dialog_head_right">
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
			<div class="dialog_div">
				<div class="dialog_div_left">
					<div>文件</div>
					<div>计算机</div>
					<div>查看</div>
				</div>
				<div class="dialog_div_right">
					<div>
						<span></span>
					</div>
					<div>
						<span></span>
					</div>
				</div>
			</div>
			<nav class="dialog_nav">
				<div class="dialog_nav_left">
					<span></span>
					<span></span>
					<span></span>
					<span>
						<i></i>
					</span>
				</div>
				<div class="dialog_nav_center">
					<span class="dialog_center_img ${this.defaults.img}"></span>
					<div class="dialog_center_font">
						<input type="text" class="dialog_nav_input"  />
						<div class="bread_nav">
							<span class="jiantou"></span>
							<div class="dialog_nav_font" data-id="0">${this.defaults.title}</div>
						</div>
					</div>
					<div class="dialog_resize">
						<span></span>
					</div>
					<div class="dialog_selected">
						<span></span>
					</div>
				</div>
				<div class="dialog_nav_right">
					<input type="text" class="dialog_nav_fond" placeholder="搜索此电脑"  />
					<div class="dialog_sousuo"></div>
				</div>
			</nav>
			<div class="dialog_content">
				<div class="dialog_content_left">
					<ul class="tree">
						<li class="sort">
							<h3>
								<span class="tubiao"></span>
								快速访问
							</h3>
							<ul>
								<li>
									<h3>
										<span class="dialog_tabloe"></span>
										桌面
									</h3>
								</li>
								<li>
									<h3>
										<span class="dialog_down"></span>
										下载
									</h3>
								</li>
								<li>
									<h3>
										<span class="dialog_docu"></span>
										文档
									</h3>
								</li>
								<li>
									<h3>
										<span class="dialog_peacture"></span>
										图片
									</h3>
								</li>
								<li>
									<h3>
										<span class="dialog_homework"></span>
										2016-06-08作业
									</h3>
								</li>
								<li>
									<h3>
										<span class="dialog_mydown"></span>
										我的下载
									</h3>
								</li>
							</ul>
						</li>
						<li>
							<h3>
								<span class="dialog_onedriver"></span>
								OneDriver
							</h3>
						</li>
						<li class="dialog_conmput">
							<h3 class="the_computed" data-id="0">
								<span class="dialog_mycomputer"></span>
								此电脑
							</h3>
							<!--<ul class="dialog_computed">-->
								<!--<li class="dialog_comput">
									<h3 >
										<span class="dialog_mycomputer"></span>
										此电脑
									</h3>
								</li>-->
							<!--</ul>-->
						</li>
						<li>
							<h3>
								<span class="dialog_web"></span>
								网络
							</h3>
						</li>
					</ul>
				</div>
				<div class="dialog_scroll_wrap">
					<div class="scroll_inner"></div>
				</div>
				<div class="dialog_content_right">
					<div class="dialog_right">
						${this.defaults.content}
						<div class="dialog_scroll_wrap2">
							<div class="scroll_inner2"></div>
						</div>
					</div>
				</div>
			</div>
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
		//添加事件;
		addevent(){
			var This = this;
			//改变this的指向
			var This2 = this;
			this.arr = [];
			//添加取消事件
			this.oClose = this.div.getElementsByClassName('cha')[0];
			var arr4 = [];
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
			
			//---------------------------自定义滚动条-------------------------------------
			function scroll(){
				var scroll_wrap = $(This.div).find(".dialog_scroll_wrap");
				var scroll_inner = $(This.div).find(".scroll_inner");
				var box = $(This.div).find(".dialog_content_left");
				var inner = $(This.div).find(".tree");
				//计算滚动条的高度
				//如果内容高度小于ul的高度，隐藏滚动条
				if($(".dialog_content").innerHeight()>= inner.innerHeight()){
					scroll_inner.hide()
				}else{
					scroll_inner.show()
				}
				var innerMaxTop = inner.innerHeight()- $(this.div).find(".dialog_content").innerHeight();
				var maxTop = scroll_wrap[0].clientHeight - scroll_inner[0].offsetHeight //可滚动的最大top值
				var y = 0;
		
				scroll_inner.mousedown(function(ev){
					ev.preventDefault();
					var disY = ev.pageY - scroll_inner[0].offsetTop;
					$(window).mousemove(function(e){
						y = e.clientY - disY;
						y = y<0?0:y;
						y = y>maxTop?maxTop:y;
	//					计算当前top值占总可移动距离的top的百分比
						var s = y/maxTop;
						
						inner[0].style.top = -s * innerMaxTop +"px";
						scroll_inner[0].style.top = y + "px";
						
					})
					$(window).mouseup(function(e){
						$(window).off("mousemove");
						$(window).off("mouseup")
					})
				})
				addScroll (scroll_wrap[0],goUp,goDown)
				addScroll (inner[0],goUp,goDown)
				
				function goUp(){//滚动条向上走，页面主体内容往下移动
		//				限制y
					y-=50;
					y = y<0?0:y;
		//				计算比例
					var s = y/maxTop;
					inner[0].style.top = -s * innerMaxTop +"px";
					scroll_inner[0].style.top = y + "px";
				}
				function goDown(){//滚动条向下走，页面主体内容往上移动
					if($(".dialog_content").innerHeight()>= inner.innerHeight()){
						return;
					}
					y+=50;
					y = y>maxTop?maxTop:y;
					var s = y/maxTop;
					inner[0].style.top = -s * innerMaxTop +"px";
					scroll_inner[0].style.top = y + "px";
				}
				
				function addScroll (obj,fnUp,fnDown) {
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
				//-----------------自定义滚动条2-----------------------------
				var scroll_wrap2 = $(This.div).find(".dialog_scroll_wrap2");
				var scroll_inner2 = $(This.div).find(".scroll_inner2");
				var box2 = $(This.div).find(".dialog_content_right");
				var inner2 = $(This.div).find(".dialog_right");
				var y2 = 0;
				
				var inner2MaxTop = inner2.innerHeight()- box2.innerHeight();
				var maxTop2 = scroll_wrap2[0].clientHeight - scroll_inner2[0].offsetHeight //可滚动的最大top值
				
				if(box2.innerHeight()>= inner2.innerHeight()){
					scroll_inner2.hide()
				}else{
					scroll_inner2.show()
				}
				
				scroll_inner2.mousedown(function(ev){
					ev.preventDefault();
					var disY = ev.pageY - scroll_inner2[0].offsetTop;
					$(window).mousemove(function(e){
						y2 = e.pageY - disY;
						y2 = y2<0?0:y2;
						y2 = y2>maxTop2?maxTop2:y2;
		//					计算当前top值占总可移动距离的top的百分比
						var s = y2/maxTop;
						
						inner2[0].style.top = -s * inner2MaxTop +"px";
						scroll_inner2[0].style.top = y2 + "px";
					})
					$(window).mouseup(function(e){
						$(window).off("mousemove");
						$(window).off("mouseup")
					})
				})
				addScroll(scroll_wrap2[0],goUp2,goDown2)
				addScroll(inner2[0],goUp2,goDown2)
				
				function goUp2(){//滚动条向上走，页面主体内容往下移动
		//				限制y2
					y2-=50;
					y2 = y2<0?0:y2;
		//				计算比例
					var s = y2/maxTop2;
					inner2[0].style.top = -s * inner2MaxTop+"px";
					scroll_inner2[0].style.top = y2 + "px";
				}
				function goDown2(){//滚动条向下走，页面主体内容往上移动
					y2+=50;
					y2 = y2>maxTop2?maxTop2:y2;
					var s = y2/maxTop2;
					inner2[0].style.top = -s * inner2MaxTop +"px";
					scroll_inner2[0].style.top = y2 + "px";
				}
			}
			scroll.call(This);
			
			//-----------------------点击max时使弹框最大化-----------------------
			//点击时候max的class应该改变,即更改最大化的图标,用来确定弹框是否在最大化的状态下,/
//			(现在无法完成,ps技术有困难,日后完成~~~!)
			var onoff = false;//false对应没有全屏
			var contentHeight = This.div.getElementsByClassName("dialog_content")[0]
			var contentRight = This.div.getElementsByClassName("dialog_right")[0]
			this.oMax = $(this.div).find(".max");
			var pos0 = This.div.getBoundingClientRect()
			this.lastLeft = pos0.left;
			this.lastTop = pos0.top;
			this.lastWidth = This.div.offsetWidth;
			this.lastWidth2 = contentRight.offsetWidth;
			this.lastHeight = contentHeight.offsetHeight;
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
					This.div.style.width = This.dWidth()+"px";
					This.div.style.left = 0;
					This.div.style.top = 0;
					This.div.getElementsByClassName("dialog_content_right")[0].style.width = numWidth+"px";
					This.div.style.transition = "1s";
					This.div.getElementsByClassName("dialog_content_right")[0].style.transition="1s"
					contentHeight.style.height = numHeight+"px";
					contentHeight.style.transition = "1s";
					setTimeout(function(){
						$(".dialog_nav_right").show();
					},500)
				}else{
					$(".max span").removeClass("max_span")
					This.div.style.width = This.lastWidth+"px";
					This.div.style.left = This.lastLeft+"px";
					This.div.style.top = This.lastTop+"px";
					This.div.getElementsByClassName("dialog_content_right")[0].style.width = This.lastWidth2+4+"px";
					This.div.style.transition = "1s";
					This.div.getElementsByClassName("dialog_content_right")[0].style.transition="1s"
					contentHeight.style.height = This.lastHeight+"px";
					contentHeight.style.transition = "1s"
					if(This.lastWidth<1150){
						$(".dialog_nav_right").hide();
					}
				}
				onoff = !onoff;
				
				var timer2 = setTimeout(function(){
					This.div.style.transition = null;
					This.div.getElementsByClassName("dialog_content_right")[0].style.transition=null;
					contentHeight.style.transition = null;
					
					scroll.call(This);
				},1000)
				
				ev.stopPropagation();
			})
			
			$(This.div).find(".dialog_head").dblclick(function(ev){
				clearTimeout("timer2")
				//为什么onoff永远是false~~~~
				if(!onoff){
					//第一次没有transition效果~~~~~~
					var numHeight = This.dHeight() - 168;
					var numWidth = This.dWidth()-260;
					$(".max span").addClass("max_span")
					This.div.style.width = This.dWidth()+"px";
					This.div.style.left = 0;
					This.div.style.top = 0;
					This.div.getElementsByClassName("dialog_content_right")[0].style.width = numWidth+"px";
					This.div.style.transition = "1s";
					This.div.getElementsByClassName("dialog_content_right")[0].style.transition="1s"
					contentHeight.style.height = numHeight+"px";
					contentHeight.style.transition = "1s";
					setTimeout(function(){
						$(".dialog_nav_right").show();
					},500)
				}else{
					$(".max span").removeClass("max_span")
					This.div.style.width = This.lastWidth+"px";
					This.div.style.left = This.lastLeft+"px";
					This.div.style.top = This.lastTop+"px";
					This.div.getElementsByClassName("dialog_content_right")[0].style.width = This.lastWidth2+4+"px";
					This.div.style.transition = "1s";
					This.div.getElementsByClassName("dialog_content_right")[0].style.transition="1s"
					contentHeight.style.height = This.lastHeight+"px";
					contentHeight.style.transition = "1s"
					if(This.lastWidth<1150){
						$(".dialog_nav_right").hide();
					}
				}
				onoff = !onoff;
				
				var timer2 = setTimeout(function(){
					This.div.style.transition = null;
					This.div.getElementsByClassName("dialog_content_right")[0].style.transition=null;
					contentHeight.style.transition = null;
					
					scroll.call(This);
				},1000)
				
				ev.stopPropagation();
			})
			
			//-------------------------------------最小化---------------------------------------------------
			this.oMin = $(this.div).find(".min");
			$(".min_computed").hover(function(){
				$(".min_tankuang").show();
			},function(){
				$(".min_tankuang").hide();
			})
			this.oMin.click(function(){
				$(This.div).hide();
			})
			this.oMin.mousedown(function(ev){
				ev.stopPropagation();
			})
			//--------------------------------拖拽改变弹框的大小------------------------------------
			var dir = "";
			var changeCursor = true;//是否可以改变鼠标指针
			$(".dialog_wrap").mousemove(function(e){
				if($(This2.div).find(".max span").hasClass("max_span")) return;
				if(!changeCursor){
					return
				}
				dir = "";
				this.style.cursor = "default";
				var pos = this.getBoundingClientRect();
				if( e.clientY< pos.top+10 ){
					dir += "n";
				}
				if( e.clientY> pos.bottom-10 ){
					dir += "s";
				}
				if( e.clientX< pos.left+10){//移到的是左侧部分
					dir += "w";
				}
				if( e.clientX> pos.right-10 ){
					dir += "e";
				}
				this.style.cursor = dir+"-resize";
			})
			$(".dialog_wrap").mousedown(function(e){
				if($(This2.div).find(".max span").hasClass("max_span")) return;
				var This = this;
				var oContent = this.getElementsByClassName("dialog_content")[0]
				var oContent_R = this.getElementsByClassName("dialog_content_right")[0]
				changeCursor = false;
				var oriX = e.clientX;
				var oriY = e.clientY;
				var oriW = oContent_R.offsetWidth;
				var oriH = oContent.offsetHeight;
				var oriW2 = this.offsetWidth;
				var oriL = this.offsetLeft;
				var oriT = this.offsetTop;
				$(window).mousemove(function(e){
					var minW1 = e.clientX - oriX + oriW2-4
					var minCW1 = e.clientX - oriX + oriW-20
					if(minW1<825){
						minW1 = 825;
						minCW1 = 565;
					}
					if( dir.indexOf("e")!=-1 ){
						oContent_R.style.width = minCW1 + "px";
						This.style.width = minW1  + "px";
						changesty()
					}
					if( dir.indexOf("s")!=-1 ){
						oContent.style.height = e.clientY - oriY + oriH + "px";
						changesty()
					}
					var minW2 = oriX - e.clientX  + oriW2 - 4
					var minCW2 = oriX - e.clientX + oriW-20;
					var numClient = e.clientX - (oriX-oriL)
					if(minW2<825){
						minW2 = 825;
						minCW2 = 565;
						numClient = This.offsetLeft
					}
					if( dir.indexOf("w")!=-1 ){
						oContent_R.style.width = minCW2  + "px";
						This.style.width = minW2 + "px";
						This.style.left = numClient + "px";
						changesty()
					}
					if( dir.indexOf("n")!=-1 ){
						oContent.style.height = oriY - e.clientY + oriH + "px";
						This.style.top = e.clientY - (oriY-oriT) + "px";
						changesty()
					}
					function changesty(){
						if(This.offsetWidth<1150){
							$(".dialog_nav_right").hide();
						}else{
							$(".dialog_nav_right").show();
						}
						//此处scroll中的this要指向实例,而不是按下时的dialog_wrap;
						scroll.call(This2);
						//保存拉伸后的值
						var contentHeight = This2.div.getElementsByClassName("dialog_content")[0]
						var contentRight = This2.div.getElementsByClassName("dialog_right")[0]
						var pos0 = This2.div.getBoundingClientRect()
						This2.lastLeft = pos0.left;
						This2.lastTop = pos0.top;
						This2.lastWidth = This2.div.offsetWidth;
						This2.lastWidth2 = contentRight.offsetWidth;
						This2.lastHeight = contentHeight.offsetHeight;
					}
				})
				$(window).mouseup(function(){
					$(window).off("mousemove");
					$(window).off("mouseup");
					changeCursor = true;
				})
			});
			
			
			(function(){
				//点击搜索框时,让搜索框获得焦点
				$(This.div).find(".dialog_nav_fond").click(function(){
					$(this).focus()
				})
				//点击导航时,让输入框展示出来
				var off = true;
				$(This.div).find(".dialog_center_font").click(function(ev){
					var str = "";
					ev.stopPropagation()
					$(This.div).find(".bread_nav").hide();
					var aDialog_nav_font = This.div.getElementsByClassName("dialog_nav_font")
					for(var i=0;i<aDialog_nav_font.length;i++){
						if(i==aDialog_nav_font.length-1){
							str+=aDialog_nav_font[i].innerHTML
						}else{
							str+=aDialog_nav_font[i].innerHTML+"/"
						}
					}
					$(".dialog_nav_input").val(str)
					$(".dialog_nav_input").show();
					$(".dialog_nav_input").focus()
					off = false;
				})
				//点击弹框时,让input失去焦点
				$(".dialog_wrap").click(function(){
					$("input").blur();
				})
				//失去焦点时发生的事情
				$(".dialog_nav_input").blur(function(ev){
					if(!off){
						//因为每次点击弹框时都会触发dialog_nav_input的失去焦点的函数,所以需要加一个开关判断一下;
						$(".dialog_nav_input").hide();
						var arr = $(".dialog_nav_input").val().split("/");
						var obj = data.myComputed.find((item)=>item.title === arr[arr.length-1]);
						var oBread_nav = This2.div.getElementsByClassName("bread_nav")[0];
						if(obj){
							var num = obj.id
							oBread_nav.innerHTML = html.createNav(data.myComputed,num)
						}
						$(".dialog_nav_input").val("")
						$(".bread_nav").show();
						off = true;
					}
				})
			})()
			
			//---------------------------点击选中------------------------------------------------------
			//用事件代理写
			$(".dialog_content_right").delegate("li","click",function(ev){
				$(".dialog_right li").removeClass("dialog_active");
				$(this).addClass("dialog_active");
				$(".delet_menu").hide();
				$("#li_menu2").hide();
			})
			$(".dialog_right li").hover(function(){
				$(this).addClass("dialog_hover");
			},function(){
				$(this).removeClass("dialog_hover");
			})
			
			//点击其他地方时去掉选中效果
			$(".dialog_right").mousedown(function(ev){
				if(ev.button == 2) return;
				$(".dialog_content_right li").removeClass("dialog_active")
				$("#li_menu2").hide();
			});
			
			//-----------------------------框选------------------------------------------
			$(this.div).find(".dialog_right").mousedown(function(ev){
				//点在h3上说明不是进行框选
				if(ev.target.nodeName.toLowerCase() === 'li') return;
				var pos = this.getBoundingClientRect();
				//右边放大缩小时不要画框
				if(ev.clientX> pos.right-10 ||ev.clientY> pos.bottom-10 ) return;
				//鼠标按下时生成div
				var newDiv2 = $("<div></div>");
				newDiv2.addClass("check")
				var disX = ev.pageX;
				var disY = ev.pageY;
				var oriX = $(this).parents(".dialog_wrap").position().left
				var oriY = $(this).parents(".dialog_wrap").position().top
				$(this).parents(".dialog_wrap").append(newDiv2)
				$(window).mousemove(function(ev){
					if((Math.abs(ev.pageX-disX )<5 )|| (Math.abs(ev.pageY-disY)<5)) return;
					newDiv2.css({
						width:Math.abs(ev.pageX-disX),
						height:Math.abs(ev.pageY-disY),
						left:Math.min(ev.pageX-oriX,disX-oriX),
						top:Math.min(ev.pageY-oriY,disY-oriY)})
					
					arr4 = $(".dialog_right li").get().filter((item)=>{
						if(handle.peng(item,newDiv2[0])){
							$(item).addClass("dialog_active")
						}else{
							$(item).removeClass("dialog_active")
						}
						
						return handle.peng(item,newDiv2[0])
					})
					This.arr = $(".dialog_right li").get().filter(function(item){
						return $(item).hasClass("dialog_active")
					})
					
				})
				
				$(window).mouseup(function(ev){
					newDiv2.remove();
					$(window).off("mousemove");
					$(window).off("mouseup");
				})
			})
			
			$(".dialog_head").mousedown(function(ev){
				ev.stopPropagation();
			})
			
			//-------------------回收站中li的右键菜单-------------------
			var dialog_right = document.getElementsByClassName("dialog_right")[0];
			var dialog_sort_contentBottom3=This.div.getElementsByClassName("dialog_sort_contentBottom3")[0];
			if(dialog_right){
				$(This.div).find(".dialog_right").mousedown(function(ev){
					if(!dialog_sort_contentBottom3) return;
					$(".delet_menu").hide();
				})
				var leftCount = $(".dialog_right").position().left
				var topCount = $(".dialog_right").position().top
				if(dialog_sort_contentBottom3){
					//如果bl为true,点击还原一个元素
					This.bl = true 
					
					$(".dialog_right").delegate("li","mousedown",function(ev){
						if(ev.button === 0) return;
						if(This.arr.length){
							This.bl = This.arr.every((item)=> item !== this)
						}
						if(This.bl){
							$(".dialog_right li").removeClass("dialog_active");
							$(this).addClass("dialog_active")
							This.arr = [];
						}
						$(".delet_menu").css({
							left:ev.pageX,
							top:ev.pageY});
						$(".delet_menu").show();
						
						ev.stopPropagation();
					})
				}
			}
			//---------------------回收站的还原----------------------------
			$(".reserve")[0].onmousedown = function(ev){
				var oDialog_sort_contentBottom3 = This.div.getElementsByClassName("dialog_sort_contentBottom3")[0];
				var aLiDom = document.getElementsByClassName("content_li");
				//还原单个文件时
				if(This.bl){
					var index = $(This.div).find(".dialog_active").index();
					var obj = data.delet.splice(index,1);
					obj = obj[0];
					if(obj.pid === -2){
						//说明是桌面上的元素
						var num = data.files.findIndex((item)=>item.title === obj.title)
						if(num===-1){
							//说明桌面上没有重名
							var h = $(window).innerHeight()-40;
							var li_h =  $("#content li").eq(0).innerHeight();
							var m=0;
							var n=0;
							
							leftNum = 25+m*114;
							topNum = 35+n*124;
							for(var k=0;k<data.files.length;k++){
								var num = data.files.findIndex((item)=>item.left === leftNum && item.top === topNum)
								if(num!==-1){
									n++;
									if((35+n*124)>(h-li_h)){
										m++;
										n=0;
									}
									leftNum = 25+m*114;
									topNum = 35+n*124;
								}else{
									break;
								}
							}	
							obj.left = leftNum;
							obj.top = topNum;
							data.files.push(obj);
						}else{
							//说明桌面上有重名
							data.delet.splice(index,0,obj)
							alert("有重名,不能还原")
						}
					}else{
						//说明还原的是此电脑里的东西(单个)
						var myComputedArr = handle.getChildsById(data.myComputed,obj.pid)
						var num = myComputedArr.findIndex((item)=>item.title === obj.title)
						if(num===-1){
							//说名此电脑中没有重名
							data.myComputed.push(obj);
						}else{
							data.delet.splice(index,0,obj)
							console.log("有重名,不能还原")
						}
					}
					setTimeout(function(){
						$(aLiDom[aLiDom.length-1]).css({top:data.files[aLiDom.length-1].top,left:data.files[aLiDom.length-1].left})
					},10)
				}else{
					var arr = $(".dialog_sort_contentBottom3 .dialog_active").get()
					for(var i=0;i<arr.length;i++){
						var index = $(arr[i]).index();
						var obj = data.delet.splice(index-i,1);
						obj = obj[0];
						if(obj.pid === -2){
								//说明还原的是桌面上的东西(多个)
								var num = data.files.findIndex((item)=>item.title === obj.title)
								if(num===-1){
								var h = $(window).innerHeight()-40;
								var li_h =  $("#content li").eq(0).innerHeight();
								var m=0;
								var n=0;
								
								leftNum = 25+m*114;
								topNum = 35+n*124;
								for(var k=0;k<data.files.length;k++){
									var num = data.files.findIndex((item)=>item.left === leftNum && item.top === topNum)
									if(num!==-1){
										n++;
										if((35+n*124)>(h-li_h)){
											m++;
											n=0;
										}
										leftNum = 25+m*114;
										topNum = 35+n*124;
									}else{
										break;
									}
								}	
								obj.left = leftNum;
								obj.top = topNum;
								data.files.push(obj);
							}else{
								data.delet.splice(index,0,obj)
								alert("有重名,不能还原")
							}
						}else{
							//说名还原的是此电脑里的东西(多个)
							var myComputedArr = handle.getChildsById(data.myComputed,obj.pid)
							var num = myComputedArr.findIndex((item)=>item.title === obj.title)
							if(num===-1){
								data.myComputed.push(obj);
							}else{
								data.delet.splice(index,0,obj)
								alert("有重名,不能还原")
							}
						}
					}
					var numChange = data.files.length - arr.length
					setTimeout(function(){
						for(var i=numChange;i<data.files.length;i++){
							$(aLiDom[i]).css({top:data.files[i].top,left:data.files[i].left})
							$(aLiDom[i]).hover(function(){
								$(this).addClass("hover")
							},function(){
								$(this).removeClass("hover")	
							})
						}
					},10)
				}
				if(oDialog_sort_contentBottom3){
					oDialog_sort_contentBottom3.innerHTML = html.createDelet(data.delet);
				}
				var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
				for(var i=0;i<aDialog_wrap.length;i++){
					var oDialogSortContentBottom3 = aDialog_wrap[i].getElementsByClassName("dialog_sort_contentBottom3")[0];
					if(oDialogSortContentBottom3){
						continue
					}else if( aDialog_wrap[i].currentId == 0){
						continue
					}else{
						var numId = aDialog_wrap[i].currentId;
						var arr = handle.getChildsById(data.myComputed,numId)
						var str = html.createChilds(arr,numId);
						$(aDialog_wrap[i]).find(".dialog_right").html(str + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
						
					}
					
				}
				ev.stopPropagation()
			}
			$(".reserve").mouseup(function(){
				$(".delet_menu").hide();
			})
			//清除默认事件
			$(this.div).find(".dialog_wrap").mousedown(function(ev){
				ev.preventDefault();
			})
			$(".dialog_right").mousedown(function(ev){
				if(ev.button === 2){
					ev.stopPropagation();
				}
			})
			//关闭时清除还原的mousedown,避免再次打开弹窗时发生多次发生多次
			$(".cha").mouseup(function(){
				$(".reserve").off("mousedown");
			})
			This.InitId = 0;//点击的这个id;
			This.currentId = 0;//上一个id;
			This.div.currentId = This.currentId
			
			
			//------------------------点击C盘,D盘的时候发生的事情-----------------
			$(".dialog_sort_contentBottom3").dblclick(function(ev){
				ev.stopPropagation()
			})
			var str_nav = this.div.getElementsByClassName("dialog_center_font")[0]
			$(this.div).find(".dialog_right").delegate("li","dblclick",function(ev){
				var arr = handle.getChildsById(data.myComputed,this.dataset.id);
				var str_nav = "";
				var str = html.createChilds(arr,this.dataset.id);
				//修改content_right里面的内容
				$(This.div).find(".dialog_right").html(str + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
				//执行滚动条的判断和给li加hover事件
				scroll.call(This);
				$(".dialog_right li").hover(function(){
					$(this).addClass("dialog_hover");
				},function(){
					$(this).removeClass("dialog_hover");
				})
				This.InitId = this.dataset.id
				//修改nav里面的内容
				str_nav = html.createNav(data.myComputed,this.dataset.id)
				$(This.div).find(".bread_nav").html(str_nav)
				
				$(addBackground(This.currentId)).removeClass("h3_active");
				$(addBackground(This.InitId)).addClass("h3_active");
				This.currentId = This.InitId;
				This.div.currentId = This.currentId
			})
			//-------------------------h3选中----------------------------------
			//通过元素身上的id找到对应的h3；
			var tree = this.div.getElementsByClassName("tree")[0]
			var aH3 = tree.getElementsByTagName('h3');
			function addBackground(id){
				for(var i=0;i<aH3.length;i++){
					var dateId = aH3[i].dataset.id;
					if(dateId == id){
						return aH3[i];
					}
				}
			}
			
			//------------------------h3点击------------------------------------
			$(this.div).find(".dialog_conmput").delegate("h3","click",function(){
				if($(this).hasClass("the_computed")) return;
				This.InitId = this.dataset.id
				var arr = handle.getChildsById(data.myComputed,this.dataset.id);
				var str = html.createChilds(arr,this.dataset.id);
				//修改content_right里面的内容
				$(This.div).find(".dialog_right").html(str + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
				
				str_nav = html.createNav(data.myComputed,this.dataset.id)
				$(This.div).find(".bread_nav").html(str_nav)
				
				$(addBackground(This.currentId)).removeClass("h3_active");
				$(addBackground(This.InitId)).addClass("h3_active");
				This.currentId = This.InitId;
				This.div.currentId = This.currentId
			})
			//点击此电脑时发生的变化;
			$(This.div).find(".the_computed").click(function(){
				$(This.div).find(".dialog_right").html(`
					${This.defaults.content}
					<div class="dialog_scroll_wrap2">
						<div class="scroll_inner2"></div>
					</div>
				`)
				This.InitId = this.dataset.id
				var oDialog_sort = This.div.getElementsByClassName("dialog_sort_contentTop")[0];
				if(!oDialog_sort){
					$(".dialog_sort_contentBottom3").remove();
					$(This.div).find(".dialog_right").html(`
						<header class="dialog_sort_contentHead">
							<span></span>
							<h3 class="file_title">文件夹</h3>
							<div class="line"></div>
						</header>
						<ul class="dialog_sort_contentTop clearfix">
							<!--<li>
								<h3>
									<span class="dialog_shipin"></span>
									视频
								</h3>
							</li>-->
						</ul>
						<div class="dialog_sort_contentBottom">
							<span></span>
							<h3 class="file_title">设备和驱动器</h3>
							<div class="line2"></div>
						</div>
						<ul class="dialog_sort_contentBottom2 clearfix">
							<!--<li>
								<span class="dialog_C"></span>
								<div class="contentBottom2_right">
									<div>本地磁盘(C;)</div>
									<div>
										<div class="jindu"></div>
									</div>
									<div>
										<span>90.5</span>GB可用，共<span>118</span>GB
									</div>
								</div>
							</li>-->
						</ul>
					`)
					var oDialog_sort = This.div.getElementsByClassName("dialog_sort_contentTop")[0];
					oDialog_sort.innerHTML=html.createSortHtml(data.myComputed);
				}else{
					oDialog_sort.innerHTML=html.createSortHtml(data.myComputed);
				}
				
				
				var oDialog_sort2 = This.div.getElementsByClassName("dialog_sort_contentBottom2")[0];
				
				oDialog_sort2.innerHTML=html.createComputHtml(data.myComputed);
				
				//修改nav里面的内容
				str_nav = html.createNav(data.myComputed,this.dataset.id)
				$(This.div).find(".bread_nav").html(str_nav)
				
				//进度条
				var aJindu = This.div.getElementsByClassName("jindu");
				var oContentBottom2_right = This.div.getElementsByClassName("contentBottom2_right")[0]
				var oDiv = oContentBottom2_right.getElementsByTagName("div")[0];
				//找到对应的数组，根据数组中数据的多少改变jindu的宽度
				var arr = data.myComputed.filter((item)=> item.isTop == false)
				for(var i=0;i<aJindu.length;i++){
					aJindu[i].style.width = arr[i].now/arr[i].common*oDiv.offsetWidth + "px";
				}
				
				$(addBackground(This.currentId)).removeClass("h3_active");
				$(addBackground(This.InitId)).addClass("h3_active");
				
				
				This.currentId = this.dataset.id;
				This.div.currentId = This.currentId
			})
			
			//----------------------------面包屑导航的点击----------------------------------------
			$(this.div).find(".bread_nav").delegate("div","click",function(ev){
				var str = $(this).text();
				if($(".dialog_sort_contentBottom3")[0]) return;
				if(str==="此电脑"){
					$(".dialog_sort_contentBottom3").remove();
					$(This.div).find(".dialog_right").html(`
						<header class="dialog_sort_contentHead">
							<span></span>
							<h3 class="file_title">文件夹</h3>
							<div class="line"></div>
						</header>
						<ul class="dialog_sort_contentTop clearfix">
							<!--<li>
								<h3>
									<span class="dialog_shipin"></span>
									视频
								</h3>
							</li>-->
						</ul>
						<div class="dialog_sort_contentBottom">
							<span></span>
							<h3 class="file_title">设备和驱动器</h3>
							<div class="line2"></div>
						</div>
						<ul class="dialog_sort_contentBottom2 clearfix">
							<!--<li>
								<span class="dialog_C"></span>
								<div class="contentBottom2_right">
									<div>本地磁盘(C;)</div>
									<div>
										<div class="jindu"></div>
									</div>
									<div>
										<span>90.5</span>GB可用，共<span>118</span>GB
									</div>
								</div>
							</li>-->
						</ul>
					`)
					This.InitId = this.dataset.id
					var oDialog_sort = This.div.getElementsByClassName("dialog_sort_contentTop")[0];
					oDialog_sort.innerHTML=html.createSortHtml(data.myComputed);
					
					var oDialog_sort2 = This.div.getElementsByClassName("dialog_sort_contentBottom2")[0];
					oDialog_sort2.innerHTML=html.createComputHtml(data.myComputed);
					
					//修改nav里面的内容
					str_nav = html.createNav(data.myComputed,this.dataset.id)
					$(This.div).find(".bread_nav").html(str_nav)
					
					//进度条
					var aJindu = This.div.getElementsByClassName("jindu");
					var oContentBottom2_right = This.div.getElementsByClassName("contentBottom2_right")[0]
					var oDiv = oContentBottom2_right.getElementsByTagName("div")[0];
					//找到对应的数组，根据数组中数据的多少改变jindu的宽度
					var arr = data.myComputed.filter((item)=> item.isTop == false)
					for(var i=0;i<aJindu.length;i++){
						aJindu[i].style.width = arr[i].now/arr[i].common*oDiv.offsetWidth + "px";
					}
					
					$(addBackground(This.currentId)).removeClass("h3_active");
					$(addBackground(This.InitId)).addClass("h3_active");
					
					This.currentId = this.dataset.id;
					This.div.currentId = This.currentId
				}else{
					This.InitId = this.dataset.id
					var arr = handle.getChildsById(data.myComputed,this.dataset.id);
					var str = html.createChilds(arr,this.dataset.id);
					//修改content_right里面的内容
					$(This.div).find(".dialog_right").html(str + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
					
					str_nav = html.createNav(data.myComputed,this.dataset.id)
					$(This.div).find(".bread_nav").html(str_nav)
					
					$(addBackground(This.currentId)).removeClass("h3_active");
					$(addBackground(This.InitId)).addClass("h3_active");
					This.currentId = This.InitId;
					
					This.currentId = this.dataset.id;
					This.div.currentId = This.currentId
				}
				ev.stopPropagation();
			})
			
			//----------------------c盘d盘里的删除----------------------------
//			用childs_ul的是否存在做判断
			$(This.div).find(".dialog_right").mousedown(function(ev){
				ev.preventDefault();
				if(!$(This.div).find(".childs_ul")[0]) return;
				if(ev.button === 0) return;
			})
			$(this.div).find(".dialog_right").delegate("li","mousedown",function(ev){
				ev.stopPropagation()
				if(!$(This.div).find(".childs_ul")[0]) return;
				if(ev.button === 0) return;
				bl = arr4.every((item)=> item !== this)//判断arr4里面是否都和当前点击的this不相等,此时返回true
				if(bl){
					$(".childs_li").removeClass("dialog_active")
					$(this).addClass("dialog_active")
					arr4 = [];
				}
				$("#li_menu2").css({
					left:ev.pageX,
					top:ev.pageY
				})
				$("#li_menu2").show();
				$("#menu").hide();
			})
			$(This.div).find(".dialog_right").mousedown(function(ev){
				if(!$(This.div).find(".childs_ul")[0]) return;
				if(ev.button === 0){
					$("#menu").hide();
					$("#li_menu2").hide();
					return
				};
				commonObj.isDoc = false;
				$("#menu").css({left:ev.pageX,top:ev.pageY,zIndex:999})
				$("#menu").show();
				$("#li_menu2").hide();
				ev.stopPropagation();
			})
			
			
			
			
			//--------------------------------------删除---------------------------------------------
			
			$("#delet2")[0].onclick = function(ev){
				//如果bl为true,点击删除一个元素
				var arrDelet = $(".dialog_active").get().map((item)=>item.dataset.id)
				var arrCommon = data.myComputed;
				var arrDeleted = [];
				for(var i=0;i<arrDelet.length;i++){
					arrCommon = arrCommon.filter((item)=>item.id != arrDelet[i])
					arrDeleted.push(data.myComputed.filter((item)=>item.id == arrDelet[i])[0]);
				}
				//往回收站里添加
				for(var i=0;i<arrDeleted.length;i++){
					data.delet.push(arrDeleted[i])
				}
				//dom节点也应该发生变化
				data.myComputed = arrCommon;
				var aDialog = document.getElementsByClassName("dialog_conmput");
				for(var i=0;i<aDialog.length;i++){
					aDialog[i].innerHTML = '<h3 class="the_computed" data-id="0"><span class="dialog_mycomputer"></span>此电脑</h3>'
					aDialog[i].innerHTML += html.createMyComputedHtml(data.myComputed,0);
				}
				var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
				//重新渲染content_right里面的内容
				for(var i=0;i<aDialog_wrap.length;i++){
					if(aDialog_wrap[i].currentId === 0){
						continue;
					}
					var arr = handle.getChildsById(data.myComputed,aDialog_wrap[i].currentId);
					var str = html.createChilds(arr,aDialog_wrap[i].currentId);
					$(aDialog_wrap[i]).find(".dialog_right").html(str + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
				}
				//使右键菜单消失
				$("#li_menu2").hide();
			}
			
			//-----------最大化的时候拖拽会生成一个小框,鼠标抬起时改变当前dialog的位置-------------
			$(this.div).find(".dialog_head").mousedown(function(ev){
				if(!$(This.div).find(".max span").hasClass("max_span")){
					return;
				}
				var disX = ev.clientX;
				var disY = ev.clientY;
				var oKuang = document.createElement("div");
				oKuang.className = "kuang";
				oKuang.style.width = This.lastWidth+"px";
				oKuang.style.height = This.lastHeight+"px"
				oKuang.style.left = (ev.clientX - This.lastWidth/2) +"px";
				oKuang.style.top = 0 + "px";
				$(window).mousemove(function(ev){
					if((ev.clientX-disX)<5&&(ev.clientY-disY)<5){
						return
					}
					document.getElementsByTagName("body")[0].appendChild(oKuang);
					oKuang.style.left = (ev.clientX - This.lastWidth/2) +"px";
					oKuang.style.top = (ev.clientY - disY) + "px";
				})
				$(window).mouseup(function(ev){
					if((ev.clientX-disX)<5&&(ev.clientY-disY)<5){
						$(window).off("mousemove")
						$(window).off("mouseup")
						return;
					}
					This.lastLeft = oKuang.offsetLeft;
					This.lastTop = oKuang.offsetTop;
					This.div.style.width = This.lastWidth+"px";
					This.div.style.left = This.lastLeft+"px";
					This.div.style.top = This.lastTop+"px";
					This.div.getElementsByClassName("dialog_content_right")[0].style.width = This.lastWidth2+4+"px";
					contentHeight.style.height = This.lastHeight+"px";
					document.getElementsByTagName("body")[0].removeChild(oKuang);
					$(This.div).find(".max span").removeClass("max_span")
					onoff = false;
					$(window).off("mousemove")
					$(window).off("mouseup")
				})
			})
			
			
			//----------------------点击弹框增加层级---------------------------------------
			handle.zIndexFn(This.div);
			
			
			//-----------------------------C盘D盘中的拖拽---------------------------------------
			$(this.div).find(".dialog_right").delegate("li","mousedown",function(ev){
				var oChilds_ul = This.div.getElementsByClassName("childs_ul")[0];
				if(!oChilds_ul) return;
				if(ev.button === 2) return;
				if(!$(this).hasClass("dialog_active")){
					$(".dialog_right li").removeClass("dialog_active");
					$(this).addClass("dialog_active");
					$("inpput").blur();
				}
				$(".delet_menu").hide();
				$("#li_menu2").hide();
				var aDialogLi = $(".dialog_right li");
				var arr = [];//保存要移动的元素
				var arr2 = [];
				var arr_index = [];
				
				for(var i=0;i<aDialogLi.get().length;i++){
					if($(This.div).find(".dialog_right li").eq(i).hasClass("dialog_active")){
						This.div.style.zIndex = ++commonObj.max;
						arr_index.push(i);
						arr.push($(This.div).find(".dialog_right li")[i]);
						$(This.div).find(".dialog_right li")[i].disX = $(This.div).find(".dialog_right li")[i].getBoundingClientRect().left - ev.clientX;
						$(This.div).find(".dialog_right li")[i].disY =$(This.div).find(".dialog_right li")[i].getBoundingClientRect().top - ev.clientY;
						var disX = ev.pageX;
						var disY = ev.pageY;
						var copy = $(This.div).find(".dialog_right li")[i].cloneNode( true );
						copy.style.opacity = 0.3;
						copy.style.zIndex = 999;
						copy.style.position = "absolute";
						copy.style.left = $(This.div).find(".dialog_right li")[i].getBoundingClientRect().left+4+"px"
						copy.style.top =  $(This.div).find(".dialog_right li")[i].getBoundingClientRect().top+8+"px"
						copy.style.float = null;
						arr2.push(copy)
					}
				}
				$(window).mousemove(function(ev){
					if(Math.abs(ev.clientX - disX)<5 && Math.abs(ev.clientY - disY<5)) return;
					for(var i=0;i<arr2.length;i++){
						document.getElementById("content").appendChild( arr2[i] );
					}
					for(var i=0;i<arr.length;i++){
						arr2[i].style.left = ev.clientX + arr[i].disX + "px";
						arr2[i].style.top = ev.clientY + arr[i].disY + "px"; 
					}
				})
				$(window).mouseup(function(ev){
					if(Math.abs(ev.clientX - disX)<5 && Math.abs(ev.clientY - disY<5)){
						$(window).off("mousemove")
						$(window).off("mouseup")
						return;
					}
					if(ev.clientX>This.div.getBoundingClientRect().left && ev.clientX<This.div.getBoundingClientRect().right && ev.clientY>This.div.getBoundingClientRect().top && ev.clientY<This.div.getBoundingClientRect().bottom){
						var aChildsLi = This.div.getElementsByClassName("childs_li");
						for(var i=0;i<aChildsLi.length;i++){
							if(!$(aChildsLi[i]).hasClass("dialog_active")){
								if(ev.clientX>aChildsLi[i].getBoundingClientRect().left && ev.clientX<aChildsLi[i].getBoundingClientRect().right && ev.clientY>aChildsLi[i].getBoundingClientRect().top && ev.clientY<aChildsLi[i].getBoundingClientRect().bottom){
									for(var j=0;j<arr2.length;j++){
										var obj = data.myComputed.find((item)=>{
											return item.id == arr2[j].dataset.id
										})
										obj.pid = aChildsLi[i].dataset.id
										
									}
								}
							}
						}
						removeHtml();
						
						for(var i=0;i<arr2.length;i++){
							document.getElementById("content").removeChild( arr2[i] );
						}
						$(window).off("mousemove")
						$(window).off("mouseup")
						return;
					};
					
					var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
					for(var i=0;i<aDialog_wrap.length;i++){
						if(aDialog_wrap[i] === This.div){
							continue;
						}
						if(aDialog_wrap[i].display === "none"){
							continue;
						}
						var oChilds_ul = aDialog_wrap[i].getElementsByClassName("childs_ul")[0];
						if(!oChilds_ul){
							continue;
						}
						
						var aDialog_right = document.getElementsByClassName("dialog_right");
						var oDialog_right = aDialog_wrap[i].getElementsByClassName("dialog_right")[0];
						var oDialog_right_li = aDialog_wrap[i].getElementsByClassName("childs_li")[0];

						
						commonObj.commonCurrentId = aDialog_wrap[i].currentId
						if(ev.clientX>oDialog_right.getBoundingClientRect().left && ev.clientX<oDialog_right.getBoundingClientRect().right && ev.clientY>oDialog_right.getBoundingClientRect().top && ev.clientY<oDialog_right.getBoundingClientRect().bottom){
							for(var j=0;j<arr2.length;j++){
								var obj = data.myComputed.find((item)=>{
									return item.id == arr2[j].dataset.id
								})
								obj.pid = aDialog_wrap[i].currentId
							}
						}
						
						//重新渲染树形菜单的结构
						var aDialog = document.getElementsByClassName("dialog_conmput");
						for(var j=0;j<aDialog.length;j++){
							aDialog[j].innerHTML = '<h3 class="the_computed" data-id="0"><span class="dialog_mycomputer"></span>此电脑</h3>'
							aDialog[j].innerHTML += html.createMyComputedHtml(data.myComputed,0);
						}
						
						//重新渲染content_right里面的内容
						aDialog_wrap[i].style.zIndex = ++commonObj.max;
						//修改公共变量(这个地方其实用aDialog_wrap[i]的自定义属性也可以,就是讲目录id存起来)
						var numId = commonObj.commonCurrentId
						var arr = handle.getChildsById(data.myComputed,numId)
						var str = html.createChilds(arr,numId);
						$(oDialog_right).html(str + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
						var arrThis = handle.getChildsById(data.myComputed,This.currentId)
						var strThis = html.createChilds(arrThis,This.currentId);
						$(This.div).find(".dialog_right").html(strThis + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
						
					}
					for(var i=0;i<arr2.length;i++){
						document.getElementById("content").removeChild( arr2[i] );
					}
					$(window).off("mousemove")
					$(window).off("mouseup")
				})
				
				ev.preventDefault();
			});
			
			//-------------------------------新建文件夹-----------------------------------------
			
			$(".menu_ul:nth-of-type(4) .sort_menu div:first").click(function(){
				if(commonObj.isDoc) return;
				$("#menu").hide();
				var arr = handle.getChildsById(data.myComputed,This.currentId)
				var n = n===0 ? "" : n
				var str = "新建文件夹" + n
				for(var i=0 ;i < arr.length;i++){
					var n = i===0 ? "" : i
					var str = "新建文件夹" + n
					var num = arr.findIndex((item)=>item.title === str);
					//如果num === -1,说明没有重名,可以用
					if(num === -1){
						break;
					}
				}
				
				
				
				var oChildsUl = This.div.getElementsByClassName("childs_ul")[0]
				var oLi = document.createElement("li");
				oLi.className="childs_li";
				oLi.innerHTML = '<div class="file"></div><input style="display:block" type="text" class="text" value = "'+str+'"></li>';
				var oText = oLi.getElementsByClassName("text")[0]
				setTimeout(function(){
					oText.select();
				},0)
				oChildsUl.appendChild(oLi);
				
				
				oText.onblur = function(){
					data.myComputed.push({
						id:Math.random(),
						title:str,
						type:"file",
						pid:This.currentId,
						isTop:true
					})	
					removeHtml();
					scroll.call(This);
				}
			})
			
			function removeHtml(){
				var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
				for(var i=0;i<aDialog_wrap.length;i++){
					//重新渲染树形菜单的结构
					var aDialog = document.getElementsByClassName("dialog_conmput");
					for(var j=0;j<aDialog.length;j++){
						aDialog[j].innerHTML = '<h3 class="the_computed" data-id="0"><span class="dialog_mycomputer"></span>此电脑</h3>'
						aDialog[j].innerHTML += html.createMyComputedHtml(data.myComputed,0);
					}
					
					//重新渲染contentright里面的值
					var arrThis = handle.getChildsById(data.myComputed,This.currentId)
					var strThis = html.createChilds(arrThis,This.currentId);
					$(This.div).find(".dialog_right").html(strThis + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
				}
			}
		}
	}