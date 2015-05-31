var points = [];

var svgContainer = d3.select("#canvas").append("svg").attr("id","vis")
                                     .attr("width",$('#canvas').parent().width())
                                     .attr("height",CanvasHeight+400);
                                     
var mainlineGraph;
                
var linearX = d3.scale.linear()
    .domain([-20, 20])
 	.range([$('#canvas').parent().width()/2-150 , $('#canvas').parent().width()/2+150]);

var linearScale = d3.scale.linear()                        
		.domain([0,2420])
        .range([2,CanvasHeight]);

var linearScaleX = d3.scale.linear()                        
		.domain([-20, 20])
        .range([50,$(window).height()]);

var linearScaleReverse = d3.scale.linear()                        
		.domain([0,CanvasHeight])
        .range([0,2420]);

var lineGraph = [];
        
svgContainer.append("g").attr("class", function(d,j){ return "totalg";});


svgContainer.append("g").attr("class", function(d,j){ return "g_0";});
svgContainer.append("g").attr("class", function(d,j){ return "g_1";});
svgContainer.append("g").attr("class", function(d,j){ return "g_2";});
svgContainer.append("g").attr("class", function(d,j){ return "g_3";});
svgContainer.append("g").attr("class", function(d,j){ return "g_4";});
svgContainer.append("g").attr("class", function(d,j){ return "g_5";});
svgContainer.append("g").attr("class", function(d,j){ return "g_6";});
svgContainer.append("text").attr('id',"leftText").text("").attr("fill",'white');
				
svgContainer.append('circle').attr("class", "marker_0").attr("r", 3).attr("fill", "#7f7f7f").attr("display", "none");
svgContainer.append('circle').attr("class", "marker_1").attr("r", 3).attr("fill", "#7f7f7f").attr("display", "none");
svgContainer.append('circle').attr("class", "marker_2").attr("r", 3).attr("fill", "#7f7f7f").attr("display", "none");
svgContainer.append('circle').attr("class", "marker_3").attr("r", 3).attr("fill", "#7f7f7f").attr("display", "none");
svgContainer.append('circle').attr("class", "marker_4").attr("r", 3).attr("fill", "#7f7f7f").attr("display", "none");
svgContainer.append('circle').attr("class", "marker_5").attr("r", 3).attr("fill", "#7f7f7f").attr("display", "none");
svgContainer.append('circle').attr("class", "marker_6").attr("r", 3).attr("fill", "#7f7f7f").attr("display", "none");
svgContainer.append('circle').attr("class", "marker").attr("r", 4).attr("fill", "#fffff").attr("display", "none");

svgContainer.append('circle').attr("class", "markerSelected").attr("r", 4).attr("fill", "#78CAD1").attr("display", "none");
 
initialView();

