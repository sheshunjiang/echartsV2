function bMapEchart(ele,echarts){
	this.ele=ele;
	this.echarts=echarts;
	this.chart;
	this.mapName;     //地图名称
	this.serializableData={"cmd":-1,"data":[]};    //用于序列化数据
}
bMapEchart.prototype.droBaiMap=function(mapName,mapOption,mapStyle){
	var chart=this.chart;
	this.mapName=mapName;
	if(chart){
		chart.dispose();
	}
	chart=this.echarts.init(this.ele);
	var option={
		//backgroundColor:mapOption.backgroundColor ? mapOption.backgroundColor: "#002020",
		tooltip:{
		 	trigger: 'item'
		},
		bmap: {
	        center: mapOption.center ? mapOption.center : [104.114129, 30.550339],
	        zoom: mapOption.center ? mapOption.zoom : 11,
	        roam: mapOption.center ? mapOption.roam : true,
	        mapStyle:mapStyle
	        // mapStyle: {
	        //     styleJson: [
	        //     {
	        //         'featureType': 'water',      //水系
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'color': '#d1d1d1'
	        //         }
	        //     }, {
	        //         'featureType': 'land',    //陆地
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'color': '#f3f3f3'
	        //         }
	        //     }, {
	        //         'featureType': 'railway',
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'visibility': 'off'
	        //         }
	        //     }, {
	        //         'featureType': 'highway',      //国道与高速
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'color': '#fdfdfd'
	        //         }
	        //     }, {
	        //         'featureType': 'highway',
	        //         'elementType': 'labels',
	        //         'stylers': {
	        //             'visibility': 'off'
	        //         }
	        //     }, {
	        //         'featureType': 'arterial',
	        //         'elementType': 'geometry',
	        //         'stylers': {
	        //             'color': '#fefefe'
	        //         }
	        //     }, {
	        //         'featureType': 'arterial',
	        //         'elementType': 'geometry.fill',
	        //         'stylers': {
	        //             'color': '#fefefe'
	        //         }
	        //     }, {
	        //         'featureType': 'poi',
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'visibility': 'off'
	        //         }
	        //     }, {
	        //         'featureType': 'green',
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'visibility': 'off'
	        //         }
	        //     }, {
	        //         'featureType': 'subway',
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'visibility': 'off'
	        //         }
	        //     }, {
	        //         'featureType': 'manmade',
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'color': '#d1d1d1'
	        //         }
	        //     }, {
	        //         'featureType': 'local',
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'color': '#d1d1d1'
	        //         }
	        //     }, {
	        //         'featureType': 'arterial',
	        //         'elementType': 'labels',
	        //         'stylers': {
	        //             'visibility': 'off'
	        //         }
	        //     }, {
	        //         'featureType': 'boundary',
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'color': '#fefefe'
	        //         }
	        //     }, {
	        //         'featureType': 'building',
	        //         'elementType': 'all',
	        //         'stylers': {
	        //             'color': '#d1d1d1'
	        //         }
	        //     }, {
	        //         'featureType': 'label',        //行政标注
	        //         'elementType': 'labels.text.fill',
	        //         'stylers': {
	        //             'color': '#999999'
	        //         }
	        //     }]
	        // }
	    }
	};
	this.chart=chart;
	chart.setOption(option);
}

