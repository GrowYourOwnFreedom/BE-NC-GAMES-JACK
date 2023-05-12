# Jack's House of Games API

https://jack-games.onrender.com/

This project is the backend of a simple games review site, allowing users to post reviews of games and comment on those reviews!
Users can review games of different categories, comment on reviews, search for reviews, order their searches, delete comments, and vote on different comments and reviews.

To work on this yourself simply fork and/or clone it down on to your system from github using this command:

git clone https://github.com/GrowYourOwnFreedom/BE-NC-GAMES-JACK

You will need to install dependencies using the following command:

npm init -y

In order to seed yourself a dev database run the following commands:

npm run setup-dbs

npm run seed

You will need to make sure you have created two .env files to work on this project:

.env.test and
.env.development

Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment either:

nc_games or
nc_games_test

Double check that these .env files are .gitignored.

The required environment variables are set by passing dotenv a config object with the correct path, determined by the environment you are operating in at the time (eg. test or development).
This is done in the connection file before the pool is exported.

To run this code you will need to make sure to install the following applications:
Node.js v19.7.0
psql 15.2