function initialView(){
 
 		
var legend = d3.select('#legend').append("svg")
                    .attr("width",$('#canvas').parent().width())
                    .attr("height",30)
                   		
legend.append('text').attr("x", linearX(-15)).attr('y',15).text("EVIL");   
legend.append('text').attr("x", linearX(12)).attr('y',15).text("GOOD");           
legend.append('line').attr("x1", linearX(10)).attr('y1',10)
					 .attr("x2", linearX(-10)).attr('y2',10)
					 .attr("stroke", "#fff");
legend.append('line').attr("x1", linearX(0)).attr('y1',7)
					 .attr("x2", linearX(0)).attr('y2',15)
					 .attr("stroke", "#fff");

var bottomLine = d3.select('#bottomLine').append("svg")
                    .attr("width",$('#canvas').parent().width())
                    .attr("height",50);
                    
bottomLine.append('line').attr("x1", linearX(0)).attr('y1',0)
					 .attr("x2", linearX(0)).attr('y2',50)
					 .attr("stroke", "#fff");
    
var topLine = d3.select('#topLine').append("svg")
                    .attr("width",$('#canvas').parent().width())
                    .attr("height",50);
                    
topLine.append('line').attr("x1", linearX(0)).attr('y1',0)
					 .attr("x2", linearX(0)).attr('y2',50)
					 .attr("stroke", "#fff");
                                      
var prevYsize = 0;

for( var i = 0; i< characters.length; i++){
 	characterLinesChar = [];
	indexX = 0;
	var sampledChar = sample(characters[i],3);
	sampledChar.sort(function(a, b) {
		return a.y - b.y;
	});
	for(var j=3; j<sampledChar.length; j+=3){
		characterLinesChar[indexX] = new Line(sampledChar[0].getCharacter(), sampledChar[j-3], sampledChar[j], sampledChar[j-2] ,sampledChar[j-1], sampledChar[0].color);
		indexX ++;
	}		
 	updateCharacters(characterLinesChar,i,'initialView');
}

characterLinesTotalLocal = [];
indexX = 0;
var sampled = sample(total,3);
sampled.sort(function(a, b) {
	return a.y - b.y;
});

sampled.splice(0,208);

total.sort(function(a, b) {
	return a.y - b.y;
});

for( var j=3; j<sampled.length; j+=3){
	characterLinesTotalLocal[indexX] = new Line(sampled[0].getCharacter(), sampled[j-3], sampled[j], sampled[j-2] ,sampled[j-1], sampled[0].color);
	indexX ++;
}

characterLinesTotalLocal[indexX] = new Line(total[total.length-1].getCharacter(), sampled[sampled.length-1], total[total.length-1], total[total.length-2] ,total[total.length-3], sampled[0].color);

updateTotal(characterLinesTotalLocal,'initialView');	

startOnclickInitial();


prevYsize = 10;
svgContainer.append('g').attr("class", "titles")
							.selectAll('text.chapters')
	   						.data(chapters)
						 	.enter().append("svg:text")
                            .text(function(d){ return (d.name).substring(0,  d.name.length - 1); })
                            .attr("dy", function(d, i) { 
									if(i>0){
									prevYsize += d.size;
                            		return linearScale(prevYsize); 
                            	}else{
                            		return linearScale(prevYsize);
                            	}
                            	})
  							.attr("dx", $('#canvas').parent().width()/2+ 450);
  
prevYsize = 10; 
svgContainer.append('g').attr("class", "title_numbers")
							.selectAll('text.numbers')
	   						.data(chapters)
						 	.enter().append("svg:text")
                            .text(function(d){ return (d.number); })
                            .attr("dy", function(d, i) { 
									if(i>0){
									prevYsize += d.size;
                            		return linearScale(prevYsize); 
                            	}else{
                            		return linearScale(prevYsize);
                            	}
                            })
  							.attr("dx", $('#canvas').parent().width()/2+ 480)  
  							.attr("class", "numbers");	
  							
$('#visualisationSubtitle').text('1 – The Battle of Good and Evil');												
$('circle.marker').attr("display","inline");							
$("#outro span, #bottomLine, #topLine").show();
d3.selectAll(".legendSideView").remove();
d3.selectAll(".legendTopView").remove();
$(".totalg").show();
$(".titles, .numbers").show();

mouseMoveInitialView();
}

function sideView(){

	for( var i = 0; i< characters.length; i++){
 		characterLines2 = [];
		indexX = 0;
		sampled = sample(characters[i],3);
		sampled.sort(function(a, b) {
			return a.y - b.y;
		});
		characterLines2[indexX] = new Line(sampled[0].getCharacter(), sampled[0],sampled[sampled.length-1], 0 ,0, sampled[0].color);
	 	
	 	updateCharacters(characterLines2, i, 'sideView');
		
		
	    d3.selectAll(".g_"+i+" > path").each(function (d) {
  		  var t = document.createElementNS(svgNS,'text');
		  d3.select(t).property("__data__", d);
  		  this.parentNode.insertBefore(t, this.nextSibling);       
		});
		
		d3.select(".g_"+i).selectAll("text")//.attr("transform", "translate(,100)")
										.attr("class","legendSideView")
									   .text(function(d){ return d.characterName.toUpperCase(); })
	 								   .attr("x", function(d){ return getXallongStraightLine(d) - (8*d.characterName.length/2);})
	 								   .attr("dy", 10)
	 								   .attr("fill", "#fff");
	}
	
	$('#visualisationSubtitle').text('2 – The Heroes');
	
	
	$("#outro span").hide();
	$("#bottomLine, #topLine").remove();
	d3.selectAll(".legendTopView").remove();
	$("#legend").empty();
	$(".totalg").hide();
	$('circle.marker').attr("display","none");							
	$(".titles, .numbers").remove();
	startOnclickSide();
	mouseMoveSideView();
}
 
