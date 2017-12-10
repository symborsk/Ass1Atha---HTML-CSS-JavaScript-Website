//Weigth conversions
var kgToGram = 1000;
var	ounceToGram = 28.3495;
var lbToGram = 453.592;
var tonToGram =907185;

//Length Conversions
var mToCm = 100;
var footToCm = 30.48;
var inchToCm = 2.54;
var yardToCm = 91.44;

//Area Conversions
var m2ToCm2 = 10000;
var yard2ToCm2 = 8361.2736;
var acreToCm2 = 40470000;
var foot2ToCm2 = 929.03;

//Volume conversions
var m3ToCm3 = 1000000;
var galToCm3 = 3785.41;
var litreToCm3 =1000;
var pintToCm3 =473.176;

function registerButtonEvents(){
	document.getElementById("Weight").addEventListener("click", onClick_Weight, false);
	document.getElementById("Length").addEventListener("click", onClick_Length, false);
	document.getElementById("Areas").addEventListener("click", onClick_Area, false);
	document.getElementById("Volumes").addEventListener("click", onClick_Volume, false);
	document.getElementById("MortgageCalc").addEventListener("click", onClick_Mortgage, false);
}

function onClick_Weight(){
	var req = new XMLHttpRequest();
	req.open("GET", "Weight.htm", true);
	sessionStorage.Tool = "unitConversion";
	sessionStorage.Unit = "Weight";
	req.onreadystatechange = loadHtml;
	req.send();
}

function onClick_Length(){
	var req = new XMLHttpRequest();
	req.open("GET", "Length.htm", true);
	sessionStorage.Tool = "unitConversion";
	sessionStorage.Unit = "Length";
	req.onreadystatechange = loadHtml;
	req.send();
}

function onClick_Area(){
	var req = new XMLHttpRequest();
	req.open("GET", "Area.htm", true);
	sessionStorage.Tool = "unitConversion";
	sessionStorage.Unit = "Area";
	req.onreadystatechange = loadHtml;
	req.send();
}

function onClick_Volume(){
	var req = new XMLHttpRequest();
	req.open("GET", "Volume.htm", true);
	sessionStorage.Tool = "unitConversion";
	sessionStorage.Unit = "Volume";
	req.onreadystatechange = loadHtml;
	req.send();
}

function onClick_Mortgage(){
	var req = new XMLHttpRequest();
	req.open("GET", "Mortgage.htm", true);
	req.onreadystatechange = loadHtml;
	sessionStorage.Tool = "Mortgage";
	req.send();
}

