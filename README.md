ATM App
=========

Setup
---------
1. Install Compass (Ruby is required for gem)
	gem install compass
2. Install nodejs
	https://nodejs.org/en/download/
3. Extract the zip file to a location 
4. cd atmApp
5. Run the following to install Node JS dependencies
	npm install
6. Run the following for UI libraries
	bower install
7. Run the following to minify the JS files and convert SCSS to CSS files
	grunt
8. kill grunt by pressing Ctrl+C
9. Run the following to start the server
	npm start
10. Access the url at
	http://localhost:8000/app/

Limitations
---------
* Internationalization needs to be implemented.
* Error Handling mechanism needs to be implemented.

Things to do
---------
* Unit Tests
* Protractor Tests