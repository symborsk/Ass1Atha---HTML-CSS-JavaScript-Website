<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns="" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" >
<xsl:output method="html" indent="yes" omit-xml-declaration="yes"/>
	
	<xsl:template match="ContactInfo">
	  	<html>	
	  		<body> 
				<h1>John Symborski's Resume</h1>
				<h2>Contact Info</h2>			
		  		<xsl:for-each select="*"> 
			        <p>
			          <xsl:value-of select="name()"/>
			          <xsl:text> : </xsl:text>
			          <xsl:value-of select="."/> 
			        </p>
		  		</xsl:for-each>
		  	</body>
		</html>
  	</xsl:template>

	<xsl:template match="UniversityStatus">
	  	<html>
	  		<body> 
	  			<h2>University Status</h2>			
	      		<xsl:for-each select="*"> 
			        <p>
			          <xsl:value-of select="name()"/>
			          <xsl:text> : </xsl:text>
			          <xsl:value-of select="."/> 
			        </p>
	      		</xsl:for-each>
		  	</body>
		</html>
  	</xsl:template>

    <xsl:template match="ComputerSkills">
	  	<html>
	  		<body> 
	  			<h2>Computer Skills</h2>			
	      		<xsl:for-each select="*"> 
			        <p>
			          <xsl:text>-</xsl:text>
			          <xsl:value-of select="."/> 
			        </p>
	      		</xsl:for-each>
		  	</body>
		</html>
  	</xsl:template>

  	<xsl:template match="ProgrammingLanguages">
	  	<html>
	  		<body> 
	  			<h2>Programming Languages</h2>			
	      		<xsl:for-each select="*"> 
			        <p>
			          <xsl:value-of select="name()"/>
			          <xsl:text> : </xsl:text>
			          <xsl:value-of select="."/> 
			        </p>
	      		</xsl:for-each> 		
		  	</body>
		</html>
  	</xsl:template>

 	<xsl:template match="WorkExperience">
	  	<html>
	  		<body> 
	  			<h2><xsl:text>Work Experience</xsl:text></h2>

	  			<xsl:for-each select="Job"> 
	  				<h3><xsl:value-of select="Job_Title"/></h3>  							
	      			
	      			<p>
	      				<xsl:text>Company : </xsl:text>
	      				<xsl:value-of select="Company"/>
	      			</p>
	      			<p>
	      				<xsl:text>City : </xsl:text>
	      				<xsl:value-of select="City"/>
	      			</p>
	      			<p>
	      				<xsl:text>Start Date : </xsl:text>
	      				<xsl:value-of select="Start_Date"/>
	      			</p>
	      			<p>
	      				<xsl:text>End Date : </xsl:text>
	      				<xsl:value-of select="End_Date"/>
	      			</p>

					<h4>
						<xsl:value-of select="Job_Title"/>
						<xsl:text> Responsibilities</xsl:text>
					</h4>
		      		<xsl:for-each select="Job_Responsibilities/Responsibility"> 	
				        <p>
				          <xsl:text> - </xsl:text>
				          <xsl:value-of select="."/>  
				    	</p>
		      		</xsl:for-each>

	  			</xsl:for-each>
			</body>	
		</html>
  	</xsl:template>

  	<xsl:template match="Scholarships">
	  	<html>
	  		<body> 
	  			<h2>Scholarships</h2>			
	      		<xsl:for-each select="Scholarship"> 
		    		<p>
	      				<xsl:text>- </xsl:text>
	      				<xsl:value-of select="."/>
	      			</p>
	      		</xsl:for-each>  		
			  </body>
		</html>
  	</xsl:template>

	<xsl:template match="Interests">
	  	<html>
	  		<body> 
	  			<h2>Interests</h2>			
	      		<xsl:for-each select="Interest"> 
		    		<p>
	      				<xsl:text>- </xsl:text>
	      				<xsl:value-of select="."/>
	      			</p>
	      		</xsl:for-each>  		
			  </body>
		</html>
  	</xsl:template>

  	<xsl:template match="Misclaneous">
	  	<html>
	  		<body> 
	  			<h2>Misclaneous</h2>			
	      		<xsl:for-each select="MiscalaneousPoint"> 
		    		<p>
	      				<xsl:text>- </xsl:text>
	      				<xsl:value-of select="."/>
	      			</p>
	      		</xsl:for-each>  		
			  </body>
		</html>
  	</xsl:template>


</xsl:stylesheet>
