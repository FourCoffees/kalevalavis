$("#right_left").click( function(){
	
	if(	$('.containerBox #cube').hasClass('show-front') || $('.containerBox  #cube').hasClass('show-top')){
		$('svg').hide('slide',{ direction: "left" }, 499);
		sideView();
		$('svg').show('slide',{ direction: "left" }, 500);
		 var box = document.querySelector('.containerBox').children[0];
		 panelClassName = 'show-front';
 		$(box).removeClass( panelClassName );	
 		 panelClassName = 'show-right';
		 $(box).addClass( panelClassName );
		 
		 $('#right_left').attr("style", function() {
    		  return"  -webkit-transform:rotateY(0deg); "+
    		  			"-ms-transform: rotateY(0deg);"+
    		  			" -moz-transform: rotateY( 0deg );" +
    		  			" transform: rotateY( 0deg);"});

	}else if( $('.containerBox  #cube').hasClass('show-right') ||  $('.containerBox  #cube').hasClass('show-top')){
		
		$('svg').hide('slide',{ direction: "right" }, 499);
		
		initialView();

		$('svg').show('slide',{ direction: "right" }, 500);
	
		 var box = document.querySelector('.containerBox').children[0];
		 panelClassName = 'show-right';
 		$(box).removeClass( panelClassName );	
 		 panelClassName = 'show-front';
		 $(box).addClass( panelClassName );
		 
		
		 $('#right_left').attr("style", function() {
    		  return" -webkit-transform:rotateY(180deg); "+
    		  			"-ms-transform: rotateY(180deg);"+
    		  			" -moz-transform: rotateY( 180deg );" +
    		  			" transform: rotateY( 180deg);"});
		
	}
	
});

$("#up_down").click( function(){
		
	if( $('.containerBox  #cube').hasClass('show-front') ||  $('.containerBox  #cube').hasClass('show-right') ){
		 var box = document.querySelector('.containerBox').children[0];
		 panelClassName = 'show-front';
		 $(box).removeClass( panelClassName );
		 panelClassName = 'show-top';
		 $(box).addClass( panelClassName );
		
		$('#up_down').css("transform", "rotate(-90deg)");
		topView();

	}else if($('.containerBox  #cube').hasClass('show-top') ||  $('.containerBox  #cube').hasClass('show-right')){
		 var box = document.querySelector('.containerBox').children[0];
		 panelClassName = 'show-top';
		 $(box).removeClass( panelClassName);
		 panelClassName = 'show-front';
		 $(box).addClass( panelClassName );
		
		$('#up_down').css("transform", "rotate(90deg)");
		
		initialView();	
	}
});

$(document).ready(function (){ 

$("outro").attr("style", function() {
      return "-webkit-transform: translate("+($('#canvas').parent().width()/2 - $('#outro').width()/2)+"px,0);"+
  			 "-ms-transform: translate("+ ($('#canvas').parent().width()/2 - $('#outro').width()/2)+"px,0);"+
  			 "-moz-transform:  translate("+($('#canvas').parent().width()/2 - $('outro').width()/2)+"px,0);"+
  			 "transform: translate("+ ($('#canvas').parent().width()/2 - $('#outro').width())+"px,0);"+"}"
  });

 $("#footer").attr("style", function() {
      return "-webkit-transform: translate("+($('#canvas').parent().width() - 1000)/2+"px,0);"+
  			 "-ms-transform: translate("+ ($('#canvas').parent().width()- 1000)/2+"px,0);"+
  			 "-moz-transform:  translate("+($('#canvas').parent().width() -1000)/2+"px,0);"+
  			 "transform: translate("+ ($('#canvas').parent().width()- 1000)/2+"px,0);"+"}"
  });
  
  $("#tmpContainer").attr("style", function() {
      return "-webkit-transform: translate("+(-$('#canvas').parent().width()/2+ 300)+"px,0);"+
  			 "-ms-transform: translate("+ (-$('#canvas').parent().width()/2+ 300)+"px,0);"+
  			 "-moz-transform:  translate("+(-$('#canvas').parent().width()/2 +300)+"px,0);"+
  			 "transform: translate("+ (-$('#canvas').parent().width()/2+ 300)+"px,0);"+"}"
  });
	$("#containerRight").show();
	init();
});


var init = function() {
  var box = document.querySelector('.containerBox').children[0],
      showPanelButtons = document.querySelectorAll('#show-buttons button'),
      panelClassName = 'show-front',

      onButtonClick = function( event ){
        $(box).removeClass( panelClassName );
        panelClassName = event.target.className;
        $(box).addClass( panelClassName );
      };

  for (var i=0, len = showPanelButtons.length; i < len; i++) {
    showPanelButtons[i].addEventListener( 'click', onButtonClick, false);
  }
};