//叠加散列
/*
scatterName:散列图名称
scatterData:[{"name":"犀浦站","coordinate":[88.1653,39.6002],value:100},{"name":"犀浦站","coordinate":[88.1653,39.6002],value:100}] //散列图数据
scatterOption:{   //配置参数
	symbolSize：10,    //图标大小
	symbol:'circle',   //图标类型，支持'circle','rect'等及图片路径，svg
	symbolOffset:[0,0] //图标相对原来位置的偏移量
	show:true, // 是否显示文本
	textOffset:[0,0]  //文本偏移量
	textColor:"#111"   //文本颜色
	fontSize:12,       //文字大小
	fontStyle:'normal',   //字体风格
	fontWeight: 'normal',          //字体粗细
	fontFamily:'sans-serif',         //字体系列       
	color:"#ff6020"       //图标颜色，当symbol为图片时，此参数无效
}
symbolDynamicSize:{    //是否根据数据的value值来动态改变symbolSize的大小
	isDynamicSize:true,    //true时scatterOption.symbolSize无效
	size:5                 //用作value的除数，数值越大图标越小
}
colorDynamic:{         //是否根据value值动态改变图标的颜色
	isDynamicColor:true,    //true时，scatterOption.color无效
	color:['#9A32CD','#71C671','#0000FF'],   //颜色数组
	min:0,                 //最小值
	max:350                //最大值
}
*/
bMapEchart.prototype.overlyScatter=function(scatterName,scatterData,scatterOption,symbolDynamicSize,colorDynamic){
	var option=this.chart.getOption();
	var data=[];
	for (var i = 0; i < scatterData.length; i++) {
        data.push({
        	name:scatterData[i].name,
        	value:scatterData[i].coordinate.concat(scatterData[i].value)
        });
    }
    var symbolSize=scatterOption.symbolSize ? scatterOption.symbolSize:10;
    if(symbolDynamicSize && symbolDynamicSize.isDynamicSize){
    	symbolSize=function(val) {
                    return val[2] / (symbolDynamicSize.size ? symbolDynamicSize.size :10);
                };
    }
    if(colorDynamic && colorDynamic.isDynamicColor){
    	var item={
    		show:false,
			min: colorDynamic.min ? colorDynamic.min : 0,
			max: colorDynamic.max ? colorDynamic.max : 100,
			calculable: false,
			seriesIndex:option.series.length,
			inRange: {
				color:colorDynamic.color ? colorDynamic.color :['#d94e5d','#eac736','#50a3ba']
			}
    	};
    	if(option.visualMap){
    		option.visualMap.push(item);
    	}else{
	    	option.visualMap=item;
		}
    }
	option.series.push({
		name:scatterName,
		type:"scatter",
		coordinateSystem:"bmap",
		symbolSize: symbolSize,
		symbol:scatterOption && scatterOption.symbol ? scatterOption.symbol : "circle",
		symbolOffset:scatterOption && scatterOption.symbolOffset ? scatterOption.symbolOffset : [0,0],
		label:{
			show: scatterOption && scatterOption.show ? scatterOption.show : false,
			offset: scatterOption && scatterOption.textOffset ? scatterOption.textOffset : [0,0],
			color: scatterOption && scatterOption.textColor ? scatterOption.textColor : '#111',
			fontSize: scatterOption && scatterOption.fontSize ? scatterOption.fontSize : 12,
			fontStyle: scatterOption && scatterOption.fontStyle ? scatterOption.fontStyle : 'normal',
			fontWeight:scatterOption && scatterOption.fontWeight ? scatterOption.fontWeight : 'normal',
			fontFamily: scatterOption && scatterOption.fontFamily ? scatterOption.fontFamily : 'sans-serif',
			formatter:function (params) {
	            return params.value[2];
	        }
		},
		itemStyle:{
			color: scatterOption && scatterOption.color ? scatterOption.color : '#ff6020'
		},
		tooltip:{
		 	trigger: 'item',
	        formatter: function (params) {
	            return params.name + ' : ' + params.value[2];
	        }
		 },
         data:data
	});
	this.chart.setOption(option);
}

//叠加饼形图
/*
pieName:饼状图名称，不能有同名
pieData:[{regionName:"榆林市",cp:[121.4648,31.2891],data:[{value:335, name:'直接访问'},{value:310, name:'邮件营销'}]},
		{regionName:"榆林市",cp:[121.4648,31.2891],data:[{value:335, name:'直接访问'},{value:310, name:'邮件营销'}]    //饼形图数据
pineOption:{
	radius:'5%',     //半径大小，支持百分比或数字
	colorArr:['#F75D5D','#59ED4F','#4C91E7']     //饼状图颜色
}
*/
bMapEchart.prototype.overlyPie=function(pieName,pieData,pieOption){
	var that=this;
	var myChart=this.chart;
	var pieData=pieData;
	renderEachCityPie();
	function renderEachCityPie(){
		var map=that.getMap();
		var radius=pieOption.radius ? pieOption.radius : 100;
		if(typeof radius=="string" && radius.indexOf('%')){
			radius=myChart.getWidth()*parseInt(radius)/100/2;
		}
		echarts.util.each(pieData,function(dataItem,idx){
			var geoCoord =dataItem.cp;
			idx += '';
			var id=pieName+idx;
			var htm = '<div id="' + id + '" style="width:'+radius*2+'px;height:'+radius*2+'px;"></div>';
			var point = new BMap.Point(geoCoord[0], geoCoord[1]);
		    var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {
		        "anchor": new BMap.Size(-radius, -radius),
		        barkground: "transparency"
		    });
		    map.addOverlay(myRichMarkerObject);
		    document.getElementById(id).parentNode.style.backgroundColor = "transparent";
    		document.getElementById(id).parentNode.style.zIndex = "1";
		    var chartItem=that.echarts.init(document.getElementById(id));
		    map.addOverlay(myRichMarkerObject);
			var option={
				tooltip:{
	            	trigger: 'item'
	            },
				series:[]
			};
			option.series.push({
				name:pieName+idx,
				id:pieName+idx,
				type:"pie",
				coordinateSystem:"bmap",
				//center: coord,
				radius:['0','50%'],
				itemStyle: {
	                normal: {
	                    color: function(params){
	                        // 饼图每块区域颜色
	                        var colorList = pieOption.colorArr ? pieOption.colorArr : ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"];
	                        return colorList[params.dataIndex];
	                    }
	                }
	            },
	            labelLine:{
	            	show:false
	            },
	            label:{
	            	show:false
	            },
	            tooltip:{
	            	trigger: 'item',
	            	formatter:function(params){
	            		return params.data.name+':'+params.data.value;
	            	}
	            },
	            data: dataItem.data
			});
			chartItem.setOption(option);
		});
	}
}

// bMapEchart.prototype.overlyPie=function(){