function topView(){
 	
 	for( var i = 0; i< characters.length; i++){
 		characterLines3 = [];
		indexX = 0;
		sampledTop = characters[i];
		sampledTop.sort(function(a, b) {
			return a.x - b.x;
		});
	 	
	 	for(var j=1; j<sampledTop.length; j+=1){
			characterLines3[indexX] = new Line(sampledTop[0].getCharacter(), sampledTop[j-1],sampledTop[j], 0 ,0, sampledTop[0].color);
			indexX ++;
		}		
	 	updateCharacters(characterLines3, i, 'topView');
		
	    d3.selectAll(".g_"+i).each(function(){
  		  var t = document.createElementNS(svgNS,'text');
		  d3.select(t).property("__data__", function(){ 
		  		console.log( d3.selectAll(".g_"+i+' path')[0][0]['__data__'].characterName);
		  		return d3.selectAll(".g_"+i+' path')[0][0]['__data__'].characterName;
		  });
  		  this.appendChild(t);       
		});
		
		d3.select(".g_"+i).selectAll("text")
										.attr("class","legendTopView")
									   .text(function(d){ return d.toUpperCase(); })
	 								   .attr("x", function(d){ return getXallongStraightLine(d) - (8*d.length/2);})
	 								   .attr("dy", 10)
	 								   .attr("fill", "#fff");
	}
	
	$('#visualisationSubtitle').text('3 – The Good and the Bad');
	d3.selectAll(".legendSideView").remove();
	$("#outro span, #bottomLine, #topLine").hide();
	$("#legend").empty();
	$(".totalg").hide();
	$('circle.marker').attr("display","none");							
    $(".titles, .numbers").hide();

//	mouseMoveTopView();
 
 
 }
 
function lineCurved(d){
  return "M"+linearX(d.startX())+","+linearScale(d.startY())+" "
         +"Q"+linearX(d.control1X())+","+linearScale(d.control1Y())+" "
         //+" "+linearX(d.control2X())+","+linearScale(d.control2Y())+" "
         +""+linearX(d.endX())+","+linearScale(d.endY());
}

function line(d){
character = d.characterName;
	if(character === 'mariatta'){
		x = $('#canvas').parent().width()/2+400;
	}else if(character === "kullervo"){
		x= $('#canvas').parent().width()/2+310;
	}else if(character === "lemminkainen"){
		x = $('#canvas').parent().width()/2+220;
	}else if(character === "louhi"){
		x = $('#canvas').parent().width()/2+130;
	}else if(character === "ilmarinen"){
		x = $('#canvas').parent().width()/2+40;
	}else if(character === "aino"){
		x = $('#canvas').parent().width()/2-50;
	}else if(character === "wainamoinen"){
		x = $('#canvas').parent().width()/2-150;
	}
  return "M"+x+","+linearScale(d.startY())+"L"+x+","+linearScale(d.endY());
}

function lineX(d){
character = d.characterName;
	if(character === 'mariatta'){
		x = $('#canvas').parent().width()/2+400;
	}else if(character === "kullervo"){
		x= $('#canvas').parent().width()/2+310;
	}else if(character === "lemminkainen"){
		x = $('#canvas').parent().width()/2+220;
	}else if(character === "louhi"){
		x = $('#canvas').parent().width()/2+130;
	}else if(character === "ilmarinen"){
		x = $('#canvas').parent().width()/2+40;
	}else if(character === "aino"){
		x = $('#canvas').parent().width()/2-50;
	}else if(character === "wainamoinen"){
		x = $('#canvas').parent().width()/2-150;
	}
  return "M"+x+","+linearScaleX(d.startX())+"L"+x+","+linearScaleX(d.endX());
}

