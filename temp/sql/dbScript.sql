CREATE DATABASE IWPDB;

USE IWPDB;

/*
 * 
 * 					INTERN TABLE
 * 
 * */

CREATE TABLE Intern (
	internEmail varchar(256) NOT NULL,
	internPassword varchar(130) NOT NULL,
	internName varchar(256) NOT NULL,
	internDOB Date NOT NULL,
	qualification varchar(30) NOT NULL,
	graduationYear Date NOT NULL,
	college varchar(256) NOT NULL, 
	collegeDegree varchar(50) NOT NULL,
	department varchar(50) NOT NULL
);

ALTER TABLE Intern ADD CONSTRAINT pk_intern PRIMARY KEY (internEmail);

ALTER TABLE Intern ADD CONSTRAINT check_qualifiaction_values CHECK( qualification IN 
("High school","Pre University (XII)","Diploma","3 Year - Bachelor's degree","4 Year - Bachelor's degree", 
"5 Year - Bachelor's degree","Master's degree","Doctoral degree")
);

ALTER TABLE Intern ADD CONSTRAINT check_graduationyear_range CHECK(graduationYear >= '1950-00-00');

ALTER TABLE Intern ADD CONSTRAINT check_collegedegree_values CHECK( collegeDegree IN 
("Diploma or Non Degree Engineering Programs", "BE", "BTech", "ME", "MTech", "MS", "PhD", 
"Medical", "Arts and Humanities", "Commerce and Management", "Science", "Others", "Not Applicable")
);

ALTER TABLE Intern ADD CONSTRAINT check_department_values CHECK( department IN 
("Aeronautical Engineering", "Agriculture Engineering", "Architecture", "Automobile Engineering", 
"Biotechnology", "Ceramic Engineering", "Chemical Engineering", "Civil Engineering", 
"Computer Science and Engineering", "Electronics and Communication Engineering", 
"Electrical Engineering", "Electronics Engineering", "Environment Engineering", "Food Engineering", 
"Industrial Engineering", "Information Technology", "Instrumentation Engineering", "Leather Technology", 
"Marine Engineering", "Mechanical Engineering", "Mechatronics Engineering", "Metallurgy Engineering", 
"Mining Engineering", "Petrochemical Engineering", "Pharmaceutical Engineering", "Planning", "Printing Engineering", 
"Production Engineering", "Textile Engineering")
);

INSERT INTO Intern VALUES('intern@gmail.com', 'boom', 'Abhishek', '2001-05-30', 'High school', '2019-00-00', 'VIT', 'BTech', 'Aeronautical Engineering');

SELECT * FROM Intern;

/*
 * 
 * 					END INTERN TABLE
 * 
 */

/* *******************************************************************************
 * *******************************************************************************
 * *******************************************************************************
 */

/*
 * 
 * 					STARTUP TABLE
 * 
 * */

CREATE TABLE Startup (
	startupEmail varchar(256) NOT NULL,
	startupName varchar(256) NOT NULL,
	startupCIN varchar(22) NOT NULL,
	startupPassword varchar(130) NOT NULL,
	startupStage varchar(15) NOT NULL,
	startupNature varchar(30) NOT NULL,
	startupWebsiteLink varchar(256) NOT NULL,
	startupIndustry varchar(31) NOT NULL,
	startupLogo varchar(256) NOT NULL,
	startupDetails TEXT(512) NOT NULL
);


ALTER TABLE Startup ADD CONSTRAINT pk_startup PRIMARY KEY(startupEmail);


ALTER TABLE Startup ADD CONSTRAINT check_startupcin_regex CHECK (startupCIN REGEXP '^(U|L)[0-9]{5}[A-Z]{2}[0-9]{4}(PTC|PLC|SGC|OPC|NPL)[0-9]{6}$');


ALTER TABLE Startup ADD CONSTRAINT check_startupStage_values CHECK(startupStage IN ("Ideation", "Validation", "Early Traction", "Scaling"));

ALTER TABLE Startup ADD CONSTRAINT check_startupNature_values CHECK(startupNature IN ("Private Limited Company", "Partnership firm", "Limited Liability Partnership"));

ALTER TABLE Startup ADD CONSTRAINT check_startupIndustry_values CHECK(startupIndustry IN 
("Analytics", "Advertising", "Architecture", "Automotive", "Chemicals", 
"Telecommunication & Networking", "Agriculture", "Events", "Fashion", 
"Finannce Technology", "Desgin", "Education", "Renewable Energy", 
"Food Engineering", "Internet of Things", "Marketing", "Retail", 
"Media & Entertainment", "Sports", "Logistics", "Travel & Tourism"));

ALTER TABLE Startup ADD CONSTRAINT uni_startupcin UNIQUE (startupCIN);

INSERT INTO Startup VALUES('startup@gmail.com', 'floopr', 'U12345AB1234PTC123456', 'lolo', 'Ideation',  
						   'Private Limited Company','floopr.com','Analytics', 'http://www.google.com/images/company/logos', 'Very nice startup');

SELECT * FROM Startup;
						  
/*
 * 
 * 					END STARTUP TABLE
 * 
 */


/* *******************************************************************************
 * *******************************************************************************
 * *******************************************************************************
 */

/*
 * 
 * 					INTERN_POS_NEEDED TABLE
 * 
 * */

CREATE TABLE InternPosNeeded (
	startupEmail varchar(256) NOT NULL,
	internPos varchar(100) NOT NULL
);

ALTER TABLE InternPosNeeded ADD CONSTRAINT pk_internposneeded PRIMARY KEY(startupEmail, internPos); 