// }

//叠加热力图
/*
heatMapName:'heatMapName'  //热力图名称
seriesData: [{"name":"犀浦站","coordinate":[88.1653,39.6002],value:100},{"name":"犀浦站","coordinate":[88.1653,39.6002],value:100}] //数据
heatOption:{       //配置参数
	min:0,         //最小值
	max:200,       //最大值
	color:['#d94e5d','#eac736','#50a3ba']   //颜色
}
*/
bMapEchart.prototype.overlyHeatMap=function(heatMapName,heatMapData,heatOption){
	var option=this.chart.getOption();
	var seriesData=[];
	for(var i=0;i<heatMapData.length;i++){
		seriesData.push(heatMapData[i].coordinate.concat(heatMapData[i].value));
	}
	var item={
		"name":heatMapName,
		"type": 'heatmap',
        "coordinateSystem": 'bmap',
        "data":seriesData

	};
	var visualMap={
		show:false,
		min: heatOption.min ? heatOption.min : 0,
		max: heatOption.max ? heatOption.max : 200,
		calculable: false,
		seriesIndex:option.series.length,
		inRange: {
			color:heatOption.color ? heatOption.color :['#d94e5d','#eac736','#50a3ba']
		}
	};
	if(option.visualMap){
		option.visualMap.push(visualMap);
	}else{
    	option.visualMap=visualMap;
	}
	option.series.push(item);
	this.chart.setOption(option);
}

//叠加柱状图
/*
barName:''   柱状图名称
barData:[{"regionName":"凉山彝族自治州","cp":[109.1162, 32.7722],"xData":["数据A","数据B","数据C"],"yData":[100,200,30]},
		{"regionName":"乐山市","cp":[109.1162, 32.7722],"xData":["数据A","数据B","数据C","数据D"],"yData":[10,60,30,100]}]  //柱状图数据
barOption:{   //柱状图配置参数
	colorArr:['#F75D5D','#59ED4F','#4C91E7'],
	width:30 ,  // 柱状图宽,支持百分比
	height:40   //柱状图高
}
*/
bMapEchart.prototype.overlyBar=function(barName,barData,barOption){
	var that=this;
	var myChart=this.chart;
	var barData=barData;
	renderEachCityPie();
	function renderEachCityPie(){
		var map=that.getMap();
		var width=barOption && barOption.width ? barOption.width:100;
	    var height=barOption && barOption.height ? barOption.height:150;
		if(typeof width=="string" && width.indexOf('%')){
			width=myChart.getWidth()*parseInt(width)/100/2;
		}
		if(typeof height=="string" && height.indexOf('%')){
			height=myChart.getHeight()*parseInt(height)/100/2;
		}
		echarts.util.each(barData,function(dataItem,idx){
			var option={
				tooltip:{
					trigger:"item"
				},
				xAxis:[],
				yAxis:[],
				grid:[],
				series:[]
			};
	        var geoCoord=dataItem.cp;
	        idx += '';
	        var id=barName+idx;
			var htm = '<div id="' + id + '" style="width:'+width+'px;height:'+height+'px;"></div>';
			var point = new BMap.Point(geoCoord[0], geoCoord[1]);
		    var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {
		        "anchor": new BMap.Size(-width/2, -height),
		        "barkground": "transparency"
		    });
		    map.addOverlay(myRichMarkerObject);
		    document.getElementById(id).parentNode.style.backgroundColor = "transparent";
    		document.getElementById(id).parentNode.style.zIndex = "1";
		    var chartItem=that.echarts.init(document.getElementById(id));
		    map.addOverlay(myRichMarkerObject);
	        inflationData=dataItem.yData;
	        option.xAxis.push({
	            id: id,
	            gridId: id,
	            type: 'category',
	            nameLocation: 'middle',
	            nameGap: 3,
	            splitLine: {
	                show: false
	            },
	            axisTick: {
	                show: false
	            },
	            axisLabel: {
	                show: false
	            },
	            axisLine: {
	            	show: false,
	                onZero: false,
	                lineStyle: {
	                    color: '#666'
	                }
	            },
	            data:dataItem.xData,
	            //z: 2

	        });
	        option.yAxis.push({
	            id: id,
	            gridId: id,
	            splitLine: {
	                show: false
	            },
	            axisTick: {
	                show: false
	            },
	            axisLabel: {
	                show: false
	            },
	            axisLine: {
	                show: false,
	                lineStyle: {
	                    color: '#1C70B6'
	                }
	            },
	           // z: 2
	        });
	        option.grid.push({
	            id: id,
	            width: width,
	            height: height,
	            left: 0,
	            top:0,
	            show: false,
	            //z: 2
	        });
	        option.series.push({
	            id: id,
	            type: 'bar',
	            xAxisId: id,
	            yAxisId: id,
	            barGap: 0,
	            barCategoryGap: 0,
	            data: inflationData,
	            //z: 1,
	            //barWidth:50,
	            itemStyle: {
	                normal: {
	                    color: function(params){
	                        // 柱状图每根柱子颜色
	                        var colorList =barOption && barOption.colorArr ? barOption.colorArr : ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"];
	                        return colorList[params.dataIndex];
	                    }
	                }
	            },
	            tooltip:{
	            	trigger: 'item',
	            	formatter:function(params){
	            		return params.name+':'+params.value;
	            	}
	            }
	        });
			chartItem.setOption(option);
		});
	}
}

