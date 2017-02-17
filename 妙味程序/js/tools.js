var handle = {
	//通过id找到对应的数据
	getSelfById(data,id){
		return data.find(function (value){
			return value.id == id;
		})
	},
	//通过id寻找所有的子数据
	getChildsById(data,id){
		return data.filter(function(value){
			return value.pid == id
		});
	},
	//通过id寻找所有的父数据
	getFatherById(data,id){
		var arr = [];
		var self = handle.getSelfById(data,id);
		if(self){
			arr.push(self);
			arr = arr.concat(handle.getFatherById(data,self.pid))
		}
		return arr;
	},
	//碰撞检测
	peng(obj1,obj2){
		//如果返回为true，说明没有碰撞，
		//如果返回值为false，说明碰撞了
		var pos1 = obj1.getBoundingClientRect();
		var pos2 = obj2.getBoundingClientRect();
		return pos1.right > pos2.left && pos1.left < pos2.right && pos1.bottom > pos2.top && 		pos1.top < pos2.bottom;
	},
	zIndexFn(ele){
		ele.addEventListener("mouseup",function(){
			ele.style.zIndex = ++commonObj.max;
		},false)
	}
}