function updateTotal(characterLinesInput, whoCalls){ 
 
 var tmpG = svgContainer.select('.totalg');
    
 mainlineGraph = tmpG.selectAll('path.old')
	   						.data(characterLinesInput);

 mainlineGraph.enter().append("path");
 mainlineGraph.transition().attr("d", function(d) {
                     	if(whoCalls == 'initialView'){
							d3.select(this).classed('old',true);
							return lineCurved(d);
						}else if( whoCalls == 'sideView'){
							d3.select(this).classed('old',true);
							return line(d);
					    }
					  });
					
  mainlineGraph.attr("stroke", function(d,j){ return "#fff";})
		   .attr("stroke-width",2.5)
		   .attr("opacity", 1)
		   .attr("fill", "none");
	

  // Get points:
  mainlineGraph.on('click', function() {
				d3.select('#leftText').selectAll("*").remove();
				d3.selectAll('line.indicator').remove();
				
				var mouse = d3.mouse(this);								
				
				tmpPath  = mainlineGraph.filter(function(d){
					return (d.start.y > linearScaleReverse(mouse[1]) && d.end.y < linearScaleReverse(mouse[1]) );
				});

				index = Math.floor(linearScaleReverse(mouse[1]));

				spans = (total[index].line).split('\n');
				
				d3.select('#leftText').attr("transform","translate(0,"+mouse[1]+")");
			
			  for(var l = 1; l<spans.length; l++){
 				d3.select('#leftText').append('tspan').text(spans[l]).attr("dy", 0).attr("x",0);
			  }
		});
		
  mainlineGraph.exit().remove();

}

function updateCharacters(characterLinesInput,index, whoCalls){

tmpG = svgContainer.select('.g_'+index);
tmpG.selectAll('rect').remove();

lineGraph[index] = tmpG.selectAll('path.old')
	   						.data(characterLinesInput);
     
lineGraph[index].enter().append("path");

lineGraph[index].transition().attr("d", function(d) {
						if(whoCalls == 'initialView'){
							d3.select(this).classed('old',true);
							return lineCurved(d);
						}else if( whoCalls == 'sideView'){
							d3.select(this).classed('old',true);
							return line(d);
					    }else if(whoCalls == 'topView'){
					    	d3.select(this).classed('old',true);
							return lineX(d);
					    }
					    });
					    
lineGraph[index].attr("stroke", function(d,j){ return characters[index][0].color;})
           		.attr("stroke-width", 2)
			    .attr("opacity",1)
			    .attr("stroke-dasharray",function(d) {return characterLinesInput.length > 1 ? "2,2" : "2,2" })
			    .attr("fill", "none");
			
 lineGraph[index].append("svg:title").text(function(d) { return d.start.getCharacter(); });
						
 lineGraph[index].exit().remove();
 
 //Add starting and ending points
 endPoint = lineGraph[index].filter(function(d,i){ return i==(lineGraph[index][0].length-1) ? true: false;})[0];		
 
 rectEnd = tmpG.append('rect')
 		.attr("x", function(d){
 			if(whoCalls == 'initialView'){
 				return  linearX(endPoint[0]['__data__'].end.x)-3;
 		   }else{
 		   		return  getXallongStraightLine(endPoint[0]['__data__']);
 		   	}
 		 })
 		.attr("y", function(d) {
 				if(whoCalls == 'initialView' || whoCalls == 'sideView'){
 					return linearScale(endPoint[0]['__data__'].end.y)-3;
 				}else{
 				 	return linearScaleX(endPoint[0]['__data__'].end.x)-3;
 				}
 		});
 
 rectEnd.attr('width',6).attr("height", 6)
 		.attr("transform","rotate(45,"+(rectEnd.attr("x"))+","+ (rectEnd.attr("y"))+")")
 		.attr("fill","#CEBB6A").attr('stroke','#fff').attr('stroke-weight',1);
 
 startPoint = lineGraph[index].filter(function(d,i){ return i==0 ? true: false;})[0];		
 rectStart = tmpG.append('rect')
 			.attr("x", function(d) {
 			 	if(whoCalls == 'initialView'){
 					return linearX(startPoint[0]['__data__'].start.x)-3;
 				}else{
 					return getXallongStraightLine(startPoint[0]['__data__'].start);
 				}
 			 })
 			.attr("y", function(d) {
 				if(whoCalls == 'initialView' || whoCalls == 'sideView'){
 					return linearScale(startPoint[0]['__data__'].start.y)-3;
 				}else{
 				 	return linearScaleX(startPoint[0]['__data__'].start.x)-3;
 				}
 			});
 			
 rectStart.attr('width',6).attr("height", 6)
 			.attr("transform","rotate(45,"+(rectStart.attr("x"))+","+ (rectStart.attr("y"))+")")
 			.attr("fill","#CEBB6A").attr('stroke','#fff').attr('stroke-weight',1);
 			
 
			
}

