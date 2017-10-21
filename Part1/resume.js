var xsltProcessor = new XSLTProcessor();

function registerNavigationPane()
{
	document.getElementById("resume").addEventListener("click", onClick_Resume, false);
}

function handlerRecievedXSL(){
	if(this.status == 200 && this.responseXML != null)
	{
		xsltProcessor.importStylesheet(this.responseXML);
		getXML();
	}
	else
	{
		window.alert("FAILURE import XSL")
	}
}

function handlerRecievedXML(){
	if(this.status == 200 && this.responseXML != null)
	{
		tranformXML(this.responseXML);
	}
	else
	{
		window.alert("FAILURE import XML")
	}
}

function getXSL()
{
  	var myXMLHTTPRequest = new XMLHttpRequest();
	myXMLHTTPRequest.open("GET", "Part1/resume.xsl", true);
	myXMLHTTPRequest.onload = handlerRecievedXSL;
  	myXMLHTTPRequest.send(null);
}

function getXML()
{
  	var myXMLHTTPRequest = new XMLHttpRequest();
	myXMLHTTPRequest.open("GET", "Part1/resume.xml", true);
	myXMLHTTPRequest.onload = handlerRecievedXML;
  	myXMLHTTPRequest.send(null);
}

function tranformXML(xmlDoc)
{
	 var fragment = xsltProcessor.transformToFragment(xmlDoc, document);
	 document.getElementById("contentWindow").appendChild(fragment);
}

function onClick_Resume()
{
	getXSL();
	
	var header = document.getElementById("header");
	while (header.hasChildNodes()) 
	{
    	header.removeChild(header.lastChild);
	}

	var header1 = document.createElement("h1");
	var header2 = document.createElement("h2");
	header1.appendChild( document.createTextNode("John Symborski's Impressive Resume"))
	header2.appendChild( document.createTextNode("Assignment #1 COMP 466"))

	header.appendChild(header1);
	header.appendChild(header2);

	var att = document.createAttribute("class")
	att.value="active"
	document.getElementById("home").removeAttribute("class")
	document.getElementById("resume").setAttributeNode(att)

}

window.addEventListener("load", registerNavigationPane, false)
