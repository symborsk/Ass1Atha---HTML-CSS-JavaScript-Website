
function registerQuizNavigationPane(){
	document.getElementById("unit1Quiz").addEventListener("click", onClick_unit1Quiz, false);
}

function onClick_unit1Quiz() {
	var req = new XMLHttpRequest();
	req.open("GET", "Data/Quiz1.xml", true);
	req.onreadystatechange = loadUnit1Quiz;
	req.send();
}

function submit_unit1Quiz(){
	var req = new XMLHttpRequest();
	req.open("GET", "Data/Quiz1.xml", true);
	req.onreadystatechange = checkUnit1Quiz;
	req.send();
	return false;
}

function checkUnit1Quiz(){
	if(this.readyState == 4 && this.status == 200)
	{
		var xmlDOC = this.responseXML;
		var answers = xmlDOC.getElementsByTagName("Key");
		var correct = 0;
		var total = answers.length;
		for(var iAnsCount = 0; iAnsCount < answers.length; iAnsCount++)
		{
		  var currentAnswer = answers[iAnsCount];
		  var answerId = currentAnswer.getAttribute("questionID");
		  var multiAnswer = (currentAnswer.getAttribute("MultipleAnswers") == "true");
		  var answer = currentAnswer.innerHTML;

		  if (IsCorrectAnswer(answerId, answer, multiAnswer))
		  {
				console.log("Answer is correct!")
				HighlightGreen(answerId);
				correct += 1;
		  }
		  else
		  {
				console.log("Answer is wrong!")
				HighlightRed(answerId);
		  }
		}
		document.getElementById("FinalScore").innerHTML = "Final Score: " + correct + "/" + total
	}
}

function IsCorrectAnswer(ansID, ans, multiAnswer){
	var answers = document.getElementById(ansID).getElementsByTagName("input");
	if(multiAnswer)
	{
		var answersKey = ans.split(";");
		var answerCount = answersKey.length;
		var currentAnswerCount = 0;

		//First ensure the right number of answers are checked 
		for(var iAnsCount = 0; iAnsCount < answers.length; iAnsCount++)
		{		
			var checked = answers[iAnsCount].checked;
			if (checked) currentAnswerCount++;
		}

		if(currentAnswerCount != answerCount )
		{
			return false;
		}
		
		//Ensure for each answer that there is a checked on in the web page if not the answer is wrong
		for (var iAns = 0; iAns < answersKey.length; ++iAns) 
		{
			for(var iAnsCount = 0; iAnsCount < answers.length; iAnsCount++)
			{				
				var checked = answers[iAnsCount].checked;
				var answerText = answers[iAnsCount].getAttribute("value");
				if (checked && answerText == answersKey[iAns])
				{
					break;
				}
			}

			//IF it is this length its means we did not find a correct answer checked
			if(iAnsCount == answers.length)
			{
				return false;
			}
		}

		return true;	
	}
	else
	{
		for(var iAnsCount = 0; iAnsCount < answers.length; iAnsCount++)
		{		
			var checked = answers[iAnsCount].checked;
			var answerText = answers[iAnsCount].getAttribute("value");
			if(checked == true && answerText == ans)
			{
				return true;
			}
		}

		return false;
	}
}

function HighlightGreen(ansID){
	document.getElementById(ansID).style.borderColor = "green";
}

function HighlightRed(ansID){
	document.getElementById(ansID).style.borderColor = "red";
}

function loadUnit1Quiz(){
	if(this.readyState == 4 && this.status == 200)
	{
		clearContentWindow();
		var xmlDOC = this.responseXML;
		loadQuizInformation(xmlDOC);
		setActiveButton("btnUnit1");
	}
}

function loadQuizInformation(xml){
	var questions = xml.getElementsByTagName("Question");

	//Load the form start
	
	var runningTag = "<h5 id=\"FinalScore\"></h5>"
	runningTag += "<form class=\"QuizForm\" id=\"unit1Quiz\" onsubmit=\"return submit_unit1Quiz();\" method=\"post\">";

	for(var iQueCount = 0; iQueCount < questions.length; iQueCount++)
	{
		var currentQuestion = questions[iQueCount];
		switch(currentQuestion.getAttribute("Type"))
		{
			case "MultipleChoice":
				var question = currentQuestion.getElementsByTagName("QuestionTitle")[0].childNodes[0].nodeValue;
				var questionID = currentQuestion.getAttribute("QuestionID");
				var nameGroup = currentQuestion.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
				var answers = currentQuestion.getElementsByTagName("Answer");
				runningTag += addMultipleChoiceQuestion(questionID, question, answers, nameGroup)
				break;
			case "Selection":
				var question = currentQuestion.getElementsByTagName("QuestionTitle")[0].childNodes[0].nodeValue;
				var questionID = currentQuestion.getAttribute("QuestionID");
				var answers = currentQuestion.getElementsByTagName("Answer");
				runningTag += addSelectionQuestion(questionID, question, answers);
				break;
			case "TrueFalse":
				var question = currentQuestion.getElementsByTagName("QuestionTitle")[0].childNodes[0].nodeValue;
				var questionID = currentQuestion.getAttribute("QuestionID");
			 	runningTag +=addTrueFalseQuestion(questionID, question) ;
				break;	
		}
	}

	//Load the end of the form
	 runningTag += "<input type=\"submit\" id=\"submit\" value= \"Submit Answers\"></form>";
	 document.getElementById("contentWindow").innerHTML += runningTag;  
	
	//Be sure to register the event as well
	//document.getElementById("submit").addEventListener("click", submit_unit1Quiz, false);
}

function setActiveButton(btn){
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

function addMultipleChoiceQuestion(queID, que, ans, name){
	var sec = "<div class=MultipleChoice id=\""+queID+"\">";
	sec += "<p><b>" + que +" (SELECT ONE) </b></p> <ul>";
	
	for(var iAnsCount=0; iAnsCount < ans.length; iAnsCount++)
	{
		var val =  ans[iAnsCount].childNodes[0].nodeValue ;
		sec += "<input type=\"radio\"   name=\"" + name + "\" " + "value=\"" + val + "\">" + val +"<br>";
	}

	sec += "</ul></div>";
	return sec;
}

function addSelectionQuestion(queID, que, ans){
	var sec = "<div class=Selection id=\""+queID+"\">";
	sec += "<p><b>" + que +" (SELECT ALL THAT APPLY) </b></p> <ul>";
	for(var iAnsCount=0; iAnsCount < ans.length; iAnsCount++)
	{
		var val =  ans[iAnsCount].childNodes[0].nodeValue; 
		sec += "<input type=\"checkbox\" value = \"" + val + "\">" + val +"<br>";
	}

	sec += "</ul></div>";
	return sec;
}

function addTrueFalseQuestion(queID, que){
	var sec = "<div class=TrueFalse id=\""+queID+"\">";
	
	sec += "<p><b>" + que +"</b></p> <ul>";
	sec += "<input type=\"radio\" name=\"" + queID + "\" " + "value=\"True\">True<br>";
	sec += "<input type=\"radio\" name=\"" + queID + "\" " + "value=\"False\">False<br>";

	sec += "</ul></div>";
	return sec;
}

window.addEventListener("load", registerQuizNavigationPane, false);