function startOnclickInitial(){
	tmpPath = [];
	tmpPath1 = d3.selectAll('.totalg path')[0];
	tmpPath[0] = tmpPath1[0];
	
	d3.select('#leftText').selectAll("*").remove();

	//console.log(tmpPath[0]);
	
	index = Math.floor(linearScaleReverse(1));
	
	spans = (total[index].line).split('\n');
	
	//Add space for characters names
	namesChar = d3.select('#leftText').append('tspan').attr("dy", 20).attr("x",0).attr("class","characterNames");
	nam = "";
	for(var j=0;j <7; j++){
		if(typeof tmpPath[j+1] !="undefined"){
			nam +=  tmpPath[j+1]['__data__'].characterName+"     ";
		}
	}
	namesChar.text(nam.toUpperCase());
	d3.select('#leftText').append('tspan').attr("dy", 20).attr("x",0).text("–");


	for(var l = 1; l<spans.length; l++){
		d3.select('#leftText').append('tspan').text(spans[l]).attr("dy",  25).attr("x",0).attr("class","paragraph");
	}
		d3.select('#leftText').attr("transform","translate("+($('#canvas').parent().width()/2 - 500)+",1)")
			 .append('tspan').text(' ..').attr("class","paragraph");

	d3.select('circle.markerSelected')
			.attr("cx", function() { return linearX(tmpPath[0]['__data__'].start.x) - 1.5;})
			.attr("cy", function() { return linearScale(tmpPath[0]['__data__'].start.y);})
			.attr("display","inline");
}

