var images ='{ "pictures" : [ { "source":"../Shared/IMG/SlideShow/Kananakis.JPG" , "caption":"From a trip to Kananakis"},' +
'{ "source":"../Shared/IMG/SlideShow/Concert.JPG" , "caption":"A concert I went to"},' +
'{ "source":"../Shared/IMG/SlideShow/KittyCuddles.JPG" , "caption":"My cats cuddling"},' +
'{ "source":"../Shared/IMG/SlideShow/ButterChicken.JPG" , "caption":"A dish of butter chicken"},' +
'{ "source":"../Shared/IMG/SlideShow/ChristmasParty.JPG" , "caption":"A Company Christmas party"},' +
'{ "source":"../Shared/IMG/SlideShow/Formal.JPG" , "caption":"Me and my girlfriend formal"},' +
'{ "source":"../Shared/IMG/SlideShow/Tongue.JPG" , "caption":"Nona with her tongue out"},' +
'{ "source":"../Shared/IMG/SlideShow/ArtClown.JPG" , "caption":"Art of a sad clown"},' +
'{ "source":"../Shared/IMG/SlideShow/ArtCartoon.JPG" , "caption":"Cartoon Art"},' +
'{ "source":"../Shared/IMG/SlideShow/IllScarlet.JPG" , "caption":"My IllScarlet CD"},' +
'{ "source":"../Shared/IMG/SlideShow/FakeCat.JPG" , "caption":"A fake cat"},' +
'{ "source":"../Shared/IMG/SlideShow/Catz.JPG" , "caption":"My cat Nona and a fake cat"},' +
'{ "source":"../Shared/IMG/SlideShow/Guitars.JPG" , "caption":" Some of my guitars"},' +
'{ "source":"../Shared/IMG/SlideShow/Cat.JPG" , "caption":"My Cat Nona"},' +
'{ "source":"../Shared/IMG/SlideShow/ArtGrass.JPG" , "caption":"Piece of art with grass"},' +
'{ "source":"../Shared/IMG/SlideShow/DreamCatcher.JPG" , "caption":"A dreamcatcher in my house"},' +
'{ "source":"../Shared/IMG/SlideShow/RussianDoll.JPG" , "caption":"Russian Doll"},' +
'{ "source":"../Shared/IMG/SlideShow/RussianDolls.JPG" , "caption":"Russian dolls"},' +
'{ "source":"../Shared/IMG/SlideShow/CowCat.JPG" , "caption":"Butters my cow cat"},' +
'{ "source":"../Shared/IMG/SlideShow/River.JPG" , "caption":"River picture from a camping trip"} ]}';

var intervalTimer = null;
var ctx = null
var canvas = null
var nextImage = null;
var currentImage = null;
var nextCaption = null;
var currentCaption = null;
var xImageCoord;
var yImageCoord = 0;

function initializeSystemVariables(){  
	sessionStorage.ImageIndex = 0;
	sessionStorage.Started = "false";
	canvas = document.getElementById("pictureCanvas");
	ctx = canvas.getContext("2d");
	document.getElementById("startStop").value = "Start";
}

function startStop(){
	var started = (sessionStorage.Started == "true");

	if(!started){
		sessionStorage.Started = "true";
		document.getElementById("startStop").value = "Stop";
		intervalTimer = setInterval(loadNextImage, 3000);
	}
	else{
		clearInterval(intervalTimer);
		sessionStorage.Started = "false";
		document.getElementById("startStop").value = "Start";
	}
}

function nextPicture(){

	//Do nothing if it is not sequential
	if(document.getElementById("sequence").value  != "Sequential"){
		return;
	}

	loadNextImage();
}

function previousPicture(){

	//Do nothing if it is not sequential
	if(document.getElementById("sequence").value  != "Sequential"){
		return;
	}

	sessionStorage.ImageIndex = parseInt(sessionStorage.ImageIndex) - 2;

	if(sessionStorage.ImageIndex == -1 || sessionStorage.ImageIndex == -2){
		sessionStorage.ImageIndex = 19;
	}

	loadNextImage();
}