//叠加图片
/*
imgName:'img1' 图片名字，不能重复
imgOption:{   //图片参数
	coords:[116.0046,28.6633], 地理坐标，图片叠加位置
	imgPath:'../img/home.png',       //图片路径
	width:100,                   //图片宽
	height:100					//图片高
}
*/
bMapEchart.prototype.overlyImg=function(imgName,imgOption){
	var map=this.getMap();
	var option={
		series:[]
	}; 
	var myChart=this.chart;
	var width=imgOption && imgOption.width ? imgOption.width:100;
    var height=imgOption && imgOption.height ? imgOption.height:150;
    var geoCoord=imgOption.coords;
	if(typeof width=="string" && width.indexOf('%')){
		width=myChart.getWidth()*parseInt(width)/100/2;
	}
	if(typeof height=="string" && height.indexOf('%')){
		height=myChart.getHeight()*parseInt(height)/100/2;
	}
	id=imgName;
	var htm = '<div id="' + id + '" style="width:'+width+'px;height:'+height+'px;"></div>';
	var point = new BMap.Point(geoCoord[0], geoCoord[1]);
    var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {
        "anchor": new BMap.Size(-width/2, -height/2),
        "barkground": "transparency"
    });
    map.addOverlay(myRichMarkerObject);
    document.getElementById(id).parentNode.style.backgroundColor = "transparent";
	document.getElementById(id).parentNode.style.zIndex = "1";
    var chartItem=this.echarts.init(document.getElementById(id));
    map.addOverlay(myRichMarkerObject);
	option.series.push({
		name:imgName,
		id:imgName,
		type:"custom",
		coordinateSystem:'bmap',
		renderItem:function(){
			return {
		        type: 'image',
		        style:{
		        	image:imgOption.imgPath,
		        	x:0,
		        	y: 0,
		        	height: height,
		        	width: width
		        }
		    };
		},
		data: [1,0]
	});
	chartItem.setOption(option);
}

//通过echarts叠加点
/*
spotData:[{"text":'成都',"coord":[87.9236,43.5883]}]   //嗲位置数据
spotOption:{    //点配置参数
	name:"chengdu",
	coord:,
	type:effectScatter,
	symbolSize：10,    //图标大小
	symbol:'circle',   //图标类型，支持'circle','rect'等及图片路径，svg
	symbolOffset:[0,0], //图标相对原来位置的偏移量
	show:true, // 是否显示文本
	textOffset:[0,0],  //文本偏移量
	textColor:"#111",   //文本颜色
	fontSize:12,       //文字大小
	fontStyle:'normal',   //字体风格
	fontWeight: 'normal',          //字体粗细
	fontFamily:'sans-serif',         //字体系列       
	color:"#ff6020"       //图标颜色，当symbol为图片时，此参数无效
}
*/
bMapEchart.prototype.overlyScatterSpot=function(spotOption){
	var option=this.chart.getOption();
	option.series.push({
		name:spotOption.name,
		type:spotOption.type ? spotOption.type : 'scatter',
		coordinateSystem:"bmap",
		symbolSize: spotOption.symbolSize ? spotOption.symbolSize : 10,
		symbol:spotOption && spotOption.symbol ? spotOption.symbol : "circle",
		symbolOffset:spotOption && spotOption.symbolOffset ? spotOption.symbolOffset : [0,0],
		label:{
			show: spotOption && spotOption.show ? spotOption.show : false,
			offset: spotOption && spotOption.textOffset ? spotOption.textOffset : [0,0],
			color: spotOption && spotOption.textColor ? spotOption.textColor : '#111',
			fontSize: spotOption && spotOption.fontSize ? spotOption.fontSize : 12,
			fontStyle: spotOption && spotOption.fontStyle ? spotOption.fontStyle : 'normal',
			fontWeight:spotOption && spotOption.fontWeight ? spotOption.fontWeight : 'normal',
			fontFamily: spotOption && spotOption.fontFamily ? spotOption.fontFamily : 'sans-serif',
			formatter:function (params) {
	            return params.name;
	        }
		},
		itemStyle:{
			color: spotOption && spotOption.color ? spotOption.color : '#ff6020'
		},
		tooltip:{
		 	trigger: 'item',
		 	show:false
		 },
         data:[{name:spotOption.name,value:spotOption.coord}]
	});
	this.chart.setOption(option);
}

