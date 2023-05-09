# Northcoders House of Games API

## Background

You will need to create two .env files to work on this project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

the environment variables are set by passing dotenv a config object with the correct path, determined by the environment you are operating in at the time (eg. test or development). This is done in the connection file before the pool is exported
