
function downloadImages(){
    window.setInterval(LoadNextImage,5000);
    sessionStorage.ImageIndex = 1;   
}

function LoadNextImage(){
 	var canvas = document.getElementById("pictureCanvas");
    var ctx = canvas.getContext("2d");
	var image = new Image();
	image.src ="../Shared/IMG/SlideShow/IMG" + sessionStorage.ImageIndex + ".JPG";
	image.onload = function() { 
		ctx.drawImage(image, 0, 0, 500, 500);
	};
	
	sessionStorage.ImageIndex = parseInt(sessionStorage.ImageIndex) + 1;

	if(sessionStorage.ImageIndex == 20){
		sessionStorage.ImageIndex = 1;
	}
}

window.addEventListener("load", downloadImages, false);