//通过百度地图添加点
/*
point:[]  //地理坐标
imgOption:{    //图片参数
	imgPath:'',   //图片路径
	width:50,     //图片宽
	height:50,     //图片高
	text:'',      //标记点文本
	x:0,         //标记点水平偏移量
	y:0,         //标记点垂直偏移量
	animation: BMAP_ANIMATION_BOUNCE,    //点动画
}
*/
bMapEchart.prototype.overlyBmapSpot=function(point,option){
	var map=this.getMap();
	var pt = new BMap.Point(point[0], point[1]);
	var myIcon={};
	var marker={};
	if(option.imgPath){
		myIcon = new BMap.Icon(option.imgPath, new BMap.Size(option.width? option.width : 50,option.height ? option.height : 50));
		marker = new BMap.Marker(pt,{icon:myIcon,text:option.text,offset:new BMap.Size(option.x,option.y)});
	}
	marker = new BMap.Marker(pt,{"title":option.text,"offset":new BMap.Size(option.x,option.y)});  // 创建标注
	//map.addOverlay(marker);
	if(option.animation){
		console.log(1);
		marker.setAnimation(option.animation); 
	}
	map.addOverlay(marker);
}


//叠加线，通过echart
/*
lineName:''   名称
linesData:[{name:"城北",coords:[[121.4648,31.2891],[113.8953,22.901],[118.7073,37.5513]]},
	{name:"城北",coords:[[121.4648,31.2891],[113.8953,22.901],[118.7073,37.5513]]}]   //线数据
lineOption:{    //线参数
	color：,      颜色
	width:,       线宽
	type:,        线类型
	opacity:,     透明度
	curveness:0   曲率,当线段由多个点组成时，无效
}
animationOption:{  //动画参数
	show:true,  //是否开启动画
	effectShow:true,  //是否开启尾迹动画
	constantSpeed：5,  //动画速度
	trailLength:0.2,    //尾迹长度
	symbolSize:2， 图标大小
	color：'#fff'  颜色
	loop:true,    //是否循环播放动画
	symbol：'circle'  //尾迹样式
}
*/
bMapEchart.prototype.overlyLine=function(lineName,liensData,lineOption,animationOption){
	var option=this.chart.getOption();
	var data=[];
	var polyline=false;
	for(var i=0;i<liensData.length;i++){
		if(liensData[i].coords.length>2){
			 polyline=true;
		}
		data.push({
			name:liensData[i].name,
			coords:liensData[i].coords,
			lineStyle:{
				color: lineOption && lineOption.color ? lineOption.color : '#00ff00' ,
				width: lineOption && lineOption.width ? lineOption.width : 1,
				type: lineOption && lineOption.type ? lineOption.type : 'solid',
				opacity: lineOption && lineOption.opacity ? lineOption.opacity : 1,
				curveness:lineOption && lineOption.curveness ? lineOption.curveness : 0
			}
		});
	}
	option.series.push({
		name:lineName,
		type:"lines",
		coordinateSystem:'bmap',
		polyline:polyline,
        data:data,
        effect: {
            constantSpeed: animationOption && animationOption.constantSpeed ? animationOption.constantSpeed : 20,   
            show: animationOption && animationOption.show ? animationOption.show : false,
            trailLength: 0,
            symbolSize: animationOption && animationOption.symbolSize ? animationOption.symbolSize : 15,
            color:animationOption && animationOption.color ? animationOption.color : '#FFA500',
            loop:animationOption && animationOption.loop ? animationOption.loop : true,
            symbol: animationOption && animationOption.symbol ? animationOption.symbol : 'circle'
        },
        zlevel:1
	},
	{
		name:lineName+"Animation",
		type:"lines",
		coordinateSystem:'bmap',
		polyline:polyline,
		data:data,
		effect: {
            constantSpeed: animationOption && animationOption.constantSpeed ? animationOption.constantSpeed : 20,   
            show: animationOption && animationOption.effectShow ? animationOption.effectShow : false,
            trailLength: animationOption && animationOption.trailLength ? animationOption.trailLength : 0.2,
            symbolSize: animationOption && animationOption.symbolSize ? animationOption.symbolSize : 15,
            color:animationOption && animationOption.effectColor ? animationOption.effectColor : '#FFA500',
            loop:animationOption && animationOption.loop ? animationOption.loop : true
        },
        lineStyle:{
        	width:0,
        	opacity:0
        }
	}
	);
	this.chart.setOption(option);
}