function mouseMoveInitialView(){
	d3.select('svg#vis').on('mousemove', function(){
	
	var mouse = d3.mouse(this);								
	tmpPath = [];
	
	if(	mouse[0] > 243){
		
		//Use for-break instead
		if(mouse[1] > CanvasHeight){
				size = d3.selectAll('path.total')[0].length;
				tmpPath1 = d3.selectAll('path.total')[0];
				tmpPath[0] = tmpPath1[size-1];
				
				for(var j=0; j<7;j++){
				  size = d3.selectAll('g.'+index+' path')[0].length;
				  tmpPath1 = d3.selectAll('g.'+index+' path')[0];
				  tmpPath[j+1] = tmpPath1[size-1];
				}
				
		}else{
			 tmpPath[0] = mainlineGraph.filter(function(d){
				return (d.start.getY() <= linearScaleReverse(mouse[1]) && d.end.getY() >= linearScaleReverse(mouse[1]));
			})[0][0];
			
			for(var j=0; j<7;j++){
			 tmpPath[j+1] = lineGraph[j].filter(function(d){
				return (d.start.getY() < linearScaleReverse(mouse[1]) && d.end.getY() > linearScaleReverse(mouse[1]));
			})[0][0];
			}		
		}
		//Update the cirle marker for the main line	
		if(typeof tmpPath[0] != "undefined"){
			d3.select('circle.marker')
				.attr("cx", function() {
					 return getXallongPath(tmpPath[0], mouse[1]).x;})
				.attr("cy", function() { 
					return getXallongPath(tmpPath[0], mouse[1]).y;})
				.attr("display","inline").attr("fill","#fff");
		}else{
		
		}		
		//Update the rest of the lines
		for(var j=0; j<7;j++){
			   if(typeof tmpPath[j+1] != "undefined"){
			  	d3.select('circle.marker_'+j)
					.attr("cx", function() {
						 return getXallongPath(tmpPath[j+1], mouse[1]).x;})
					.attr("cy", function() { 
						//return getXallongPath(tmpPath[j+1], mouse[1]).y;
						return getXallongPath(tmpPath[0], mouse[1]).y;
						})
					.attr("display","inline");
				}else{
					d3.select('circle.marker_'+j).attr("display","none");
				}
			}
		
		}/*End of if mouse>273*/
	})
	.on('click', function(){
		mouse = d3.mouse(this);								
		tmpPath = [];
		if(	mouse[0] > 243){
			
			d3.select('#leftText').selectAll("*").remove();

			if(mouse[1] > CanvasHeight){
				size = d3.selectAll('path.total')[0].length;
				tmpPath1 = d3.selectAll('path.total')[0];
				tmpPath[0] = tmpPath1[size-1];
				
				for(var j=0; j<7;j++){
				  size = d3.selectAll('g.'+index+' path')[0].length;
				  tmpPath1 = d3.selectAll('g.'+index+' path')[0];
				  tmpPath[j+1] = tmpPath1[size-1];
				}
				index = Math.floor(linearScaleReverse(tmpPath[0]['__data__'].end.y));			   //console.log("INDEX "+index);

			}else{
				 tmpPath[0] = mainlineGraph.filter(function(d){
					return (d.start.getY() <= linearScaleReverse(mouse[1]) && d.end.getY() >= linearScaleReverse(mouse[1]));
				})[0][0];
			
				for(var j=0; j<7;j++){
					 tmpPath[j+1] = lineGraph[j].filter(function(d){
						return (d.start.getY() < linearScaleReverse(mouse[1]) && d.end.getY() > linearScaleReverse(mouse[1]));
					})[0][0];
				}		
				index = Math.floor(linearScaleReverse(mouse[1]));
			}
		
		spans = (total[index].line).split('\n');
		
		//Add space for characters names
		namesChar = d3.select('#leftText').append('tspan').attr("dy", 20).attr("x",0).attr("class","characterNames");
		nam = "";
		for(var j=0;j <7; j++){
			if(typeof tmpPath[j+1] !="undefined"){
				nam +=  tmpPath[j+1]['__data__'].characterName+" ";
			}
		}
		namesChar.text(nam.toUpperCase());
	    d3.select('#leftText').append('tspan').attr("dy", 20).attr("x",0).text("–");


		for(var l = 1; l<spans.length; l++){
			d3.select('#leftText').append('tspan').text(spans[l]).attr("dy",  25).attr("x",0).attr("class","paragraph");
		}
		d3.select('#leftText').attr("transform","translate("+($('#canvas').parent().width()/2 -500)+","+getXallongPath(tmpPath[0], mouse[1]).y+")")
			 .append('tspan').text(' ..').attr("class","paragraph");

		d3.select('circle.markerSelected')
				.attr("cx", function() { return getXallongPath(tmpPath[0], mouse[1]).x;})
				.attr("cy", function() { return getXallongPath(tmpPath[0], mouse[1]).y;})
				.attr("display","inline")
				.attr("fill","#78CAD1");
	}
	});				
}

function startOnclickSide(){

d3.select('#leftText').selectAll("*").remove();
tmpPath = [];
lineGraphindexChar = getApproximation(0);
tmpPath1 = lineGraph[lineGraphindexChar][0];
tmpPath[0] = tmpPath1[0];

index = 0;

//0 wainamoinen, 1 ilmarinen, 2 aino, 3 lemminkainen, 4 kullervo, 5 louhi, 6 mariatta 
name = tmpPath[0]['__data__'].characterName;

 for(var k=0; k<7;k++){
		if(characters[k][0].character === name){			
			if(name ==='wainamoinen'){ tmp = 0;}
			if(name === 'ilmarinen'){ tmp= 1;}
			if(name === 'aino'){ tmp=2;}
			if(name === 'lemminkainen'){tmp =3;}
			if(name === 'kullervo'){ tmp = 4;}
			if(name === 'louhi'){ tmp = 5;}
			if(name === 'mariatta'){ tmp = 6; }
			break;
		}
	}
		
	var linearScaleReverseStraight = d3.scale.linear()                        
										.domain([0,CanvasHeight])
      									.range([1,characters[tmp].length]);
		    
	spans = (characters[tmp][Math.floor(linearScaleReverseStraight(index))].line).split('\n');
	    
	

	for(var l = 1; l<spans.length; l++){
		d3.select('#leftText').append('tspan').text(spans[l]).attr("dy",  25).attr("x",0).attr("class","paragraph");
	}
	
	d3.selectAll('#leftText').attr("transform","translate(99,1)")
		 .append('tspan').text(' ..').attr("class","paragraph");

	d3.select('circle.markerSelected')
			.attr("cx", function() { return getXallongStraightLine();})
			.attr("cy", function() { return linearScale(tmpPath[0]['__data__'].start.y);})
			.attr("display","inline");
		
}

