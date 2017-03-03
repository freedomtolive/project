(function(){
	//日期
	var t = new Date();
	var strWeek = "";
	
	handle.time();
	setInterval(handle.time(),1000)
	
	var oHua = document.getElementsByClassName("huakuai")[0]
	var disX = null;
	var onOff = false;
	var isDrag = false;
	
	cssTransform($(".view")[0], "scale", 0)
//	cssTransform($(".photoView")[0],"scale",0)
	
	//--------------阻止默认事件-------------------------
	document.addEventListener('touchstart',function(ev){
		ev.preventDefault();
	},false);
	
	//--------------------------拖拽解锁------------------------------
	$(".huakuai")[0].addEventListener('touchstart',start,false);
	document.addEventListener('touchmove',move,false);
	document.addEventListener('touchend',end,false);
	function start(ev){
		var e = ev.changedTouches[0];
		disX = e.pageX - this.offsetLeft;
		onOff = true;
		ev.stopPropagation();
		ev.preventDefault();
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
			MTween({
				el: $(".startView")[0],
				time: 400,
				target: {
					scale: 0
				},
				type: "easeOut"
			});
			MTween({
				el: $(".view")[0],
				time: 400,
				target: {
					scale:100
				},
				type: "easeOut"
			});
		}
		onOff = false
	}
	
	//-----------------------------VR---------------------------
	$(".vr").on("touchstart",function(){
		var vrContent = document.createElement("div");
			$(vrContent).addClass("vr-content");
			vrContent.innerHTML = `
				<div class="bg"></div>
				<div class="logo1">
					<div class="logoImg">
						<img src="../img/load/logo.png">
					</div>
					<p class="logoText">已加载 <span>0</span>%</p>
				</div>
				<div class="main">
					<div class="transZ">
						<div class="cloud"></div>
						<div class="panoBg"></div>
						<div class="pano"></div>
					</div>
				</div>
				<div class="btn">< 返回</div>		
			`
			document.getElementsByTagName("body")[0].appendChild(vrContent);
//			$("#section")[0].style.display = "none";
			cssTransform($(".vr-content")[0], "scale", 0)
		MTween({
			el: $(".vr-content")[0],
			time: 400,
			target: {
				scale: 100
			},
			type: "easeOut",
			callBack:function(){
				loading();
				returned();
			}
		});
	})
	
	function loading(){
		var arrImg = [];
		var num = 0;
		for(var attr in imgMenu){
			arrImg = arrImg.concat(imgMenu[attr])
		}
		//图片预加载
		for(var i=0;i<arrImg.length;i++){
			var img = new Image();
			img.src = arrImg[i];
			//在图片加载完成时执行的函数
			img.onload = function(){
				num++;
				$(".logoText span").text(Math.floor(num/arrImg.length*100))
				if(num == arrImg.length){
					//图片加载完成时要做的事情
					animit()
				}
			}
			
		}
	}
	
	function animit(){
		//让图片消失，并且让第一张图片出现，
//		(为了保证每个loding图片的旋转是一致的,因此需要同时生成图片,但是只让第一张图片出现)
		var vrContent = document.getElementsByClassName("vr-content")[0];
		var oLogo1 = document.getElementsByClassName("logo1")[0];
		var oLogo2 = document.createElement("div")
		var oLogo3 = document.createElement("div")
		oLogo2.className = oLogo3.className = "logoImg";
		$(oLogo2).addClass("logo2");
		$(oLogo3).addClass("logo3");
		var oImg = new Image();
		var oImg2 = new Image();
		oImg.src = imgMenu.logo[0]
		oImg2.src = imgMenu.logo[1]
		oLogo2.appendChild(oImg);
		oLogo3.appendChild(oImg2);
		css(oLogo2,"opacity",0);
		css(oLogo3,"opacity",0);
		css(oLogo2,"translateZ",-1000);
		css(oLogo3,"translateZ",-1000);	
		vrContent.appendChild(oLogo2);
		vrContent.appendChild(oLogo3);
		
		//让loding页面消失，并且让logo2出来,给logo2一个运动
		MTween({
			el: oLogo1,
			time: 200,
			target: {
				opacity:0
			},
			type: "easeOut",
			callBack:function(){
				vrContent.removeChild(oLogo1);
				css(oLogo2,"opacity",100);
				MTween({
					el: oLogo2,
					time: 600,
					target: {
						translateZ:0
					},
					type: "easeBoth",
					callBack:animit2()
				})
			}
		});
	}
	
	function animit2(){
		//让Logo2回去，消失，并让logo3显示出来
		var vrContent = document.getElementsByClassName("vr-content")[0];
		var oLogo2 = document.getElementsByClassName("logo2")[0];
		var oLogo3 = document.getElementsByClassName("logo3")[0];
		setTimeout(function(){
			MTween({
				el:oLogo2,
				time: 200,
				target: {
					translateZ:-1000
				},
				type: "linear",
				callBack:function(){
					vrContent.removeChild(oLogo2);
					css(oLogo3,"opacity",100);
					setTimeout(function(){
						MTween({
							el: oLogo3,
							time: 300,
							target: {
								translateZ:0
							},
							type: "easeBoth",
							callBack:animit3()
						})
					},300)
				}
				
			})
		},2000)
	}
	
	function animit3(){
		var vrContent = document.getElementsByClassName("vr-content")[0];
		var oLogo3 = document.getElementsByClassName("logo3")[0];
		setTimeout(function(){
			MTween({
				el: oLogo3,
				target: {
					translateZ:-2000
				},
				time: 800,
				type: "easeIn",
				callBack:function(){
					vrContent.removeChild(oLogo3);
					//添加爆炸效果
					animit4();
				}
			})
		},2000)
	}
	
	function animit4(){
		var vrContent = document.getElementsByClassName("vr-content")[0];
		var oLogo4 = document.createElement("div")
		//logoIcos为中心点
		var logoIcos = document.createElement("div");
		$(logoIcos).addClass("logoIcos")
		var iconsLength = 27;
		var oLogo4Image = new Image();
		oLogo4Image.src = imgMenu.logo[2];
		$(oLogo4Image).addClass("oLogo4Image")
		$(oLogo4).addClass("logo4")
		css(oLogo4,"translateZ",-2000);
		for(var i=0;i<iconsLength;i++){
			var span = document.createElement("span")
			//y轴z轴位移，角度随机生成
			var xR = 50+Math.round(Math.random()*200);
			var xDeg = Math.round(Math.random()*360);
			var yR = 50+Math.round(Math.random()*100);
			var yDeg = Math.round(Math.random()*360);
			
//			x轴的角度,x轴的半径
			css(span,"rotateY",xDeg);
			css(span,"translateZ",xR);
//			y轴的角度,y轴的半径
			css(span,"rotateX",yDeg);
			css(span,"translateY",yR);
			
			span.style.background = "url("+ imgMenu.logoIco[(i%imgMenu.logoIco.length)] +")"
			logoIcos.appendChild(span);
		}
		oLogo4.appendChild(logoIcos)
		oLogo4.appendChild(oLogo4Image)
		vrContent.appendChild(oLogo4)
		MTween({
			el: oLogo4,
			target: {translateZ: 0},
			time: 800,
			type: "easeOutStrong",
			callBack:function(){
				setTimeout(function(){
					MTween({
						el: oLogo4,
						target: {translateZ: -1000,scale:20},
						time: 1000,
						type: "linear",
						callBack: function(){
							vrContent.removeChild(oLogo4);
							animit5();
						}
					});
				},300);
			}
		});
	}
	
	function animit5(){
		var transZ = document.getElementsByClassName("transZ")[0];
		css(transZ,"translateZ",-2000);
		//出场动画
		animit6();
		animit7();
		creatPano();
		setPerc();
		
		MTween({
			el:transZ,
			target: {translateZ:-160},
			time:3600,
			type: "easeBoth"
		})
	}
	
	function animit6(){
//		云彩出场
		var transZ = document.getElementsByClassName("transZ")[0];
		var cloud = document.getElementsByClassName("cloud")[0];
		var num = 9 //云彩的数量
		for(var i=0;i<num;i++){
			var span = document.createElement("span")
			span.style.background = "url("+imgMenu.clound[i%3]+")"
			var R = 350+(Math.random()*150);//设置半径
			var deg = (360/num)*i;
			var X = Math.sin(deg*Math.PI/180)*R
			var Z = Math.cos(deg*Math.PI/180)*R
			var Y = (Math.random()-.5)*200
			
			
			css(span,"translateX",X)
			css(span,"translateZ",Z)
			css(span,"translateY",Y)
			
			cloud.appendChild(span)
			span.style.display = "none";
		}
		//让云彩一个个的出来
		var num = 0;
		var timer = setInterval(function(){
			cloud.children[num].style.display = "block";
			num++;
			if(num>=cloud.children.length){
				clearInterval(timer);
			}
		},100)
		
		//让圆柱转起来
		MTween({
			el: cloud,
			target: {rotateY: 720},
			time: 3600,
			type: "linear",
			callIn:function(){
				var deg = -css(cloud,"rotateY");
				for(var i=0;i<cloud.children.length;i++){
					css(cloud.children[i],"rotateY",deg)
				}
			},
			callBack:function(){
				transZ.removeChild(cloud)
			}
		})
	}
	
	function animit7(){
		//主体圆柱背景登场
		var panoBg = document.getElementsByClassName("panoBg")[0];
		var width = 129;//span的宽度
		var deg = 360/imgMenu.bg.length; //外角的度数
		var Z = parseInt(Math.tan((180-deg)/2*Math.PI/180)*(width/2)) - 4; //Z轴位移的尺寸
		var startDeg = 180; //从哪开始排
		css(panoBg,"rotateX",0)
		css(panoBg,"rotateY",-695);
		for(var i=0;i<imgMenu.bg.length;i++){
			var span = document.createElement("span");
			span.style.backgroundImage = "url("+imgMenu.bg[i]+")";
			span.style.display = "none";
			panoBg.appendChild(span);
			
			//给每一个span设置样式
			startDeg -= deg;
			css(span,"rotateY",startDeg);
			css(span,"translateZ",-Z);
		}
		
		
		var num = 0;
		var timer = setInterval(function(){
			num++;
			panoBg.children[num-1].style.display = "block";
			if(num>=panoBg.children.length){
				clearInterval(timer)
			}
		},3600/2/20)//共3600m秒(和tranZ位移时间一样,转两周,共20张图片)
		
		MTween({
			el: panoBg,
			target: {rotateY:25},
			time: 3600,
			type: "linear",
			callBack:function(){
				bgShow();
				drag();
				setSensors();
			}
		});
	}
	
	function drag(){
		var oPano = document.getElementsByClassName("pano")[0];
		var panoBg = document.getElementsByClassName("panoBg")[0];
		var transZ = document.getElementsByClassName("transZ")[0];
		//圆柱的拖拽
		var start = {x:0,y:0};//按下的位置
		var panoBgDeg = {x:0,y:0};//圆柱旋转的角度
		var scale ={x:129/18,y:1170/80}  
		var startZ = css(transZ,"translateZ");//获取z轴的位移
		var lastDeg = {x:0,y:0};//最后一次按下的位置
		var lastDis = {x:0,y:0};//最后一次x，y轴的差值
		document.addEventListener("touchstart",function(ev){
			isDrag = true;
			var e = ev.changedTouches[0];
			clearInterval(oPano.timer);
			clearInterval(panoBg.timer);
			clearInterval(transZ.timer);
			start.x = e.pageX;
			start.y = e.pageY;
			//获取一下当前圆柱的角度；初始值
			panoBgDeg.x = css(panoBg,"rotateY");
			panoBgDeg.y = css(panoBg,"rotateX");
		},false)
		document.addEventListener("touchmove",function(ev){
			var e = ev.changedTouches[0];
			//用来存储当前的x，y的旋转角度
			var nowDeg = {};
			//用来存储当前漂浮层的x，y的旋转角度(使漂浮层和主体层有错落感)
			var nowDeg2 = {};
			
			//当前的鼠标的位置
			var nowPoint = {};
			nowPoint.x = e.pageX;
			nowPoint.y = e.pageY;
			var changed = {}
			//当前鼠标的位置和开始位置之间的差值
			changed.x = nowPoint.x - start.x;
			changed.y = nowPoint.y - start.y;
			var changedDeg = {};
			//将差值转换为旋转的角度
			changedDeg.x = -(changed.x/scale.x);
			changedDeg.y = changed.y/scale.y;
			//当前的旋转的度数
			nowDeg.x = panoBgDeg.x + changedDeg.x;
			nowDeg.y =	panoBgDeg.y + changedDeg.y;
			//让漂浮层的位移稍微小一点点···；使漂浮层和主体层更加有错落感
			nowDeg2.x = panoBgDeg.x + (changedDeg.x*0.9);
			
			//限制y的范围
			if(nowDeg.y > 30){
				nowDeg.y = 30;
			} else if(nowDeg.y < -30) {
			 	nowDeg.y = -30;
			}
			 
			lastDis.x =  nowDeg.x - lastDeg.x;
			lastDeg.x = nowDeg.x;
			lastDis.y =  nowDeg.y - lastDeg.y;
			lastDeg.y = nowDeg.y;
			
			css(panoBg,"rotateX",nowDeg.y);
			css(panoBg,"rotateY",nowDeg.x);
			css(oPano,"rotateX",nowDeg.y);
			css(oPano,"rotateY",nowDeg2.x);
			
			
			var disZ = Math.max(Math.abs(changed.x),Math.abs(changed.y));
			if(disZ > 300){
				disZ = 300;
			}
			css(transZ,"translateZ",startZ - disZ);
		},false)
		
		document.addEventListener("touchend",function(){
			//获取到当前圆柱旋转的角度
			var nowDeg = {x:css(panoBg,"rotateY"),y:css(panoBg,"rotateX")};
			//获取到最后一次的差值
			var disDeg = {x:lastDis.x*10,y:lastDis.y*10};
			//让z轴回来
			MTween({
				el:transZ,
				target:{translateZ:startZ},
				time: 800,
				type: "easeOut"
			});
			//给背景图旋转一个缓冲效果
			MTween({
				el:panoBg,
				target:{rotateY:nowDeg.x + disDeg.x},
				time: 800,
				type: "easeOut",
				callBack:function(){
					isDrag = false;
					isStart = false;//进行第一次陀螺仪旋转的操作
				}
			});
			MTween({
				el:oPano,
				target:{rotateY:nowDeg.x + disDeg.x},
				time: 800,
				type: "easeOut"
			});
		},false)
	}
	
	function bgShow(){
		//背景颜色的出现
		var bg = document.getElementsByClassName("bg")[0];
		MTween({
			el:bg,
			target:{opacity:100},
			time: 1000,
			type:"easeBoth"
		});
	}
	
	//生成漂浮层
	function creatPano(){
		var oPano = document.getElementsByClassName("pano")[0];
		var deg = 18;//旋转的角度
		var R = 406;//漂浮层的半径
		var startDeg = 180;//开始旋转的角度
		
		css(oPano,"rotateX",0);
		css(oPano,"rotateY",-180);
		css(oPano,"scale",0);
		
		var pano1 = document.createElement("div");
		pano1.className = "panoDiv";
		//通过调里面元素的距离来使整个效果更加具有层次感；
		css(pano1,"translateX",1.564);
		css(pano1,"translateZ",-9.877);
		for(var i=0;i<2;i++){
			var span = document.createElement("span")
			span.style.cssText = "height:344px;margin-top:-172px;"
			span.style.background = "url("+ imgMenu.pano[i] +")";
			css(span,"translateY",-163);
			css(span,"rotateY",startDeg);
			css(span,"translateZ",-R);
			startDeg -= deg;
			pano1.appendChild(span)
		}
		oPano.appendChild(pano1);
		
		var pano2 = document.createElement("div");
		pano2.className = "panoDiv";
		css(pano2,"translateX",20.225);
		css(pano2,"translateZ",-14.695);
		oPano.appendChild(pano2);
		for(var i=2;i<5;i++){
			var span = document.createElement("span");
			span.style.cssText = "height:326px;margin-top:-163px;"
			span.style.background = "url("+ imgMenu.pano[i] +")";
			css(span,"translateY",278);
			css(span,"rotateY",startDeg);
			css(span,"translateZ",-R);
			startDeg -= deg;
			pano2.appendChild(span)
		}
		
		var pano3 = document.createElement("div");
		pano3.className = "panoDiv";
		css(pano3,"translateX",22.175);
		css(pano3,"translateZ",-11.35);
		oPano.appendChild(pano3);
		for(var i=5;i<9;i++){
			var span = document.createElement("span");
			span.style.cssText = "height:195px;margin-top:-97.5px;";
			span.style.background = "url("+ imgMenu.pano[i] +")";
			css(span,"translateY",192.5);
			css(span,"rotateY",startDeg);
			css(span,"translateZ",-R);
			startDeg -= deg;
			pano3.appendChild(span)
		}
		
		var pano4 = document.createElement("div");
		pano4.className = "panoDiv";
		css(pano4,"translateX",20.225);
		css(pano4,"translateZ",14.695);
		startDeg = 90;
		oPano.appendChild(pano4);
		for(var i=9;i<14;i++){
			var span = document.createElement("span");
			span.style.cssText = "height:468px;margin-top:-234px;";
			span.style.background = "url("+ imgMenu.pano[i] +")";
			css(span,"translateY",129);
			css(span,"rotateY",startDeg);
			css(span,"translateZ",-R);
			startDeg -= deg;
			pano4.appendChild(span)
		}
		
		var pano5 = document.createElement("div");
		pano5.className - "panoDiv";
		css(pano5,"translateX",-4.54);
		css(pano5,"translateZ",9.91);
		pano5.className = "panoDiv";
		startDeg = 18;
		oPano.appendChild(pano5);
		for(var i=14;i<20;i++){
			var span = document.createElement("span");
			span.style.cssText = "height:444px;margin-top:-222px;";
			span.style.background = "url("+ imgMenu.pano[i] +")";
			css(span,"translateY",-13);
			css(span,"rotateY",startDeg);
			css(span,"translateZ",-R);
			startDeg -= deg;
			pano5.appendChild(span)
		}
		
		var pano6 = document.createElement("div");
		css(pano6,"translateX",-11.35);
		css(pano6,"translateZ",22.275);
		pano6.className = "panoDiv";
		oPano.appendChild(pano6);
		startDeg = 18;
		for(var i = 20; i < 26; i++){
			var span = document.createElement("span");
			span.style.cssText = "height:582px;margin-top:-291px;";
			span.style.background = "url("+ imgMenu.pano[i] +")";
			css(span,"translateY",256);
			css(span,"rotateY",startDeg);
			css(span,"translateZ",-R);
			startDeg -= deg;
			pano6.appendChild(span)
		}
		
		setTimeout(function(){
			MTween({
				el:oPano,
				target:{
					scale:100,
					rotateY:25
				},
				time: 1000,
				type:"easeBoth"
			})
		},3000)
	}
	
	//计算景深(适配)
	function setPerc(){
		reseted();
		window.onresize = reseted;
		function reseted(){
			var vrContent = document.getElementsByClassName("vr-content")[0];
			var height = document.documentElement.clientHeight;
			var deg = 52.5;
			var perc = Math.tan(deg*Math.PI/180)*height/2;
			vrContent.style.webkitPerspective = vrContent.style.perspective = perc;
			
			//让主体层和景深所在的位置相同，保证在适配过程中元素和视野所在的位置是固定的；
			var oMain = document.getElementsByClassName("main")[0];
			css(oMain,"translateZ",perc)
		}
	}
	
	
	var isStart = false; // 用来判断是不是第一次进行陀螺仪;
	//陀螺仪
	function setSensors(){
		var oPano = document.getElementsByClassName("pano")[0];
		var panoBg = document.getElementsByClassName("panoBg")[0];
		var transZ = document.getElementsByClassName("transZ")[0];
		var last = {x:0,y:0};//用来存储上一次的值
		var now = {x:0,y:0};//用来存储当前的值
		var start = {};//用来存储陀螺仪的初始值
		var startPano = {};//用来存储元素的初始值
		var scale = 129/18; //每旋转1度要走几个像素:18为每张图所转的度数,129为每张图片的宽度
		var startZ = -160;
		var dir = window.orientation; //检测横竖屏,0:竖屏,90横屏,-90横屏,180,反向竖屏
		var lastTime = Date.now();
		window.addEventListener('orientationchange', function(e) {
			dir = window.orientation;//用户切换了横竖之后，重置方向
		});
		
		//用来检测横竖屏切换
		window.addEventListener('deviceorientation', function(ev)
		{
			if(isDrag){
				return
			}
			
			//deviceorientation时间间隔可能给会比20小;因此需要把deviceorientation加大执行时间间隔
			var nowTime = Date.now();
			if(nowTime - lastTime < 30){
				return;
			}
			lastTime = nowTime;
			
//			陀螺仪旋转的角度
			switch(dir){
				case 0:
					var x = ev.beta;
					var y = ev.gamma;
					break;
				case 90:
					var x = ev.gamma;
					var y = ev.beta;
					break;	
				case -90:
					var x = -ev.gamma;
					var y = -ev.beta;
					break;	
				case 180:
					var x = -ev.beta;
					var y = -ev.gamma;
					break;
			}
			
			if(!isStart){
				//如果isStart为false，则说明用户是第一次操作陀螺仪
				//获取开始时陀螺仪的角度
				start.x = x;
				start.y = y;
				//获取元素的初始旋转角度
				startPano.x = css(oPano,"rotateX");
				startPano.y = css(oPano,"rotateY");
				isStart = true
			}else{
				//如果isStart为true，则说明用户不是第一次操作陀螺仪
				//计算陀螺仪的差值(当前值-初始值)
				now.x = x;
				now.y = y;
				var dis = {};
				dis.x = now.x - start.x;//绕x轴旋转
				dis.y = now.y - start.y;//绕z轴旋转
				//计算元素现在应该到达的值(元素的初始值+差值)
				var nowPano = {};
				nowPano.x = startPano.x + dis.x;
				nowPano.y = startPano.y + dis.y;
				//对y进行判断
				if(nowPano.x>30){
					nowPano.x = 30;
				}else if(nowPano.x<-30){
					nowPano.x = -30;
				}
				
				var disZx = Math.abs(Math.round((nowPano.x- css(oPano,"rotateX"))*scale))
				var disZy = Math.abs(Math.round((nowPano.y - css(oPano,"rotateY"))*scale))
				var disZ = Math.max(disZx,disZy)
				if(disZ > 300){
					disZ = 300;
				}
				MTween({
					el:transZ,
					target:{
						translateZ: startZ - disZ
					},
					time: 300,
					type: "easeOut",
					callBack: function(){
						MTween({
							el:transZ,
							target:{
								translateZ: startZ
							},
							time: 400,
							type: "easeOut"
						});
					}
				});
				
				MTween({
					el:oPano,
					target:{
						rotateX:nowPano.x,
						rotateY:nowPano.y
					},
					time: 600,
					type: "easeOut"
				});
				MTween({
					el:panoBg,
					target:{
						rotateX:nowPano.x,
						rotateY:nowPano.y
					},
					time: 600,
					type: "easeOut"
				});
			}
		})
	}
	function returned(){
		$(".btn").on("touchstart",function(ev){
			var vrContent = document.getElementsByClassName("vr-content")[0];
			document.getElementsByTagName("body")[0].removeChild(vrContent);
			ev.stopPropagation();
		})
	}
	
	//------------------------照片墙效果------------------------------------
	$(".photo").on("touchstart",function(){
		var oPhotoView = document.getElementsByClassName("photoView")[0];
		MTween({
			el:oPhotoView,
			target:{
				scale:100,
			},
			time: 400,
			type: "easeOut",
			callBack:function(){
				//接下来应该在这里写····
				console.log(1)
			}
		})
	})
	
	photoViewing();
	function photoViewing(){
		//刚进入的时候应该先加载图片吧~~~~~或许吧~~~~~
		var oBox = document.querySelector(".box");
		var oInner = document.querySelector(".inner");
		var oFoot = oInner.getElementsByTagName("footer")[0]
		var oList = document.querySelector('.photo-list');
		var num = 26;//加载几张图片
		var imgArr = [];//用来存放图片的路径
		var start = 0;//start存的是开始的位置
		var length = 8;//每一次加载12张图片
//		var isEnd = false;//判断是否结束
		
		for(var i=0;i<num;i++){
			imgArr.push("../img/pics/"+(i%26+1)+".jpg");//把路径存入数组中
		}
		
		//新建li
		screatLi();
		
		function screatLi(){
//			//判断所需要加载的图片数量是不是比开始时的位置大;如果开始的数字大,则说明后面没有图片了;
//			if(start >= imgArr.length){
//				oFoot.innerHTML = "没有更多图片了";
//				//此处应该有动画(后面再调整)
//				return;
//			}

			var end = start + length // end为最后一张图片的位置
			//此处end有可能会大于图片的长度,需要判断一下
			var end = Math.min(end,imgArr.length)
			
			//这下应该生成li了;将路径存在li的自定义属性中;当图片进入可视区后生成图片
			for(var i=start;i<end;i++){
				var oLi = document.createElement("li");
				oLi.src = imgArr[i];
				oLi.isLoad = true;
				oList.appendChild(oLi);
			}
			createImg();
			start = end
		}
		//当图片进入可视区后生成图片;因此需要判断是否生成图片
		function createImg(){
			var boxRect = oBox.getBoundingClientRect();
			var imgbottom = boxRect.bottom;
			var lis = oBox.getElementsByTagName("li");
			
			console.log(lis.length)
			for(var i = 0; i < lis.length; i++){
				var top = lis[i].getBoundingClientRect().top;//li相对可视区的top值
				if(top < imgbottom && lis[i].isLoad){//当前li进入可视区
					lis[i].isLoad = false;
					showImg(lis[i]);
				}
			}
		}
		
		function showImg(li){
			var img = new Image(); 
			img.src = li.src;
			img.onload = function(){
				li.appendChild(img);
				/* 元素没有渲染完成，transition不起作用*/
				setTimeout(function(){
					img.style.opacity = 1;
				},100);
			}
		}
		
		//滚动条
		var myscroll = new IScroll(".box",{
			scrollbars: "custom",
			scrollY: true,
			interactiveScrollbars:true,
			fadeScrollbars:true,
			shrinkScrollbars:"scale"
		});
		myscroll.on("scrollStart",function(){
//			var innerTop = oInner.offsetTop;
//			var minTop = oBox.clientHeight - inner.offsetHeight;
//			if(minTop >= innerTop ){
//				console.log("用户是在底部进行拖拽的");
//				footer.style.opacity = 1;	
//				isEnd = true;	
//			} else {
//				footer.style.opacity = 0;	
//				isEnd = false;	
//			}
		})
//		myscroll.on("scroll",function(){
//			console.log(2)
//		})
		myscroll.on("scrollEnd",function(){ 
//			var minTop = oBox.clientHeight - oInner.offsetHeight;
//			var innerTop = oInner.offsetTop;
//			console.log(innerTop)
//			if(minTop >= innerTop){
				screatLi();
				myscroll.refresh();
//				isEnd = false;
//			}
		})
	}
	
	
	
	
})()


