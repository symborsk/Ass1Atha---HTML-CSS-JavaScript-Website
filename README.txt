||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||JOHN SYMBORSKI README||||||||||||||||||||||||
|||||||||||||Assignment # 1 - COMP 466||||||||||||||||||||||
|||||||||||||||Student ID: 33339305 ||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

How To Run on Windows:

Ensure you have XAMPP installed on your machine. Go to this link if not https://www.apachefriends.org/index.html. Start up apache. Include the entirtey of the TMA1 folder inside the C:\xampp\htdocs directory or wherever you chose to download the XAMPP active directory. Open any browser navigate to http://127.0.0.1/TMA1/tma1.htm. From this slide you will be able to navigate to part 2-4. For linux the steps are the same except you use localhost I believe instead of 127.0.0.1. Also the xampp directory will be located in your opt folder.
-------------------------------------------------------------------------------------------------------------------------------

											Assignment One Documentation:
													Part 1:
						----------------------------------------------------------------------------
    Description:
    Create an XML that contain syour resume, create a XSLT document so you can render it in your webpage. There should be 3 files resume.xml, resume.xsd, resume.xsl.

    Interpretation: 
    Put all my info into a xml and use xsl tranformation with a javascript file in order to display it similar to what it would be normally in a webpage.

    Web Design: 
    Create a visually appealing display of my resume.

    Documentation / User guide / Hyperlink:
    No Documentation / User guide / Hyperlink needed simply just click "My Resume" on the navigation bar and view my resume.


  													Part 2:
  						-----------------------------------------------------------------------------

    Descripion:
    Using all the technologies you have learned so far write a web application that has a tutorial for Unit 1, Unit 2, and Unit 3 of this course along with a quiz that the user can take and get marked. The tutorial should include at least 5 page structure element and six new HTML5 input types.

    Interpretation: 
    Build a web application that utilizes all the technologies described in these units in some way. Use the same external style sheet in order to be consistent with look anf feel of website.

    Web Design: 
    I build every single tutorial and quiz dynamically using ajax calls to get information from xml files. The information in these xml files then drive the javascript code to build the display. This makes building the tutorials and the quizes as easy as writing an xml file. I was also able to utilize the same code for each unit this way. There is also no page reload in any scenario as information is loaded dynamically using ajax calls.

    Documentation: 
    The code as described before simply fills a content window with data from an xml file. That xml file picked is determined by what user chooses to view. All xmls are in the Part2/Data and all images for tutorials are in Part2/IMG.

    User Guide: 
    This application is easy to use, from the main page Hover over the unit you want to learn about and click tutorial. Once you have read through all the information hover over that same unit button and click Quiz. Answer all questions to the best of your ability and click submit. Correct answers will be highlighted in green and wrong in red with the correct answer underneath. A score is displayed at top.

    Hyperlink: 
    From TMA1.htm click the Tutorial button in the navigation bar. Click the home button from this tutorial at any point to return back to TMA1.htm.

												Part 3:
					--------------------------------------------------------------------------

    Description: 
    Create a slideshow application using HTML5 canvas using 20 pictures that you have taken. Give the user option of sequential and random ordering as well as an option for some slide transisitions. The user should also be able to force a skip ahead or backwards when it is on sequential mode.

    Interpretation: 
    Using the canvas create an interactive slideshow with some effects and options.

    Web Design: 
    The most important design portiong of this part is the photos and captions. These are stored in a JSON array and parsed at runtime in order to load the images and captions. This enables photos to be easily added or removed. I used a random number generator in order to ensure the caption shows up on random spots in the photos each time.

    Documentation:
    The code is quite simple it will load the pictures using either a sequential or random generator with whatever settings are currently on the page. The transisitions are done using timer functions that slowly fade in fade out or redraw the photo in a slightly different location.

    User Guide:
    Click the start button to start the slideshow. This start button then becomes a stop button in case you wish to stop the slideshow. Use the next previous button in any sequential scenario to force prior or next photo to load. The Next and Previous buttons can even be used when the show is start if you want to manually go through the show.

    Hyperlink: 
    Click the slide show button in the navigation bar to reach the slideshow. The home button will return you right back to the TMA1.htm

    												Part 4:
    						----------------------------------------------------------------------

    Description:
    Create 3 different web tools with user-friendly interfaces that validate as soon as the user enters in enough information. Use ajax to eleminate the whole page update when switching between tools. Tool 1 will provide conversion for weight, length, area and volume units. Tools 2 will calculate a mortgage payment. Tool 3 will be something you would personally find useful.

    Interpretation: 
    Make 3 different simple web tools that monitor any changes to the information. Try to evaluate everytime the user changes something and if you cant fail gracefully. Use ajax to load each html file into a contant view.

    Web Design: 
    I wanted to make simple forms that did not need any instruction when using. I created a different form for each type of unit in part 1 to once again keep the form as simple as possible. I reused similar look for all the forms to keep the consistent look and feel of my application. Each form loads dynamically using ajax to ensure no page load is needed.

    Documentation:     
    I have a html file for each and every single web form. This enables a simple loading of the form into content window whenever the user wants to navigate to a different tool. All the conversion factors are stored directly in the javascript file to ensure that they can be chanegd easily.

    User Guide:
    Navigate to any tool you want by simply selecting it from the navigation bar. Tool 1(Conversion Tool) you simply enter in a quantity and select a from unit and to unit. This will convert this quantity from the from unit to the to unit. Tool 2(Mortgage Calculator) you simply need to enter the cost of the house, the down payment you made on the house, the interest annually and the number of years you will pay it off. Then select if the payments are monthly, bi-monthly or weekly to get how much your payment will be. Tool 3 (Quadratic Solver) will allow you to solve and equation in the format of 0 = Ax^2+BX+C by simply typing in the values for A, B, C.

    Hyperlink: 
    Click the Web Tools button in the Navigation bar to get to this application. Hit the home button at any point to return to TMA1.htm.

    Sources for equations and conversions:
    For Tool 1(Conversion Tool) I used the ratios for google converter. Simply google m to cm and google will show you the ratio. For Tool 2( Mortgage Calculator) I used the formula on this website: https://www.thebalance.com/calculate-mortgage-315668. The formula is as follows: Loan Payment = Amount / Discount Factor Discount Factor = [(1 + i) ^n] - 1} / [i(1 + i)^n] in which n is payments per year * the number of years, i interest rat divided by the number of payments per year. For Tool 3 I simply knew the quadratic equation of (-b+/- sqrt(b^2-4ac))/(2a).

    My Tool: 
    I chose to do a quadratic equation solver for my tool. This is because I constantly got annoyed when I was younger of having to punch in this complex equation into a calculator having a web tool do it for you is must better.
