function countMatches( str,  sub) {
            if (isEmpty(str) || isEmpty(sub)) {
                return 0;
            }
            var count = 0;
            var idx = 0;
            while ((idx = str.indexOf(sub, idx)) != -1) {
                count++;
                idx += sub.length;
            }
            return count;
        }
    
function isEmpty( str) {
            return str == null || str.length == 0;
}


function getCountofGood(line){
	var count=0;
	for(var i=0; i<goodArray.length;i++){
		count += countMatches(line.toLowerCase(), goodArray[i].toLowerCase());
	}	
	return count;
}

function getCountofEvil(line){
	var count=0;
	for(var i=0; i<evilArray.length;i++){
		count += countMatches(line.toLowerCase(), evilArray[i].toLowerCase());
	}	
	return count;
}

function getCountofCharacters(line){
	
 //Reset the count	
 wainamoinenCount = 0;
 ilmarinenCount = 0;
 ainoCount = 0;
 kullervoCount = 0;
 louhiCount = 0;
 lemminkainenCount = 0;
 mariattaCount = 0;
 
 for(var i=0; i<wainamoinenArray.length;i++){
	wainamoinenCount += countMatches(line.toLowerCase(), wainamoinenArray[i].toLowerCase());
 }
 
 for(var i=0; i<ilmarinenArray.length;i++){
	ilmarinenCount += countMatches(line.toLowerCase(), ilmarinenArray[i].toLowerCase());
 }
 
 for(var i=0; i<louhiArray.length;i++){
	louhiCount += countMatches(line.toLowerCase(), louhiArray[i].toLowerCase());
 } 
 
 for(var i=0; i<mariattaArray.length;i++){
	mariattaCount += countMatches(line.toLowerCase(), mariattaArray[i].toLowerCase());
 }

 for(var i=0; i<ainoArray.length;i++){
	ainoCount += countMatches(line.toLowerCase(), " "+ainoArray[i].toLowerCase());
 } 
 
 for(var i=0; i<kullervoArray.length;i++){
	kullervoCount += countMatches(line.toLowerCase(), kullervoArray[i].toLowerCase());
 }
 
 for(var i=0; i<lemminkainenArray.length;i++){
	lemminkainenCount += countMatches(line.toLowerCase(), lemminkainenArray[i].toLowerCase());
 }
 
}




function findMinIndex( arr ){

  var min=0;var index=0;
  for(var i=0;i<arr.length;i++){
     if(arr[i][0]<min){
       min = arr[i][0];
       index = i;
     }  
  }  
  return arr[index][1];
}


function findMaxIndex( arr ){

  var max =0;var index=0;
  for(var i=0;i<arr.length;i++){
     if(arr[i][0]>max){
       max = arr[i][0];
       index = i;
     }  
  }
  return arr[index][1];

}



function sample(arrayL, INTERPOLATION){
	
	var XBorder = 0;
 	var valuesGood = [];
  	var valuesEvil = [];
    var indexMaxGood = 0;  var indexMaxEvil = 0;
    var prevY = 0;
    var ret = []; 

	//Declaring 2d arrays
	for(var i = 0 ; i<INTERPOLATION ; i++){
		valuesGood[i] = [];
		valuesEvil[i] = [];
	}

	//Curve Sampling 
   for( i=0; i<arrayL.length;i++){
    var indexMinOverall = 0;
    var indexMaxOverall = 0;

      //Get first Intrerpolated : good : over the Xborder
       if(arrayL[i].getX() >= XBorder){ 
          valuesGood[indexMaxGood][0] =arrayL[i].getX();     
          valuesGood[indexMaxGood][1] = i;
          indexMaxGood++;
          //Check if we reached the Interpolated value or if the array is finished
         if(indexMaxGood>=INTERPOLATION || i>=arrayL.length-INTERPOLATION){
            indexMaxOverall = findMaxIndex(valuesGood);
         } 
      }
      
      // Get first interpolated : evil
      if(arrayL[i].getX() < -1*XBorder) {
        valuesEvil[indexMaxEvil][0] =arrayL[i].getX();
        valuesEvil[indexMaxEvil][1] = i;
        indexMaxEvil++;
        //Check if we reached the Interpolated value or if the array is finished
        if(indexMaxEvil>=INTERPOLATION || i>=arrayL.length-INTERPOLATION){
            indexMinOverall =findMinIndex(valuesEvil);
         } 
      }


    // If either x good in a row, or x bad in a row or the array reached to an end
   if( indexMaxEvil>=INTERPOLATION || indexMaxGood>=INTERPOLATION ){
      
     //The absolute evil is more that the good (in value) --> line to the left
      if(Math.abs(arrayL[indexMinOverall].getX()) > Math.abs(arrayL[indexMaxOverall].getX())){
   		ret.push(arrayL[indexMinOverall]);
   		prevY = arrayL[indexMaxOverall].getY();
     }
     if( Math.abs(arrayL[indexMinOverall].getX()) < Math.abs(arrayL[indexMaxOverall].getX())){ 
     	ret.push(arrayL[indexMaxOverall]);
     	prevY = arrayL[indexMaxOverall].getY();
     }
     indexMaxGood = 0;
     indexMaxEvil = 0;
    }

    if(i==arrayL.length-1){
      indexMinOverall = findMinIndex(valuesEvil);
      indexMaxOverall = findMaxIndex(valuesGood);
    
      if(arrayL[indexMinOverall].getY()>prevY){ 
			//do stuff
			
		}
       if(arrayL[indexMaxOverall].getY()>prevY ){ 
          //do stuff;
       }
    }
   }/*end of for loop*/
   
	return ret;
}