//叠加贝塞尔曲线
/*
curveData:[{name:"阿里地区",coord:[82.3645,32.7667]},{name:"阿里地区",coord:[82.3645,32.7667]}]   //绘制点所需的数据
bazOption:{       //相关配置参数
	lineWidth:1,      //线宽
	lineColor:'#ff0033',    //线的颜色
	spotRadius:5,           //节点的大小，为0时不显示节点
	spotColor:'#ccff33'      //线的颜色
}
gradualColor:{        //是否渐变色，此参数可省略，即不使用渐变色填充曲线
	isGradual:true,   //是否启用渐变色
	direction:[0,0,0,1],  //渐变方向,0,0,0,1(下-上);0,1,0,0(上-下);0,0,1,0(左-右);
	colors:[
		{               //起始颜色
			offset:0, 
			color: '#000000'
		},
		{               //终止颜色
			offset:1, 
			color: '#ffffff'
		}
	]
}
*/
bMapEchart.prototype.overlyBezierCurve=function(curveName,dazData,curveOption){
	var map=this.getMap();
	var point = new BMap.Point(84.9023,42.148);    
	var pixel=map.pointToPixel(point);  
	console.log(pixel);
	var ArrayCtor = typeof Float32Array === 'undefined'
	    ? Array
	    : Float32Array;
	var smoothBezier = function (points, smooth, isLoop, constraint) {
	    var cps = [];

	    var v = [];
	    var v1 = [];
	    var v2 = [];
	    var prevPoint;
	    var nextPoint;

	    //var min$$1, max$$1;
	    // if (constraint) {
	    //     min$$1 = [Infinity, Infinity];
	    //     max$$1 = [-Infinity, -Infinity];
	    //     for (var i = 0, len$$1 = points.length; i < len$$1; i++) {
	    //         min(min$$1, min$$1, points[i]);
	    //         max(max$$1, max$$1, points[i]);
	    //     }
	    //     // 与指定的包围盒做并集
	    //     min(min$$1, min$$1, constraint[0]);
	    //     max(max$$1, max$$1, constraint[1]);
	    // }

	    for (var i = 0, len$$1 = points.length; i < len$$1; i++) {
	        var point = points[i];

	        if (isLoop) {
	            prevPoint = points[i ? i - 1 : len$$1 - 1];
	            nextPoint = points[(i + 1) % len$$1];
	        }
	        else {
	            if (i === 0 || i === len$$1 - 1) {
	                cps.push(clone$1(points[i]));
	                continue;
	            }
	            else {
	                prevPoint = points[i - 1];
	                nextPoint = points[i + 1];
	            }
	        }

	        sub(v, nextPoint, prevPoint);

	        // use degree to scale the handle length
	        scale(v, v, smooth);

	        var d0 = distance(point, prevPoint);
	        var d1 = distance(point, nextPoint);
	        var sum = d0 + d1;
	        if (sum !== 0) {
	            d0 /= sum;
	            d1 /= sum;
	        }

	        scale(v1, v, -d0);
	        scale(v2, v, d1);
	        var cp0 = add([], point, v1);
	        var cp1 = add([], point, v2);
	        // if (constraint) {
	        //     max(cp0, cp0, min$$1);
	        //     min(cp0, cp0, max$$1);
	        //     max(cp1, cp1, min$$1);
	        //     min(cp1, cp1, max$$1);
	        // }
	        cps.push(cp0);
	        cps.push(cp1);
	    }

	    if (isLoop) {
	        cps.push(cps.shift());
	    }

	    return cps;
	};
	function clone$1(v) {
	    var out = new ArrayCtor(2);
	    out[0] = v[0];
	    out[1] = v[1];
	    return out;
	}
	function distance(v1, v2) {
	    return Math.sqrt(
	        (v1[0] - v2[0]) * (v1[0] - v2[0])
	        + (v1[1] - v2[1]) * (v1[1] - v2[1])
	    );
	}
	function add(out, v1, v2) {
	    out[0] = v1[0] + v2[0];
	    out[1] = v1[1] + v2[1];
	    return out;
	}
	function sub(out, v1, v2) {
	    out[0] = v1[0] - v2[0];
	    out[1] = v1[1] - v2[1];
	    return out;
	}
	function scale(out, v, s) {
	    out[0] = v[0] * s;
	    out[1] = v[1] * s;
	    return out;
	}
	var arr=[[84.9023,42.148],[116.0046,28.6633],[115.1477,40.8527]];
	var cps=smoothBezier(arr,0.8,false,[[0, 0], [10000, 1000]]);
	cps.shift();
	cps.pop();
	console.log(cps);
	console.log("old\n");
	console.log(arr);
	var pathPointsArr=[];
	for(var j=0;j<arr.length;j++){
		if(j==arr.length-1){
			break;
		}
		var pointArr=[];
		var t=0;
		while(t<=1){
			var item=baz(arr[j],cps[j],arr[j+1],t);
			pointArr.push(item);
			t+=0.01;
		}
		var pathPoints=[];
		for(var i=0;i<pointArr.length;i++){
			pathPoints.push(new BMap.Point(pointArr[i][0], pointArr[i][1]));
		}
		pathPointsArr=pathPointsArr.concat(pathPoints);
	}
	console.log(pathPointsArr);
	var polyline = new BMap.Polyline(pathPointsArr, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}); 
	map.addOverlay(polyline);
	
	function baz(p0,cp,p2,t){
		var point=[];
		var temp=1-t;
		// var x= p0[0] * temp * temp * temp + 3 * p1[0] * t * temp * temp + 3 * p2[0] * t * t * temp + p3[0] * t * t * t;
  //       var y= p0[1] * temp * temp * temp + 3 * p1[1] * t * temp * temp + 3 * p2[1] * t * t * temp + p3[1] * t * t * t;
  		var x=temp*temp*p0[0]+2*t*temp*cp[0]+t*t*p2[0];
  		var y=temp*temp*p0[1]+2*t*temp*cp[1]+t*t*p2[1];
        point.push(x);
        point.push(y);
        return point;
	}
}
bMapEchart.prototype.baz=function(bazLineID,dazData,bazOption,gradualColor){
	var map=this.getMap();
	var that=this;
	var falg=false;  //鼠标是否缩放过
	var myChart=this.chart;
	var dazData=dazData;
	var arr=[];
	arr=dazData;
	var data=[];
	dropBezierCurve();
	// this.chart.on("geoRoam",function(params){
	// 	falg=true;
	// 	dropBezierCurve();
	// });
	// map.addEventListener('zoomend',function(evt){
	// 	console.log(evt);
	// 	console.log(bazLineID);
	// 	falg=true;
	// 	dropBezierCurve();
	// });
	function dropBezierCurve(){
		// if(that.disable){
		// 	return;
		// }
		var option=myChart.getOption();
		data=[];
		for(var i=0;i<arr.length;i++){
			//data.push(myChart.convertToPixel('geo',arr[i].coord));   //地理坐标转像素坐标
			//var point = new BMap.Point(84.9023,42.148);    
			//var pixel=map.pointToPixel(point);
			var point=map.pointToPixel(new BMap.Point(arr[i].coord[0],arr[i].coord[1]));
			data.push([point.x,point.y]); 
		}
		if(!option.graphic){
			option.graphic=[{}];
			option.graphic[0].elements=[];
		}
		if(falg){
			for(var j=0;j<option.graphic[0].elements.length;j++){
				if((option.graphic[0].elements[j].id==bazLineID) || (option.graphic[0].elements[j].type=="circle" && option.graphic[0].elements[j].bazLineID==bazLineID)){
					option.graphic[0].elements.splice(j,1);
					j-=1;
				}
			}
		}
		var strokeColor=bazOption.lineColor? bazOption.lineColor : '#000';
		if(gradualColor && gradualColor.isGradual){
			strokeColor=new echarts.graphic.LinearGradient(
                    gradualColor.direction[0], gradualColor.direction[1], gradualColor.direction[2], gradualColor.direction[3], 
                    gradualColor.colors
                );
		}
	    //线
		var polyline={
			type:"polyline",
			id:bazLineID,
			invisible:false,
			zlevel:0,
			z:2,
			shape:{
				points:data,
				smooth:0.5
			},
			 style:{
			 	lineWidth:bazOption.lineWidth ? bazOption.lineWidth:1,
	        	stroke:strokeColor,
	        },
		};
		option.graphic[0].elements.push(polyline);
	    //点
	    for(var i=0;i<data.length;i++){
	  		var ss={
	  			type: 'circle',
		        bazLineID:bazLineID,
		        textDesc:arr[i].name,
		        position: data[i],
		        shape: {
		            cx: 0,
		            cy: 0,
		            r: bazOption.spotRadius ? bazOption.spotRadius:5,
		        },
		        style:{
		        	fill:bazOption.spotColor ? bazOption.spotColor:'#000',
		        },
		        invisible: false,
		        draggable: true,
		        ondrag: echarts.util.curry(onPointDragging, i),
		        // onmousemove: echarts.util.curry(showTooltip, i),
		        // onmouseout: echarts.util.curry(hideTooltip),
		        z: 2
	  		}
		  	option.graphic[0].elements.push(ss);
		}
		myChart.setOption(option);

	}

	function showTooltip(dataIndex) {
	    var option=myChart.getOption();
	    var textObj={
	    	type:'text',
	    	invisible:false,
	    	style:{
	    		text:this.textDesc,
	    		x:this.position[0],
	    		y:this.position[1]-20,
	    		fill:"#fff"
	    	}
	    };
	     option.graphic[0].elements.push(textObj);
	     myChart.setOption(option,true);
	}

	function hideTooltip() {
	   var option=myChart.getOption();
	   for(var i=0;i<option.graphic[0].elements.length;i++){
		  if(option.graphic[0].elements[i].type=="text"){
		  	option.graphic[0].elements.splice(i,1);
		  	i-=1;
		  }
	   }
	   myChart.setOption(option,true);
	}

	function onPointDragging(dataIndex) {
	    var option=myChart.getOption();
	    data[dataIndex]=this.position;
	   //线的位置改变
	   var elements=option.graphic[0].elements;
	   var circleArr=[];     //小圆点数组
	   for(var i=0;i<elements.length;i++){
	   		if(elements[i].type=="polyline" && elements[i].id==this.bazLineID){
	   			 elements[i].shape.points=data;
	   		}
	   		if(elements[i].type=="circle" && elements[i].id==this.__ecGraphicId){    //点的位置改变
	   			elements[i].position=this.position;
	   		}
	   }
	   option.graphic.elements=elements;
	   // arr[dataIndex].coord=myChart.convertFromPixel("geo",this.position);
	   var p=new BMap.Pixel(this.position[0],this.position[1]);    //像素转地理坐标
	   var point=map.pixelToPoint(p);  
	   arr[dataIndex].coord=[point.lng,point.lat];
	   myChart.setOption(option,true);
	}

	function onPointWheel(){}
	console.log(this);
}
bMapEchart.prototype.dropBaz=function(){
	var map=this.getMap();
	//$(this.ele).html("div");
	// var id="view"; //transparency
	// var htm="<div id="+id+" style='width:100px;height:100px;background:rgb(0,0,0); position:absolute; top:0; left:0; z-index:-10;'></div>";
	// var warp=$(this.ele).parent();
	// $(warp).append($(htm));
	// console.log(map.getPanes());
	// map.getPanes().mapPane.appendChild($(htm));
	//this.ele.innerHTML=this.ele.innerHTML+htm;
	 //var odiv=document.getElementById(id);
	// var parentNode=this.ele.parentNode;
	// console.log(parentNode);
	//var odiv=document.getElementById(id);
	//parentNode.innerHTML += htm;
	//parentNode.appendChild(odiv);
	// var canvas=odiv.getElementsByTagName("canvas");
	// console.log(canvas);

	// 定义一个控件类，即function  
	function ZoomControl(){  
	    // 设置默认停靠位置和偏移量  
	    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;  
	    this.defaultOffset = new BMap.Size(0, 0);
	}  
	// 通过JavaScript的prototype属性继承于BMap.Control  
	ZoomControl.prototype = new BMap.Control();

	ZoomControl.prototype.initialize = function(map){  
    	// 创建一个DOM元素  
	    var div = document.createElement("div");  
	    // 添加文字说明  
	    //div.appendChild(document.createTextNode("放大2级"));  
	    div.appendChild(document.createElement("canvas"));
	    // 设置样式  
	    div.style.width="100%";
	     div.style.height="200px";
	    div.style.cursor = "pointer";  
	    div.style.border = "1px solid gray";  
	    div.style.backgroundColor = "transparency";  
	    // 绑定事件，点击一次放大两级  
	    div.onclick = function(e){  
	    	console.log(e);
	        map.zoomTo(map.getZoom() + 2);  
	    }  
	    // 添加DOM元素到地图中  
	    map.getContainer().appendChild(div);  
	    // 将DOM元素返回  
	    return div;  

	}
	// 创建控件实例  
	var myZoomCtrl = new ZoomControl();  
	// 添加到地图当中  
	map.addControl(myZoomCtrl);  
	map.addEventListener('click',function(e){
		console.log(e);
	});
}

