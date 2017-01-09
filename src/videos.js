window.onload = function (){
/*
	videoSlider();
	showFirstVideo();
	$('.secondary-video').click(function(e){
	showvideo(e.currentTarget.childNodes[1]);
	})
	$('.nextIconLeft').click(function(e){
	videoSliderLeft();
	})
	$('.nextIconRight').click(function(e){
	videoSliderRight();
	})
*/
}
function videoSlider(){
    //$("div").animate({left: '250px';
    var videos = document.getElementsByClassName("secondary-video");
    if(videos.length>=4){
		for (var i = 0; i < videos.length; i++) {
			if(i>=4){
				videos[i].childNodes[1].style.display='block';
			}
		}
	}else if(videos.length==3){
		document.getElementById("nextIconLeft").style.marginLeft = "13%"
		document.getElementById("secondaryVideoThumbnails").style.width = "60%"
		for (var i = 0; i < videos.length; i++) {
				videos[i].childNodes[1].style.display='block';
			
		}
	}else if (videos.length==2){
		document.getElementById("nextIconLeft").style.marginLeft = "24%"
		document.getElementById("secondaryVideoThumbnails").style.width = "40%"
		for (var i = 0; i < videos.length; i++) {
				videos[i].childNodes[1].style.display='block';
			
		}
	}else{
		document.getElementById("nextIconLeft").style.marginLeft = "34%"
		document.getElementById("secondaryVideoThumbnails").style.width = "20%"
		for (var i = 0; i < videos.length; i++) {
				videos[i].childNodes[1].style.display='block';
			
		}
	}
}
function showFirstVideo(){
    var videos = document.getElementsByClassName("secondary-video");
	document.getElementById("main-video").innerHTML = videos[1].childNodes[1];
	showvideo(videos[0].childNodes[1]);
}
var counter=0;
function videoSliderLeft(){
	var videos = document.getElementsByClassName("secondary-video");
	if(videos.length>4 && counter>0 ){
		counter--;
		for (var i = 0; i < videos.length; i++) {
			$(videos[i]).animate({right: '-=140px'});
		}
	}
}
function videoSliderRight(){
	var videos = document.getElementsByClassName("secondary-video");
	if(videos.length>4 && (videos.length-4) > counter){
		counter++;
		for (var i = 0; i < videos.length; i++) {
			$(videos[i]).animate({right: '+=140px'});
		}
	}
}
function noFurther(element){
	document.getElementsByClassName(element)[0].style.color = 'red';
	document.getElementsByClassName(element)[0].style.color = 'black';
}

function lowerSecondaryVideoImg(){
	var videos = document.getElementsByClassName("secondary-video");
	var x,patt,videoid;
	for (var i = 0; i < videos.length; i++) {
		x = videos[i].childNodes[1];
    	if(x=='[object HTMLImageElement]'){
    		url=x.getAttribute("src");
    		var patt = /^(http:\/\/img\.youtube\.com\/vi\/\S+\/0\.jpg)$|^(https:\/\/img\.youtube\.com\/vi\/\S+\/0\.jpg)$/;
    		if (!patt.test(url)){
    			x.style.marginTop='10px';
    		}
    	}
	}
}


function showvideo(video){

	//Coge el primer elemento dentro del div del sub-video
	//var x = document.getElementById(video).childNodes[1];
	var x = video;
	//Checkea que elemento es
	if(x=='[object HTMLImageElement]'){
		var url = x.getAttribute("src");
		var patt = /^(http:\/\/img\.youtube\.com\/vi\/\S+\/0\.jpg)$|^(https:\/\/img\.youtube\.com\/vi\/\S+\/0\.jpg)$/;
		if (patt.test(url)){
			var videoid = url.substring(26,url.indexOf("/0.jpg"));
			document.getElementById("main-video").innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+videoid+'" frameborder="0" allowfullscreen></iframe>';	
		}
		else{
			var videoid = url.substring(0,url.indexOf(".PNG"));
			document.getElementById("main-video").innerHTML = '<video width="100%" height="100%" controls><source src="'+videoid+'.mp4">Your browser does not support the video tag.</video>';	
		}
	}
	else{
		document.getElementById("video4").innerHTML = x;
	}
}


//http://img.youtube.com/vi/[video-id]/[thumbnail-number].jpg

//document.getElementById("mySelect").childNodes[2].text;

























