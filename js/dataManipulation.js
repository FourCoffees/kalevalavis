
//Creating an array with class Chapter instances
for(var i=1; i<chapterArray.length;i++){

	//get title and extra new lines
	title = chapterArray[i].split('\n\n\n');
		
	//get title and remove the extra new line
	number = title[0].substring(0, title[0].length -1 ).split(" ")[1]; 
	name = title[1].replace(/(\r\n|\n|\r)/gm,"");
	lines = title[2].split('.');
	
	//add to allLines counting
	allLines += lines.length;	

	chapters[i] =new Chapter(lines, name, number);
}

chapters[0] = new Chapter(chapterArray[0],"INTRO.", "");
//start from bottom (in web its top) and keep increasing (going downwards)...
var y=0;	

//For each chapter
for(var i=1; i<chapters.length;i++){
	//For each line in chapter
	for(var j=0; j<chapters[i].getSize(); j++){
		
		//check character counts maybe asycronous?
		getCountofCharacters(chapters[i].getLine(j));
		
		//calculate the x value: good vs evil
		var x = calculateX(chapters[i].getLine(j));		
	
		//Calculate how much space that chapter has
		var totalChapterYsize = (chapters[i].getSize()) / allLines * CanvasHeight;
	
		//calculate the y value: total space / length of chapter = unit to increase
		y += 1;
		
		total.push(new PointData(0, 'Kalevala', chapters[i].getLine(j), x, y, "#ff0000",i));
		
		//Add to array of that character
		//0 wainamoinen, 1 ilmarinen, 2 aino, 3 lemminkainen, 4 kullervo, 5 louhi, 6 mariatta 
		if( wainamoinenCount>0){
			characters[0].push(new PointData(0, 'wainamoinen', chapters[i].getLine(j), x, y, "#fff",i));
		}
		if( ilmarinenCount>0){
			characters[1].push(new PointData(1, 'ilmarinen', chapters[i].getLine(j), x, y, "#fff",i));
		}
		if( ainoCount>0){
			characters[2].push(new PointData(2, 'aino', chapters[i].getLine(j), x, y, "#fff",i));
		}
		if( lemminkainenCount>0){
			characters[3].push(new PointData(3, 'lemminkainen', chapters[i].getLine(j), x, y, "#fff",i));
		}
		if( kullervoCount>0){
			characters[4].push(new PointData(4, 'kullervo', chapters[i].getLine(j), x, y,  "#fff",i));
		}
		if( louhiCount>0){
			characters[5].push(new PointData(0, 'louhi', chapters[i].getLine(j), x, y,  "#fff",i));
		}
		if( mariattaCount>0){
			characters[6].push(new PointData(0, 'mariatta', chapters[i].getLine(j), x, y, "#fff",i));
		}
	
	}/*end of lines in chapter i*/
}/*end of chapter*/



function calculateX(textLine){
	
	var goodCount = getCountofGood(textLine);
    var  evilCount = getCountofEvil(textLine);

	var x = goodCount - evilCount;
	var multi = 10;
	
	/*var x = d3.scale.linear()
    .domain([0, max])
    .range([0, 420]);
	*/
	
 /* 	var multi = d3.scale.linear()
  			.domain([-1, 1])
  			.range([-MAXx, MAXx]);

	console.log(x);
  */
  return x;

}