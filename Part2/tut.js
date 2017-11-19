
function registerTutNavigationPane()
{
	document.getElementById("unit1Tut").addEventListener("click", onClick_Unit1Tut, false);
}

function onClick_Unit1Tut()
{
	var req = new XMLHttpRequest();
	req.open("GET", "Data/Tut1.xml",true);
	req.onreadystatechange = loadUnit1Tut;
	req.send();
}

function loadUnit1Tut()
{
	if(this.readyState == 4 && this.status == 200)
	{
		clearContentWindow()
		var xmlDOC = this.responseXML;
		loadTutorialInfo(xmlDOC);
		setActiveButton("btnUnit1");
	}
}

function loadTutorialInfo(xml)
{
	var sections = xml.getElementsByTagName("Section");

	for(iSecCount = 0; iSecCount < sections.length; iSecCount++)
	{
		var currentSection = sections[iSecCount];
		switch(currentSection.getAttribute("Type"))
		{
			case "FigureExplanation":
				var header = currentSection.getElementsByTagName("Header")[0].childNodes[0].nodeValue;
				var imgPath = currentSection.getElementsByTagName("IMGPath")[0].childNodes[0].nodeValue;
				var desc = currentSection.getElementsByTagName("Explanation")[0].childNodes[0].nodeValue;
				addFigureExplanation(header, imgPath, desc);
				break;
			case "List":
				var header = currentSection.getElementsByTagName("Header")[0].childNodes[0].nodeValue;
				var listItems = currentSection.getElementsByTagName("Item");
				var conclusion = currentSection.getElementsByTagName("Conclusion")[0].childNodes[0].nodeValue;
				addList(header,listItems,conclusion);
				break;
			case "FigureCaption":
				var cap = currentSection.getElementsByTagName("Caption")[0].childNodes[0].nodeValue;
				var imgPathCaption = currentSection.getElementsByTagName("IMGPath")[0].childNodes[0].nodeValue;
				addFigureCaption(cap, imgPathCaption)
				break;
		}
	}
}

function clearContentWindow()
{
	var content = document.getElementById("contentWindow")
	while (content.hasChildNodes()) 
	{
    	content.removeChild(content.lastChild);
	}
}

function addFigureExplanation(header, imgPath, desc)
{
	var sec = "<div class=figureExplanation>";
	sec += "<img src=" +imgPath+ ">";
	sec += "<h5>" + header + "</h5>";	
	sec += "<p>" + desc + "</p></div>";

	 document.getElementById("contentWindow").innerHTML += sec;
}

function addList(header,listItems, conclusion){
	var sec = "<div class=tutList>";
	sec += "<h5>" + header +"</h5> <ul>";
	
	for(iPointCount=0; iPointCount < listItems.length; iPointCount++)
	{
		sec += "<li>" + listItems[iPointCount].childNodes[0].nodeValue + "</li>";
	}
	
	sec += "</ul><aside>" + conclusion +"</aside></div>";

	document.getElementById("contentWindow").innerHTML += sec;
}

function addFigureCaption(caption, imgPath)
{
	var sec = "<div class=figureCaption>";
	sec += "<img src=" +imgPath+ " alt=\"self-validation inputs\">";
	sec += "<figcaption>" + caption + "</figcaption></div>"

	document.getElementById("contentWindow").innerHTML += sec;
}

function setActiveButton(btn)
{
	var btnHome = document.getElementById("btnHome");
	var btnUnit1 = document.getElementById("btnUnit1");
	var btnUnit2 = document.getElementById("btnUnit2");
	var btnUnit3 = document.getElementById("btnUnit3");

	switch(btn)
	{
		case "btnHome":
			btnHome.classList.remove("inactive");
			btnHome.classList.add("active");

			btnUnit1.classList.remove("active");
			btnUnit2.classList.remove("active");
			btnUnit3.classList.remove("active");

			btnUnit1.classList.add("inactive");
			btnUnit2.classList.add("inactive");
			btnUnit3.classList.add("inactive");
			break;

		case "btnUnit1":
			btnUnit1.classList.remove("inactive");
			btnUnit1.classList.add("active");

			btnHome.classList.remove("active");
			btnUnit2.classList.remove("active");
			btnUnit3.classList.remove("active");

			btnHome.classList.add("inactive");
			btnUnit2.classList.add("inactive");
			btnUnit3.classList.add("inactive");
			break;

		case "btnUnit2":
			btnUnit2.classList.remove("inactive");
			btnUnit2.classList.add("active");

			btnHome.classList.remove("active");
			btnUnit1.classList.remove("active");
			btnUnit3.classList.remove("active");

			btnHome.classList.add("inactive");
			btnUnit1.classList.add("inactive");
			btnUnit3.classList.add("inactive");
			break;

		case "btnUnit3":
			btnUnit3.classList.remove("inactive");
			btnUnit3.classList.add("active");

			btnHome.classList.remove("active");
			btnUnit2.classList.remove("active");
			btnUnit1.classList.remove("active");

			btnHome.classList.add("inactive");
			btnUnit2.classList.add("inactive");
			btnUnit1.classList.add("inactive");
	}
}

window.addEventListener("load", registerTutNavigationPane, false)