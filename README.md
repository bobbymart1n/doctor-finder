# Doctor Finder
**An API/Async project for Epicodus**

## By Bobby Martin

# Description
This project makes a call and gets a response from the BetterDoctorAPI to get information about doctors available in your area.

# Specifications
* The program will take a medical issue
  * Input Example: **Flu like symptoms**
  * Output Example: **Flu like symptoms**
* The program will take a doctors name
  * Input Example: **Jane Doe**
  * Output Example: **Jane Doe**
* The program will make an API call
  * Input Example: **Find**
  * Output Example: **Doctor: Jane Doe**
* The program will display information about that doctor
  * Input Example: **Symptoms: Flu like symptoms Doctor Name: Jane Doe**
  * Output Example: **Doctor: Jane Doe Address: 1234 SE Burnside Phone: 503-867-5309 Specialization: Primary Care Accepting New Patients: Yes**
* The program will display an error if response is not status 200 OK
  * Input Example: **Jane Dont**
  * Output Example: **Error: Response message 404 page does not exist**
* The program will display an error if there are no doctors within search parameters
  * Input Example: **Jane Dont**
  * Output Example: **Uh Oh! A doctor by that name doesn't exist. If you are in a medical emergency, call 911 immediately**

# Setup Requirements
* Clone this repository
* Run npm install to install all dependencies
* Create a .env file to hold your API key
* Run npm run start to build and start the development environment

# Technologies
* HTML
* CSS
* JavaScript
* Webpack
* Jasmine
* Karma

This project uses the _MIT License_
&copy; **Bobby Martin** 2018