function loadHtml(){
	if(this.readyState == 4 && this.status == 200)
	{
		clearContentWindow();	
		document.getElementById("contentWindow").innerHTML = this.responseText;
		setActiveButton();
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

function setActiveButton(btn)
{
	var btnHome = document.getElementById("btnHome");
	var btnUnit1 = document.getElementById("btnUnit1");
	var btnUnit2 = document.getElementById("btnUnit2");
	var btnUnit3 = document.getElementById("btnUnit3");
	var unit = sessionStorage.Unit;

	switch(btn)
	{
		case "home":
			btnHome.classList.remove("inactive");
			btnHome.classList.add("active");

			btnUnit1.classList.remove("active");
			btnUnit2.classList.remove("active");
			btnUnit3.classList.remove("active");

			btnUnit1.classList.add("inactive");
			btnUnit2.classList.add("inactive");
			btnUnit3.classList.add("inactive");
			break;

		case "unitConversion":
			btnUnit1.classList.remove("inactive");
			btnUnit1.classList.add("active");

			btnHome.classList.remove("active");
			btnUnit2.classList.remove("active");
			btnUnit3.classList.remove("active");

			btnHome.classList.add("inactive");
			btnUnit2.classList.add("inactive");
			btnUnit3.classList.add("inactive");
			break;

		case "Mortgage":
			btnUnit2.classList.remove("inactive");
			btnUnit2.classList.add("active");

			btnHome.classList.remove("active");
			btnUnit1.classList.remove("active");
			btnUnit3.classList.remove("active");

			btnHome.classList.add("inactive");
			btnUnit1.classList.add("inactive");
			btnUnit3.classList.add("inactive");
			break;

		case "Custom":
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

function convertValue(){
	var conversionVal = document.getElementById("conversionText").value;
	var conversionUnitFrom = GetSelectedRadioItem(document.getElementsByName("From"))
	var conversionUnitTo = GetSelectedRadioItem(document.getElementsByName("To"))
	
	if(!parseFloat(conversionVal)){
		document.getElementById("answerconversion").innerHTML = "Invalid input";
		return;
	}

	if(conversionUnitFrom == null){
		document.getElementById("answerconversion").innerHTML = "No from unit selected";
		return;
	}

	if(conversionUnitTo == null){
		document.getElementById("answerconversion").innerHTML = "No to unit selected";
		return;
	}

	if(conversionUnitTo == conversionUnitFrom){
		document.getElementById("answerconversion").innerHTML = "I do not think you need help with this one :)";
		return;
	}

	switch(sessionStorage.Unit){
		case "Weight":
			conversionVal = ConvertToGram(conversionVal, conversionUnitFrom)
			conversionVal = ConvertGramToUnit(conversionVal, conversionUnitTo);
			break;
		case "Length":
			conversionVal = ConvertToCm(conversionVal, conversionUnitFrom);
			conversionVal = ConvertCmToUnit(conversionVal,  conversionUnitTo);
		break;
		case "Area":
			conversionVal = ConvertToCm2(conversionVal, conversionUnitFrom);
			conversionVal = ConvertCm2ToUnit(conversionVal,  conversionUnitTo);
		break;
		case "Volume":
			conversionVal = ConvertToCm3(conversionVal, conversionUnitFrom);
			conversionVal = ConvertCm3ToUnit(conversionVal,  conversionUnitTo);
		break;
	}

	conversionVal = roundToAtMost(conversionVal, 6);
	document.getElementById("answerconversion").innerHTML = conversionVal + " " + conversionUnitTo ;

}

function ConvertGramToUnit(val, unit){

	switch(unit){
		case "Gram":
			return val;
		case "Kg":
			return val / kgToGram;
		case "Ounce":
			return val / ounceToGram;
		case "Pound":
			return val / lbToGram;
		case "Ton":
			return val / tonToGram;
	}

	return val;
}

function ConvertToGram(val, unit){

	switch(unit){
		case "Gram":
			return val;
		case "Kg":
			return val * kgToGram;
		case "Ounce":
			return val * ounceToGram;
		case "Pound":
			return val * lbToGram;
		case "Ton":
			return val * tonToGram;
	}

	return val;
}

function ConvertCmToUnit(val, unit){

	switch(unit){
		case "cm":
			return val;
		case "m":
			return val / mToCm;
		case "foot":
			return val / footToCm;
		case "inch":
			return val / inchToCm;
		case "yard":
			return val / yardToCm;
	}

	return val;
}

function ConvertToCm(val, unit){

	switch(unit){
		case "cm":
			return val;
		case "m":
			return val * mToCm;
		case "foot":
			return val * footToCm;
		case "inch":
			return val * inchToCm;
		case "yard":
			return val * yardToCm;
	}

	return val;
}

function ConvertCm2ToUnit(val, unit){

	switch(unit){
		case "cm2":
			return val;
		case "m2":
			return val / m2ToCm2;
		case "foot2":
			return val / foot2ToCm2;
		case "acre":
			return val / acreToCm2;
		case "yard2":
			return val / yard2ToCm2;
	}

	return val;
}

function ConvertToCm2(val, unit){

	switch(unit){
		case "cm2":
			return val;
		case "m2":
			return val * m2ToCm2;
		case "foot2":
			return val * foot2ToCm2;
		case "acre":
			return val * acreToCm2;
		case "yard2":
			return val * yard2ToCm2;
	}

	return val;
}

function ConvertCm3ToUnit(val, unit){

	switch(unit){
		case "cm3":
			return val;
		case "m3":
			return val / m3ToCm3;
		case "gal":
			return val / galToCm3;
		case "litre":
			return val / litreToCm3;
		case "pint":
			return val / pintToCm3;
	}

	return val;
}

function ConvertToCm3(val, unit){

	switch(unit){
		case "cm3":
			return val;
		case "m3":
			return val * m3ToCm3;
		case "gal":
			return val * galToCm3;
		case "litre":
			return val * litreToCm3;
		case "pint":
			return val * pintToCm3;
	}

	return val;
}

function GetSelectedRadioItem(selections){
	var selectedValue = null; 

	for(var i = 0; i < selections.length; i++) {
	   	if(selections[i].checked){	   		
	       selectedValue = selections[i].value;
	       break;
	   	}
 	}

 	return selectedValue;
}

function GetPaymentsPerYear(freq){

	switch(GetSelectedRadioItem(freq)){
		case "monthly":
			return 12;
		case "bi-monthly":
			return 24;
		case "weekly":
			return 52;
	}

	return 0;
}

function roundToAtMost(num,numDigits){

    num = +(Math.round(num + "e+"+numDigits)  + "e-"+numDigits);
    if(isNaN(num)){
    	return 0;
    }

    return num;
}

function calculateMortgage(){
	var mortgageAmount = document.getElementById("amount").value;
	var downPayment = document.getElementById("downPayment").value;
	var interest = parseInt(document.getElementById("interest").value)/100;
	var years = document.getElementById("years").value;
	var paymentsPerYear = GetPaymentsPerYear(document.getElementsByName("frequecy"))

	var amount = mortgageAmount - downPayment;
	var periodInterest = interest/paymentsPerYear
	var totalPayments = paymentsPerYear * years;
	var discountFactor = (Math.pow(1+periodInterest, totalPayments) - 1) /(periodInterest * Math.pow(1+periodInterest, totalPayments));

	document.getElementById("paymentPrice").innerHTML = roundToAtMost(amount/discountFactor, 2);

}



window.addEventListener("load", registerButtonEvents, false);