function mouseMoveSideView(){

d3.select('svg#vis').on('mousemove', function(){
	var mouse = d3.mouse(this);								
	tmpPath = [];
	
	if(	mouse[0] > 243){
		//Use for-break instead
		if(mouse[1] > CanvasHeight){
				for(var j=0; j<7;j++){
				  size = d3.selectAll('g.'+index+' path')[0].length;
				  tmpPath1 = d3.selectAll('g.'+index+' path')[0];
				  tmpPath[j+1] = tmpPath1[size-1];
				}
		}else{
			
			for(var j=0; j<7;j++){
			 tmpPath[j+1] = lineGraph[j].filter(function(d){
				return (d.start.getY() < linearScaleReverse(mouse[1]) && d.end.getY() > linearScaleReverse(mouse[1]));
			})[0][0];
			
			  d3.select('circle.marker_'+j).attr("fill","#7f7f7f");
			}	
			
			lineGraphindexChar = getApproximation(mouse[0]);
		    tmpPath[0] = lineGraph[lineGraphindexChar].filter(function(d){
		 		return (d.start.getY() <= linearScaleReverse(mouse[1]) && d.end.getY() >= linearScaleReverse(mouse[1]));
			})[0][0];
			
			 d3.select('circle.marker_'+lineGraphindexChar).attr("fill","#fff");
		     
		}
		
		//Update the rest of the lines
		for(var j=0; j<7;j++){
			   if(typeof tmpPath[j+1] != "undefined"){
			  	d3.select('circle.marker_'+j)
					.attr("cx", function() {
						 return getXallongPath(tmpPath[j+1], mouse[1]).x;})
					.attr("cy", function() { 
  						 return getXallongPath(tmpPath[j+1], mouse[1]).y;
						})
					.attr("display","inline");
				}else{
					d3.select('circle.marker_'+j).attr("display","none");
				}
		}
	}
	})
	.on('click', function(){
	d3.select('#leftText').selectAll("*").remove();
	var mouse = d3.mouse(this);	
	tmpPath = [];
	
	if(	mouse[0] > 243){
		//Use for-break instead
		if(mouse[1] > CanvasHeight){
			    lineGraphindexChar = getApproximation(mouse[0]);
				size = lineGraph[lineGraphindexChar][0].length;
				tmpPath1 = lineGraph[lineGraphindexChar][0];
				tmpPath[0] = tmpPath1[size-1];
				
				for(var j=0; j<7;j++){
				  size = d3.selectAll('g.'+index+' path')[0].length;
				  tmpPath1 = d3.selectAll('g.'+index+' path')[0];
				  tmpPath[j+1] = tmpPath1[size-1];
				}
								  
				index = canvasHeight;

		}else{
			
			for(var j=0; j<7;j++){
			 tmpPath[j+1] = lineGraph[j].filter(function(d){
				return (d.start.getY() < linearScaleReverse(mouse[1]) && d.end.getY() > linearScaleReverse(mouse[1]));
			})[0][0];
			
			  d3.select('circle.marker_'+j).attr("fill","#7f7f7f");
			}	
			
			lineGraphindexChar = getApproximation(mouse[0]);
		    tmpPath[0] = lineGraph[lineGraphindexChar].filter(function(d){
		 		return (d.start.getY() <= linearScaleReverse(mouse[1]) && d.end.getY() >= linearScaleReverse(mouse[1]));
			})[0][0];
			
			 d3.select('circle.marker_'+lineGraphindexChar).attr("fill","#fff");
		     index = mouse[1];

		}
		
		//0 wainamoinen, 1 ilmarinen, 2 aino, 3 lemminkainen, 4 kullervo, 5 louhi, 6 mariatta 
		 name = tmpPath[0]['__data__'].characterName;
		
		for(var k=0; k<7;k++){
			if(characters[k][0].character === name){			
				if(name ==='wainamoinen'){ tmp = 0;}
				if(name === 'ilmarinen'){ tmp= 1;}
				if(name === 'aino'){ tmp=2;}
				if(name === 'lemminkainen'){tmp =3;}
				if(name === 'kullervo'){ tmp = 4;}
				if(name === 'louhi'){ tmp = 5;}
				if(name === 'mariatta'){ tmp = 6; }
				break;
			}
		}
		
		var linearScaleReverseStraight = d3.scale.linear()                        
										.domain([0,CanvasHeight])
      									.range([1,characters[tmp].length]);
		    
		spans = (characters[tmp][Math.floor(linearScaleReverseStraight(index))].line).split('\n');
		
	    
	     //Add space for characters names
		namesChar = d3.select('#leftText').append('tspan').attr("dy", 20).attr("x",0).attr("class","characterNames");
		namesChar.text(name.toUpperCase());

	    
	    
	    d3.select('#leftText').append('tspan').attr("dy", 20).attr("x",0).text("–");

		for(var l = 1; l<spans.length; l++){
			d3.select('#leftText').append('tspan').text(spans[l]).attr("dy",  25).attr("x",0).attr("class","paragraph");
		}
		d3.select('#leftText').attr("transform","translate("+($('#canvas').parent().width()/2 -500)+","+getXallongPath(tmpPath[0], mouse[1]).y+")")
			 .append('tspan').text(' ..').attr("class","paragraph");

		d3.select('circle.markerSelected')
				.attr("cx", function() { return getXallongPath(tmpPath[0], mouse[1]).x;})
				.attr("cy", function() { return getXallongPath(tmpPath[0], mouse[1]).y;})
				.attr("display","inline");
	}
			
	
	});
}

