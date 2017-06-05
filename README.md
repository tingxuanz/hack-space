## Parse Server

This project use the [parse-server](https://github.com/ParsePlatform/parse-server) module on Express.

Read the full Parse Server guide here: https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide

## For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* `mongod` to run to your database,
* Run the server with: `npm start`
* By default it will use a path of /parse for the API routes.
* You now have a database named "dev" that contains your Parse data

## Note
* If you run HackSpace at your local machine, no data from IoT devices is available in the database. So some functions including the map and the status indicator don't work properly.
* An instance of HackSpace is deployed to Heroku and can be accessed with the link: https://hack-space.herokuapp.com/ This instance stores some data from IoT devices and the functions work fine.
* Currently, the IoT devices are not working, so HackSpace receives no new data.
