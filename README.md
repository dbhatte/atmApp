ATM App
=========

Setup
---------
Install Compass (Ruby is required for gem)

	gem install compass
Install nodejs

	https://nodejs.org/en/download/
Install bower

	npm install -g bower
Extract the zip file to a location and change to the atmApp directory

	cd atmApp
Install Node JS dependencies

	npm install
Install Bower UI libraries

	bower install
Run the following to minify the JS files and convert SCSS to CSS files

	grunt
Kill grunt by pressing Ctrl+C

Run the following to start the server

	npm start
Access the url at

	http://localhost:8000/app/

Limitations
---------
* Internationalization needs to be implemented.
* Error Handling mechanism needs to be implemented.

Things to do
---------
* Unit Tests
* Protractor Tests