function getApproximation(mouseX){

	var charact  = "";
	if(mouseX > $('#canvas').parent().width()/2+350){
		charact = "mariatta";
	}else if(mouseX > $('#canvas').parent().width()/2+280 && mouseX < $('#canvas').parent().width()/2+350 ){
		charact = "kullervo";
	}else if(mouseX > $('#canvas').parent().width()/2+180 && mouseX < $('#canvas').parent().width()/2+280){
		charact = "lemminkainen";
	}else if(mouseX > $('#canvas').parent().width()/2 + 90 && mouseX < $('#canvas').parent().width()/2+180){
		charact = "louhi";
	}else if(mouseX > $('#canvas').parent().width()/2 && mouseX < $('#canvas').parent().width()/2 + 90){
		charact =  "ilmarinen";
	}else if(mouseX > $('#canvas').parent().width()/2 - 90 && mouseX < $('#canvas').parent().width()/2){
		charact = "aino";
	}else if( mouseX <  $('#canvas').parent().width()/2-90){
		charact = "wainamoinen";
	}
	

	for(var p =0; p< 7; p++){
		if(charact === lineGraph[p][0][0]['__data__'].characterName){
			return p;
		}
	}
}

function getXallongPath(path,y3) {
 
  var l = path.getTotalLength();
 // ymax = path.getPointAtLength(l).y;
  
  ymax = path.getBBox().height;
  ymin = path.getPointAtLength(0).y;

	
  var t = (y3 - ymin) / ymax ;  
  var p = path.getPointAtLength(t * l); 
  return p;

}

function getXallongStraightLine(d){
	if(typeof d === 'undefined'){
		character = 'wainamoinen';
	}else{ character = d.character;}
	
	if(character === 'mariatta'){
		x = $('#canvas').parent().width()/2+400;
	}else if(character === "kullervo"){
		x= $('#canvas').parent().width()/2+310;
	}else if(character === "lemminkainen"){
		x = $('#canvas').parent().width()/2+220;
	}else if(character === "louhi"){
		x = $('#canvas').parent().width()/2+130;
	}else if(character === "ilmarinen"){
		x = $('#canvas').parent().width()/2+40;
	}else if(character === "aino"){
		x = $('#canvas').parent().width()/2-50;
	}else if(character === "wainamoinen"){
		x = $('#canvas').parent().width()/2-150;
	}
	
	return x;
}

