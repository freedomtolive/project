(function(){
	//日期
	var t = new Date();
	var strWeek = "";
	
	handle.time();
	setInterval(handle.time(),1000)
	
	var oHua = document.getElementsByClassName("huakuai")[0]
	var disX = null;
	var onOff = false;
	
	init();
	//初始化
	function init(){
		cssTransform($(".view")[0], "scale", 0)
		cssTransform($(".vr-content")[0], "scale", 0)
	}
	
	//--------------阻止默认事件-------------------------
	document.addEventListener('touchstart',function(ev){
		ev.preventDefault();
	});
	
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
			MTween({
				el: $(".startView")[0],
				time: 2000,
				target: {
					scale: 0
				},
				type: "easeOut"
			});
			MTween({
				el: $(".view")[0],
				time: 2000,
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
		MTween({
			el: $(".vr-content")[0],
			time: 800,
			target: {
				scale: 100
			},
			type: "easeOut",
			callBack:loading
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
			time: 800,
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
				time: 600,
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
							time: 800,
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
				time: 2000,
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
			time: 2000,
			type: "easeOutStrong",
			callBack:function(){
				setTimeout(function(){
					MTween({
						el: oLogo4,
						target: {translateZ: -1000,scale:20},
						time: 3000,
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
		//出场动画
		console.log(1)
	}
})()