//自定义导航风格
/*
pathArr:[]//路线点的数组
polylineStyle={
	strokeColor:'#00FA9A',    //线的颜色
	strokeWeight:2,           //线的宽度
	strokeOpacity:1,          //透明度
	strokeStyle:'solid'       //线的类型

};
imgOption:{
	imgPath:,                 //图片路劲
	width:,                   //宽
	height:,                  //高
	offset:[0,0]              //偏移量
}
*/
bMapEchart.prototype.customNavigation=function(pathArr,polylineStyle,imgOption){
	var map=this.getMap();
	var lushu;
	map.addOverlay(new BMap.Polyline(pathArr, polylineStyle));
	map.setViewport(pathArr);
	var myIcon = new BMap.Icon(imgOption.imgPath, new BMap.Size(imgOption && imgOption.width ? imgOption.width : 20, imgOption && imgOption.height ? imgOption.height:20), {    
		imageOffset: new BMap.Size(imgOption && imgOption.offset ? imgOption.offset[0]:0, imgOption && imgOption.offset ? imgOption.offset[1] : 0)  
	 });
	// var paths = pathArr.length;    //获得有几个点

	// var carMk = new BMap.Marker(pathArr[0],{icon:myIcon});
	// map.addOverlay(carMk);
	// i=0;
	// function resetMkPoint(i){
	// 	carMk.setPosition(pathArr[i]);
	// 	if(i < paths){
	// 		setTimeout(function(){
	// 			i++;
	// 			resetMkPoint(i);
	// 		},100);
	// 	}
	// }
	// setTimeout(function(){
	// 	resetMkPoint(5);
	// },100)
	lushu = new BMapLib.LuShu(map,pathArr,{
		defaultContent:"",
	    autoView:true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
	    icon  : myIcon,
	    speed: 4500,
	    enableRotation:true,//是否设置marker随着道路的走向进行旋转
	    landmarkPois:[]
 	});    
 	lushu.start();      

}

//获取地图对象
bMapEchart.prototype.getMap=function(){
	var bmap=this.chart.getModel().getComponent('bmap').getBMap();
	return bmap;
}

 //序列化
bMapEchart.prototype.serializable=function(){
 	var option=this.chart.getOption();
 	var data={
 		"name":this.mapName,
 		"option":option,
 		//"mapData":
 	};
 	this.serializableData.cmd=1;
 	this.serializableData.data.push(data);
 	// console.log(typeof option);
 	// console.log(this);
 	var serializableObj=JSON.stringify(data);
 	//console.log(serializableObj);
 	//console.log(JSON.stringify(this));
 }
 //反序列化
bMapEchart.prototype.deserialization=function(data){
 	var option=data.option;
 	chart=this.echarts.init(this.ele);
 	chart.setOption(option);
 }