ALTER TABLE InternPosNeeded ADD CONSTRAINT fk_startupEmail_internposneeded_startup 
FOREIGN KEY (startupEmail) REFERENCES Startup(startupEmail);

INSERT INTO InternPosNeeded VALUES ('startup@gmail.com', 'janitor');

SELECT * FROM InternPosNeeded;
/*
 * 
 * 					END INTERN_POS_NEEDED TABLE
 * 
 */


/* *******************************************************************************
 * *******************************************************************************
 * *******************************************************************************
 */


/*
 * 
 * 					INVESTOR TABLE
 * 
 * */

CREATE TABLE Investor(
	companyEmail varchar(256) NOT NULL,
	companyType varchar(64) NOT NULL,
	companyName varchar(256) NOT NULL,
	companyPassword varchar(130) NOT NULL
);

ALTER TABLE Investor
ADD CONSTRAINT pk_investor PRIMARY KEY (companyEmail);

INSERT INTO Investor VALUES ('investor@gmail.com','CS/IT','Floopr','bobo');

SELECT * FROM Investor;

/*
 * 
 * 					END INVESTOR TABLE
 * 
 */


/* *******************************************************************************
 * *******************************************************************************
 * *******************************************************************************
 */

/*
 * 
 * 					PROJECTS TABLE
 * 
 * */

CREATE TABLE Projects(
	projName varchar(256) NOT NULL,
	image varchar(256) NOT NULL,
	description TEXT(512) NOT NULL,
	startupEmail varchar(256) NOT NULL
);

ALTER TABLE Projects
ADD CONSTRAINT pk_projects PRIMARY KEY (projName);

INSERT INTO Projects VALUES('UniversityFinder','http://www.google.com/images/projects','Very good Company','startup@gmail.com');

ALTER TABLE Projects 
ADD CONSTRAINT fk_startupemail_projects_startup 
FOREIGN KEY (startupEmail) REFERENCES Startup(startupEmail);

SELECT * FROM Projects;

/*
 * 
 * 					END PROJECTS TABLE
 * 
 */


/* *******************************************************************************
 * *******************************************************************************
 * *******************************************************************************
 */



/*
 * 
 * 					INVESTS_IN TABLE
 * 
 * */

CREATE TABLE InvestsIn(
	companyEmail varchar(256) NOT NULL,
	projName varchar(256) NOT NULL,
	DOI date NOT NULL,
	budget BIGINT NOT NULL
);

ALTER TABLE InvestsIn
ADD CONSTRAINT pk_investsin PRIMARY KEY (companyEmail, projName);

ALTER TABLE InvestsIn 
ADD CONSTRAINT fk_companyemail_investsin_investor
FOREIGN KEY (companyEmail) REFERENCES Investor(companyEmail);

ALTER TABLE InvestsIn 
ADD CONSTRAINT fk_projName_investsin_projects
FOREIGN KEY (projName) REFERENCES Projects(projName);

ALTER TABLE InvestsIn
ADD CONSTRAINT check_budget_range CHECK (budget>0);
 

INSERT INTO InvestsIn VALUES('investor@gmail.com','UniversityFinder','2020-05-12', 200000);
SELECT * FROM InvestsIn;
/*
 * 
 * 					END INVESTS_IN TABLE
 * 
 */


/* *******************************************************************************
 * *******************************************************************************
 * *******************************************************************************
 */

/*
 * 
 * 					STARTUPFOUNDERS TABLE
 * 
 * */

CREATE TABLE StartupFounders(
	founderName varchar(256) NOT NULL,
	startupEmail varchar(256) NOT NULL
);

ALTER TABLE StartupFounders
ADD CONSTRAINT pk_startupfounders PRIMARY KEY (founderName, startupEmail);


ALTER TABLE StartupFounders
ADD CONSTRAINT fk_startupemail_startupfounders_startup
FOREIGN KEY (startupEmail) REFERENCES Startup(startupEmail);

INSERT INTO StartupFounders VALUES('Ritwik','startup@gmail.com');

SELECT * FROM StartupFounders;
/*
 * 
 * 					END STARTUPFOUNDERS TABLE
 * 
 */


/* *******************************************************************************
 * *******************************************************************************
 * *******************************************************************************
 */

/*
 * 
 * 					APPLIES_TO TABLE
 * 
 * */

CREATE TABLE AppliesTo(
	internEmail varchar(256) NOT NULL,
	startupEmail varchar(256) NOT NULL,
	DOA date NOT NULL,
	status varchar(2) NOT NULL
);

ALTER TABLE AppliesTo ADD CONSTRAINT check_status_values CHECK (status in ('P', 'A', 'R'));

ALTER TABLE AppliesTo
ADD CONSTRAINT pk_appliesto PRIMARY KEY(internEmail,startupEmail);

ALTER TABLE AppliesTo
ADD CONSTRAINT fk_internemail_appliesto_intern
FOREIGN KEY (internEmail) REFERENCES Intern(internEmail);


ALTER TABLE AppliesTo
ADD CONSTRAINT fk_startupemail_apppliesto_startup
FOREIGN KEY (startupEmail) REFERENCES Startup(startupEmail);

INSERT INTO AppliesTo VALUES('intern@gmail.com','startup@gmail.com','2020-05-12','A');

SELECT * FROM AppliesTo;
/*
 * 
 * 					END APPLIES_TO TABLE
 * 
 */


/* *******************************************************************************
 * *******************************************************************************
 * *******************************************************************************
 */