function GetCurrentIndex(){
	if(document.getElementById("sequence").value  == "Sequential"){
		return parseInt(sessionStorage.ImageIndex);
	}
	else{
		return getRandomNumber(19);
	}
}

function loadNextImage(){
    var ctx = canvas.getContext("2d");

    var currentIndex = GetCurrentIndex();
    var imagesJSONArray = JSON.parse(images);

	nextImage = new Image();
	nextCaption = imagesJSONArray.pictures[currentIndex].caption;
	nextImage.src = imagesJSONArray.pictures[currentIndex].source;
	
	//When the image is loaded draw it on the screen
	nextImage.onload = function() { 
		clearInterval(intervalTimer);

		switch(document.getElementById("effect").value){
			case "Fade":
				intervalTimer = setInterval(fadeOut, 30);
				break;
			case "Slide":
				xImageCoord = 0;
				intervalTimer = setInterval(slideOut)
		}
		
	};
	
	sessionStorage.ImageIndex = parseInt(sessionStorage.ImageIndex) + 1;

	if(sessionStorage.ImageIndex == 20){
		sessionStorage.ImageIndex = 0;
	}
}

function fadeOut(){

		if(currentImage == null){
			clearInterval(intervalTimer);
			ctx.globalAlpha = 0;
			intervalTimer = setInterval(fadeIn, 30);
			return;
		}
		ctx.globalAlpha = ctx.globalAlpha - 0.05;
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(currentImage, 0, 0, 800, 800);

		if(ctx.globalAlpha <= 0.05){
			clearInterval(intervalTimer);
			ctx.globalAlpha = 0;
			intervalTimer = setInterval(fadeIn, 30);
		}
}

function fadeIn(){
	ctx.globalAlpha = ctx.globalAlpha + 0.05;
		
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(nextImage, 0, 0, 800, 800);

	if(ctx.globalAlpha >= 0.95){		
		
		//Load caption just at end to ensure that the random generator can be used
		ctx.font="40px Georgia";
		ctx.fillStyle = "white"
		ctx.fillText(nextCaption, getRandomNumber(300), getRandomNumber(300));
		
		clearInterval(intervalTimer);
		currentImage = nextImage;
		currentCaption = nextCaption
		nextImage = null;

		if(sessionStorage.Started == "true"){
			intervalTimer = setInterval(loadNextImage, 3000);
		}
	}
}

function slideOut(){

		if(currentImage == null){
			clearInterval(intervalTimer);
			
			xImageCoord = 800;
			intervalTimer = setInterval(slideIn, 30);
			return;
		}

		xImageCoord +=20;
		ctx.clearRect(0, 0, 800, 800);  // clear canvas
  		ctx.drawImage(currentImage, xImageCoord, yImageCoord, 800, 800);

  		if(xImageCoord >= 800){
			clearInterval(intervalTimer);
			intervalTimer = setInterval(slideIn, 30);
  		}

}

function slideIn(){

	xImageCoord -= 20;
 	ctx.clearRect(0, 0, 800, 800);  // clear canvas
  	ctx.drawImage(nextImage, xImageCoord, yImageCoord, 800, 800);

	if(xImageCoord <= 0){		

		//Load caption just at end to ensure that the random generator can be used
		ctx.font="40px Georgia";
		ctx.fillStyle = "white"
		ctx.fillText(nextCaption, getRandomNumber(300), getRandomNumber(300));

		clearInterval(intervalTimer);
		
		currentImage = nextImage;
		currentCaption = nextCaption
		nextImage = null;

		if(sessionStorage.Started == "true"){
			intervalTimer = setInterval(loadNextImage, 3000);
		}
	}    

}

function getRandomNumber(upperRange){
	return Math.floor(Math.random() * upperRange);
}

window.addEventListener("load", initializeSystemVariables, false);